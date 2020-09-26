import React, { useRef, useEffect, useState } from 'react';
import { Container, Typography, Box, CssBaseline, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from "../component/Copyright";

import { TextField } from 'unform-material-ui';
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/actions";

import * as yup from 'yup'
import { Form } from '@unform/web'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        width: 196,
        height: 135,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { users: { user } } = useSelector(state => state)
    const [enviado, setEnviado] = useState(false)
    useEffect(() => {
        if (!user && enviado) {
            const errorMessages = {}
            errorMessages['login'] = 'Login ou senha não conferem.'
            errorMessages['senha'] = 'Login ou senha não conferem.'
            formRef.current.setErrors(errorMessages)
        }
    }, [user, enviado])

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                login: yup.string().required('O login é necessário.'),
                senha: yup.string()
                    .required('Informe sua senha.')
                    .min(8, 'Verifique o tamanho de sua senha.'),
            });
            await schema.validate(data, {
                abortEarly: false
            })

            dispatch(userActions.login(data))

            setEnviado(true)

            formRef.current.setErrors({})
            //            reset()
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
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Base de dados Estruturados
        </Typography>
                <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>

                    <TextField

                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Informe seu login"
                        name="login"
                        autoComplete="login"

                    />
                    <TextField

                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Informe sua senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Entrar
          </Button>

                </Form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}