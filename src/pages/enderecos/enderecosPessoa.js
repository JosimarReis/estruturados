import React, { useEffect, useState } from 'react';
import { green, red, blue } from '@material-ui/core/colors';

import { Edit as EditIcon, VpnKey as VpnKeyIcon, AddCircle } from '@material-ui/icons';
import { ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, Link } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { enderecoActions, userActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { useHistory, Link as LinkRouter } from "react-router-dom";
export default function EnderecosPessoa(props) {
    const [enderecos, setEnderecos] = useState(props.enderecos)
    const dispatch = useDispatch()
    const history = useHistory()

    const confirm = useConfirm();
    const handleDelete = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `'${item.logradouro}, ${item.cidade}-${item.uf}' será removido de forma permanente.`,
            cancellationText: 'CANCELAR',
            confirmationText: "remover".toUpperCase()
        })
            .then(() => {

                dispatch(enderecoActions.enderecoRemove(props.pessoa_id, item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    return (
        <>
            <React.Fragment>
                <Title>Endereços <Button component={LinkRouter} aria-label="Adicionar Endereço" title="Adicionar Endereço" to={`/pessoas/${props.pessoa_id}/enderecos/cadastrar`}><AddCircle style={{ color: green[500] }} />
                </Button></Title>
                {props.enderecos && props.enderecos.length < 1 ? 'Nenhum endereço cadastrado.'
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Logradouro</TableCell>
                                <TableCell>Bairro</TableCell>
                                <TableCell>CEP</TableCell>
                                <TableCell>Cidade</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.enderecos.map((row) => (
                                <TableRow key={row.id}

                                >
                                    <TableCell>{row.logradouro}</TableCell>
                                    <TableCell>{row.bairro}</TableCell>
                                    <TableCell>{row.cep}</TableCell>
                                    <TableCell>{`${row.cidade} - ${row.uf}`}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button component={LinkRouter} size="small" to={`/pessoas/${props.pessoa_id}/enderecos/alterar/${row.id}`} aria-label="Alterar" title="Alterar">
                                                <EditIcon style={{ color: blue[500] }} fontSize="small" />
                                            </Button>
                                            <Button size="small"
                                                aria-label="Remover"
                                                title="Remover"
                                                onClick={() => handleDelete(row)}
                                            ><DeleteIcon style={{ color: red[500] }} fontSize="small" /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </React.Fragment>
        </>
    );
}
