import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';
import { Edit as EditIcon, AddCircle } from '@material-ui/icons';
import {
    ButtonGroup, Button, Typography, Link, TableRow, TableHead, TableCell, TableBody, Table, Paper, Grid
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Done as DoneIcon, Block as BlockIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { pessoaActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { Link as LinkRouter, useParams } from 'react-router-dom'
import moment from 'moment'
import EnderecosPessoa from '../enderecos/enderecosPessoa';
import TelefonesPessoa from '../telefones/telefonesPessoa';
import BeneficiosPessoa from '../beneficios/beneficiosPessoa';
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    botoes: {
        marginLeft: 1,
        marginRight: 1,
        padding: 1
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function PessoaDetalhes() {
    const classes = useStyles()
    const { id } = useParams()
    const [telefones, setTelefones] = useState([])
    const [enderecos, setEnderecos] = useState([])
    const [beneficios, setBeneficios] = useState([])

    const { pessoas, pessoas: { pessoaFormShow, items, loading, pessoaUpdated }
    } = useSelector(state => state)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(pessoaActions.pessoaGet(id))
    }, [])

    useEffect(() => {
        if (pessoaUpdated) {
            setTelefones(pessoaUpdated.telefones)
            setEnderecos(pessoaUpdated.enderecos)
            setBeneficios(pessoaUpdated.beneficios)
        }
    }, [pessoaUpdated])


    const confirm = useConfirm();
    const handleDelete = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `'${item.nome}' será removido.`,
            cancellationText: 'CANCELAR',
            confirmationText: 'deseja deletar o registro?'.toUpperCase()
        })
            .then(() => {
                dispatch(pessoaActions.pessoaRemove(item.id))
                //dispatch(pessoaActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    return (
        <>

            <React.Fragment>
                <Title> <Button component={LinkRouter} aria-label="Lista de pessoas" title="Lista de pessoas" to="/pessoas"><ArrowBackIcon style={{ color: green[1000] }} /></Button>
                Ver Dados {pessoaUpdated && `de ${pessoaUpdated.nome}`} </Title>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {!pessoaUpdated ? <Loading /> :
                                <Table size="small">

                                    <TableBody>
                                        {pessoaUpdated &&
                                            <TableRow>
                                                <TableCell><b>Nome:</b> {pessoaUpdated.nome}</TableCell>
                                                <TableCell><b>CPF:</b> {`${pessoaUpdated.cpf.substring(0, 3)}.${pessoaUpdated.cpf.substring(3, 6)}.${pessoaUpdated.cpf.substring(6, 9)}-${pessoaUpdated.cpf.substring(pessoaUpdated.cpf.length - 2)}`}</TableCell>
                                                <TableCell><b>Data Nascimento:</b> {pessoaUpdated.data_nascimento && moment(pessoaUpdated.data_nascimento).format('DD/MM/YYYY')}</TableCell>
                                            </TableRow>

                                        }
                                        {pessoaUpdated &&
                                            <TableRow>
                                                <TableCell><b>Nome da Mãe:</b> {`${pessoaUpdated.nome_mae}`}</TableCell>
                                                <TableCell><b>Sexo:</b> {pessoaUpdated.sexo}       <b>Renda:</b>  {pessoaUpdated.renda && `R$ ${pessoaUpdated.renda}`} </TableCell>
                                                <TableCell><b>Data Obito:</b> {pessoaUpdated.data_obito && moment(pessoaUpdated.data_obito).format('DD/MM/YYYY')}</TableCell>
                                            </TableRow>

                                        }
                                        {pessoaUpdated &&
                                            <TableRow>
                                                <TableCell><b>Escolaridade:</b> {`${pessoaUpdated.escolaridade}`}</TableCell>
                                                <TableCell><b>Profissão:</b> {`${pessoaUpdated.profissao}`}</TableCell>
                                                <TableCell><b>Nacionalidade:</b> {`${pessoaUpdated.nacionalidade}`}</TableCell>

                                            </TableRow>

                                        }

                                    </TableBody>
                                </Table>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>
                            {!pessoaUpdated ? <Loading /> : <EnderecosPessoa enderecos={enderecos} pessoa_id={id} />}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>
                            {!pessoaUpdated ? <Loading /> : <TelefonesPessoa telefones={telefones} pessoa_id={id} />}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {!pessoaUpdated ? <Loading /> : <BeneficiosPessoa beneficios={beneficios} pessoa_id={id} />}
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    );
}
