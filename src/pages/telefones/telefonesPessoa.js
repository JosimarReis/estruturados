import React, { useEffect, useState } from 'react';
import { green, red, blue } from '@material-ui/core/colors';

import { Edit as EditIcon, AddCircle } from '@material-ui/icons';
import { ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, Link } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { useHistory, Link as LinkRouter } from "react-router-dom";
import { telefoneActions } from '../../store/actions'
export default function TelefonesPessoa(props) {
    const [telefonesState, setTelefonesState] = useState(props)
    const dispatch = useDispatch()
    const history = useHistory()

    const confirm = useConfirm();
    const handleDelete = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `'${item.numero}' será removido de forma permanente.`,
            cancellationText: 'CANCELAR',
            confirmationText: "remover".toUpperCase()
        })
            .then(() => {
                dispatch(telefoneActions.telefoneRemove(props.pessoa_id, item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    return (
        <>
            <React.Fragment>
                <Title>Telefones <Button component={LinkRouter} aria-label="Adicionar Telefone" title="Adicionar Telefone" to={`/pessoas/${props.pessoa_id}/telefones/cadastrar`}><AddCircle style={{ color: green[500] }} />
                </Button></Title>
                {props.telefones && props.telefones.length < 1 ? 'Nenhum telefone cadastrado.'
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Número</TableCell>
                                <TableCell align="right">#</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.telefones.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.numero}</TableCell>
                                    <TableCell align="right">
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button component={LinkRouter} size="small" to={`/pessoas/${props.pessoa_id}/telefones/alterar/${row.id}`} aria-label="Alterar" title="Alterar">
                                                <EditIcon style={{ color: blue[500] }} fontSize="small" />
                                            </Button>
                                            <Button size="small"
                                                aria-label="Remover Telefone"
                                                title="Remover Telefone"
                                                onClick={() => handleDelete(row)}
                                            >
                                                <DeleteIcon style={{ color: red[500] }} fontSize="small" />
                                            </Button>
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
