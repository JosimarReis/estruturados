import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { emprestimoActions } from "../../store/actions";
import { useParams, useHistory, Link as LinkRouter } from "react-router-dom";
import { TextField, Select } from 'unform-material-ui'
import { Form } from "@unform/web";
import {
    Button, Container, Grid, Typography, Link, MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import Loading from '../../component/Loading'
import cepPromise from "cep-promise";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function EmprestimoEditForm(props) {
    const history = useHistory()
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { pessoa_id, beneficio_id, id } = useParams()

    const { emprestimos: { emprestimoUpdated } }
        = useSelector(state => state)

    useEffect(() => {
        dispatch(emprestimoActions.emprestimoGet(pessoa_id, beneficio_id, id))
    }, [])

    useEffect(() => {
        if (emprestimoUpdated) {
            formRef.current.setData(emprestimoUpdated)
            console.log(emprestimoUpdated)
        }
    }, [emprestimoUpdated])


    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                banco: yup.string().required('O número do banco é necessário.'),
                nome_banco: yup.string().required('O nome do banco é necessário.'),
                contrato: yup.string().required('O contrato é necessário.'),
                situacao: yup.string().required('A Situacao é necessário.'),
                valor_emprestimo: yup.string().required('A data de início é necessário.'),
                valor_parcela: yup.string().required('A data de início é necessário.'),
                prazo: yup.string().required('A data de início é necessário.'),
                inicio: yup.string().required('A data de início é necessário.'),
                fim: yup.string().required('A data de início é necessário.'),
                inclusao: yup.string().required('A data de início é necessário.'),
            });
            await schema.validate(data, {
                abortEarly: false
            })
            data = { ...data, beneficio_id, id }

            dispatch(emprestimoActions.emprestimoUpdate(pessoa_id, beneficio_id, data))

            formRef.current.setErrors({})
            history.push(`/pessoas/${pessoa_id}`)
            history.go()
        } catch (error) {
            if (error instanceof yup.ValidationError)
                console.log(error)

            const errorMessages = {}
            error.inner.forEach(erro => {
                errorMessages[erro.path] = erro.message
            })
            formRef.current.setErrors(errorMessages)
        }
    };
    return (
        <> {!emprestimoUpdated ? <Loading />
            :
            <Container component="main" maxWidth="md">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Alterar emprestimo
                    </Typography>
                    <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="banco"
                                    id="banco"
                                    label="Banco"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <TextField
                                    name="nome_banco"
                                    id="nome_banco"
                                    label="Nome do Banco"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="situacao"
                                    id="situacao"
                                    label="Situação"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="contrato"
                                    id="contrato"
                                    label="Contrato"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="valor_emprestimo"
                                    id="valor_emprestimo"
                                    label="Valor do emprestimo"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="valor_parcela"
                                    id="valor_parcela"
                                    label="Valor da Parcela"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="prazo"
                                    id="prazo"
                                    label="Prazo"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="inicio"
                                    id="inicio"
                                    label="Data de início"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="fim"
                                    id="fim"
                                    label="Data fim"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="inclusao"
                                    id="inclusao"
                                    label="Data de inclusão"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="averbacao"
                                    id="averbacao"
                                    label="Averbação"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    name="observacao"
                                    id="observacao"
                                    label="Observação"
                                    fullWidth
                                    rows={4}
                                    multiline

                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >Salvar</Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link component={LinkRouter} to={`/pessoas/${pessoa_id}`} variant="body2">
                                    Cancelar
                 </Link>
                            </Grid>
                        </Grid>
                    </Form>
                </div>

            </Container>
        }</>
    );
};
