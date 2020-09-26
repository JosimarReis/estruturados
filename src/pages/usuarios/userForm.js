import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";
import { Select, TextField } from 'unform-material-ui';
import { Form } from "@unform/web";
import {
    Button, Container, Grid, Typography, Link, MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import * as yup from "yup";



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
export default function UserForm() {
    const history = useHistory()
    const formRef = useRef(null)
    const classes = useStyles();
    const dispatch = useDispatch()

    const { user, user: { perfil }
    } = useSelector(state => state.users)
    useEffect(() => {

        if (perfil === 'USER') {
            history.push('/')
            history.go()
        }
    }, [user])

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                nome: yup.string().required('O nome é necessário.'),
                login: yup.string().required('O login é necessário.')
                    .min(4, 'O login é muito curto - deve ter no mínimo 6 caracteres.'),
                senha: yup.string()
                    .required('Informe sua senha.')
                    .min(8, 'A senha é muito curta - deve ter no mínimo 8 caracteres.'),
                senhaConfirmacao: yup.string()
                    .oneOf([yup.ref('senha'), null], 'As senhas estao diferentes')
            });
            await schema.validate(data, {
                abortEarly: false
            })
            delete data.senhaConfirmacao

            dispatch(userActions.userCreate(data))

            formRef.current.setErrors({})
            history.push('/usuarios')
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

        <Container component="main" maxWidth="md">

            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Cadastrar Usuário
           </Typography>
                <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField

                                autoComplete="nome"
                                name="nome"

                                fullWidth
                                required
                                id="nome"
                                label="Nome"
                                

                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                fullWidth
                                id="telefone"
                                label="Telefone"
                                name="telefone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField

                                required
                                fullWidth
                                id="login"
                                label="Login"
                                name="login"
                                autoComplete="login"


                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField

                                required
                                fullWidth
                                name="senha"
                                label="Senha"
                                type="password"
                                id="senha"
                                autoComplete="current-password"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField

                                required
                                fullWidth
                                name="senhaConfirmacao"
                                label="Confirme sua senha"
                                type="password"
                                id="senhaConfirmacao"
                                autoComplete="current-password"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select

                                required
                                fullWidth
                                id="perfil"
                                name="perfil"
                                label="Perfil"
                            >
                                <MenuItem  value="USER">Usuário</MenuItem>
                                <MenuItem value="ADMIN">Administrador</MenuItem>
                            </Select >
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Select

                                required
                                fullWidth
                                id="situacao"
                                name="situacao"
                                label="Situacão"
                            >
                                <MenuItem  value="ativo">Ativo</MenuItem>
                                <MenuItem value="desativado">Desativado</MenuItem>
                            </Select >
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Salvar
             </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/usuarios" variant="body2">
                                Cancelar
                 </Link>
                        </Grid>
                    </Grid>
                </Form>
            </div>

        </Container>
    );
};
