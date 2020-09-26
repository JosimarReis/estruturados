import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { TextField } from 'unform-material-ui';
import { Form } from "@unform/web";
import {
    Button, Container, Grid, Typography, Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as yup from "yup";

import { useParams, useHistory } from "react-router-dom";


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
export default function UserPassForm() {
    const history = useHistory()
    const [nome, setNome] = useState('')
    const formRef = useRef(null)
    const classes = useStyles();
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user }
        = useSelector(state => state.users)

    useEffect(() => {
        dispatch(userActions.userGet(id))
    }, [])

    useEffect(() => {
        if (user.perfil === 'USER') {
            history.push('/')
            history.go()
        }
        if (user) {
            setNome(user.nome)
        }
    }, [user])
    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                senha: yup.string()
                    .required('Informe sua senha.')
                    .min(8, 'A senha é muito curta - deve ter no mínimo 8 caracteres.'),
                senhaConfirmacao: yup.string()
                    .oneOf([yup.ref('senha'), null], 'As senhas estao diferentes')
            });
            await schema.validate(data, {
                abortEarly: false
            })
            data = { id, senha: data.senha, login: user.login }
            dispatch(userActions.userUpdatePass(data))

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

        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Alterar Senha de "{nome}"
           </Typography>
                <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                    <Grid container spacing={2}>

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
