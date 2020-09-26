import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { pessoaActions } from "../../store/actions";
import { useParams, useHistory, Link as LinkRouter } from "react-router-dom";
import { TextField, Select } from 'unform-material-ui'
import { Form } from "@unform/web";
import {
    Button, Container, Grid, Typography, Link, MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import Loading from '../../component/Loading'
import NumberFormatCustom from "../../component/NumberFormat";

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
export default function PessoaEditForm(props) {
    const history = useHistory()
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { pessoas, pessoas: { loading, pessoaUpdated } }
        = useSelector(state => state)

    useEffect(() => {
        dispatch(pessoaActions.pessoaGet(id))
    }, [])

    useEffect(() => {
        if (pessoaUpdated) {
            formRef.current.setData(pessoaUpdated)
        }
    }, [pessoaUpdated])

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                nome: yup.string().required('O nome é necessário.'),
                cpf: yup.string().required('O cpf é necessário.'),

            });
            await schema.validate(data, {
                abortEarly: false
            })
            data.cpf = data.cpf.split('.').join('').split('-').join('')
            data.renda = parseFloat(data.renda.replace('.', '').replace(',', '.'))
            data = { ...data, id }
            dispatch(pessoaActions.pessoaUpdate(data))

            formRef.current.setErrors({})
            history.push('/pessoas')
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
                        Alterar Pessoa
                    </Typography>
                    <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="nome"
                                    name="nome"
                                    fullWidth
                                    required
                                    id="nome"
                                    label="Nome"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    required
                                    id="cpf"
                                    label="CPF"
                                    name="cpf"
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    id="data_nascimento"
                                    label="Data de Nascimento"
                                    name="data_nascimento"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    id="data_obito"
                                    label="Data de Óbito"
                                    name="data_obito"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Select

                                    required
                                    fullWidth
                                    id="sexo"
                                    name="sexo"
                                    label="Sexo"
                                >
                                    <MenuItem value="Feminino">Feminino</MenuItem>
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                </Select >
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth

                                    id="renda"
                                    label="Renda"
                                    name="renda"

                                />
                            </Grid> <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="nome_mae"
                                    label="Nome da Mãe"
                                    name="nome_mae"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="escolaridade"
                                    label="Escolaridade"
                                    name="escolaridade"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="profissao"
                                    label="Profissão"
                                    name="profissao"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="nacionalidade"
                                    label="Nacionalidade"
                                    name="nacionalidade"
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
                                <Link component={LinkRouter} to="/pessoas" variant="body2">
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
