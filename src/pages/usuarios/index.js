import React, { useEffect, useState } from 'react';
import { green, red, blue } from '@material-ui/core/colors';

import { Edit as EditIcon, VpnKey as VpnKeyIcon, AddCircle } from '@material-ui/icons';
import { ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import { Done as DoneIcon, Block as BlockIcon } from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { useHistory } from "react-router-dom";
export default function Users() {
    const { users, users: { items, loading, user }
    } = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        if (user.perfil === 'USER') {
            history.push('/')
            history.go()
        }
    }, [user])
    useEffect(() => {
        dispatch(userActions.getAll())
    }, [])

    const confirm = useConfirm();
    const handleDelete = item => {
        let texto = item.situacao !== 'ativo' ? 'Ativar' : 'Desativar'
        item = { ...item, situacao: item.situacao !== 'ativo' ? 'ativo' : 'desativado' }

        confirm({
            title: `Deseja ${texto} o registro?`,
            description: `'${item.nome}' será ${item.situacao}.`,
            cancellationText: 'CANCELAR',
            confirmationText: texto.toUpperCase()
        })
            .then(() => {
                dispatch(userActions.userUpdate(item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    return (
        <>
            <React.Fragment>
                <Title>Usuários <Button aria-label="Adicionar Usuário" title="Adicionar Usuário" href="/usuarios/adicionar"><AddCircle style={{ color: green[500] }} />
                </Button></Title>
                <Paper>
                    {items.length === 0 ? <Loading />
                        :
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Login</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Perfil</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((row) => (
                                    <TableRow key={row.id}
                                        style={row.situacao === 'ativo' ? {} : { backgroundColor: red[100] }}
                                    >
                                        <TableCell>{row.nome}</TableCell>
                                        <TableCell>{row.login}</TableCell>
                                        <TableCell>{row.telefone}</TableCell>
                                        <TableCell>{row.perfil === 'USER' ? 'Usuário' : 'Administrador'}</TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup size="small" aria-label="small outlined button group">
                                                <Button size="small" href={`/usuarios/pass/${row.id}`} aria-label="Trocar Senha" title="Trocar Senha"><VpnKeyIcon style={{ color: blue[500] }} fontSize="small" /></Button>
                                                <Button size="small" href={`/usuarios/alterar/${row.id}`} aria-label="Alterar" title="Alterar"><EditIcon style={{ color: blue[500] }} fontSize="small" /></Button>
                                                <Button size="small"
                                                    aria-label={row.situacao === 'ativo' ? 'Desativar' : 'Ativar'}
                                                    title={row.situacao === 'ativo' ? 'Desativar' : 'Ativar'}
                                                    onClick={() => handleDelete(row)}
                                                >
                                                    {row.situacao !== 'ativo' ? <DoneIcon style={{ color: green[500] }} fontSize="small" /> : <BlockIcon style={{ color: red[500] }} fontSize="small" />}
                                                </Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    }
                </Paper>

            </React.Fragment>
        </>
    );
}
