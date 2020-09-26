import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { beneficioActions } from "../../store/actions";
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
export default function BeneficioEditForm(props) {
    const history = useHistory()
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { pessoa_id, id } = useParams()

    const { beneficios: { beneficioUpdated } }
        = useSelector(state => state)

    useEffect(() => {
        dispatch(beneficioActions.beneficioGet(pessoa_id, id))
    }, [])

    useEffect(() => {
        if (beneficioUpdated) {
            formRef.current.setData(beneficioUpdated)
        }
    }, [beneficioUpdated])


    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                beneficio: yup.string().required('O número do Benefício é necessário.'),
                situacao: yup.string().required('A Situação é necessária.'),
                especie: yup.string().required('A espécie é necessária.'),
                forma_pagamento: yup.string().required('A forma de pagamento é necessária.'),
                banco_pagamento: yup.string().required('O banco é necessário.'),
                agencia_pagamento: yup.string().required('A agencia é necessária.'),
                mensalidade: yup.string().required('A Mensalidade é necessária.'),

                consignavel: yup.string().required('Informe se é consignável.'),
                bloqueado_emprestimo: yup.string().required('Informe se possui bloqueio.'),
                possui_procurador: yup.string().required('Informe se possui procurador ou representante legal.'),
                pensao_alimenticia: yup.string().required('Informe se é pensao alimenticia.'),
            });
            await schema.validate(data, {
                abortEarly: false
            })
            data.beneficio = data.beneficio.split('.').join('').split('-').join('')
            data = { ...data, pessoa_id, id }

            dispatch(beneficioActions.beneficioUpdate(pessoa_id, data))

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
        <> {false ? <Loading />
            :
            <Container component="main" maxWidth="md">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Alterar Benefício
                    </Typography>

                    <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="beneficio"
                                    id="beneficio"
                                    label="Número do Benefício"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="situacao"
                                    id="situacao"
                                    label="Situação"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="especie"
                                    id="especie"
                                    label="Cod. especie"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    name="descricao_especie"
                                    id="descricao_especie"
                                    label="Descrição Espécie"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Select
                                    required
                                    fullWidth
                                    id="forma_pagamento"
                                    name="forma_pagamento"
                                    label="Forma de Pagamento:"
                                >
                                    <MenuItem value="Conta Corrente">Conta Corrente</MenuItem>
                                    <MenuItem value="Cartão Magnético">Cartão Magnético</MenuItem>
                                </Select >
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="banco_pagamento"
                                    id="banco_pagamento"
                                    label="Banco"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    name="agencia_pagamento"
                                    id="agencia_pagamento"
                                    label="Agência"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="conta_pagamento"
                                    id="conta_pagamento"
                                    label="Conta"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="mensalidade"
                                    id="mensalidade"
                                    label="Mensalidade"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="margem_estimada"
                                    id="margem_estimada"
                                    label="Margem p/ empréstimo"
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="margem_estimada_cartao"
                                    id="margem_estimada_cartao"
                                    label="Margem p/ cartão"
                                    fullWidth
                                    required
                                />
                            </Grid>


                            <Grid item xs={12} sm={3}>
                                <Select
                                    required
                                    fullWidth
                                    id="consignavel"
                                    name="consignavel"
                                    label="Elegível p/ Empréstimo:"
                                >
                                    <MenuItem value="true">Sim</MenuItem>
                                    <MenuItem value="false">Não</MenuItem>
                                </Select >
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    required
                                    fullWidth
                                    id="bloqueado_emprestimo"
                                    name="bloqueado_emprestimo"
                                    label="Bloqueado p/ Empréstimo:"
                                >
                                    <MenuItem value="true">Sim</MenuItem>
                                    <MenuItem value="false">Não</MenuItem>
                                </Select >
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    required
                                    fullWidth
                                    id="possui_procurador"
                                    name="possui_procurador"
                                    label="Possui Procurador:"
                                >
                                    <MenuItem value="true">Sim</MenuItem>
                                    <MenuItem value="false">Não</MenuItem>
                                </Select >
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select
                                    required
                                    fullWidth
                                    id="pensao_alimenticia"
                                    name="pensao_alimenticia"
                                    label="É Pensão Alimentícia:"
                                >
                                    <MenuItem value="true">Sim</MenuItem>
                                    <MenuItem value="false">Não</MenuItem>
                                </Select >
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
