import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import { useParams } from "react-router-dom";
import { Select, TextField } from 'unform-material-ui'
import { Form } from "@unform/web";
import {
    Button, MenuItem, Container, Grid, Typography, Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import Loading from '../../component/Loading'
import { useHistory } from "react-router-dom";


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
export default function UserEditForm(props) {
    const history = useHistory()
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { id } = useParams()
    const { loading, user, userUpdated }
        = useSelector(state => state.users)

    useEffect(() => {
        dispatch(userActions.userGet(id))
    }, [])

    useEffect(() => {
        if (user.perfil === 'USER') {
            history.push('/')
            history.go()
        }

    }, [user])


    useEffect(() => {
        if (userUpdated) {
            formRef.current.setData(userUpdated)
        }
        console.log(userUpdated)
    }, [userUpdated])

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                nome: yup.string().required('O nome é necessário.'),
                login: yup.string().required('O login é necessário.')
                    .min(4, 'O login é muito curto - deve ter no mínimo 6 caracteres.'),

            });
            await schema.validate(data, {
                abortEarly: false
            })
            data = { ...data, id }

            dispatch(userActions.userUpdate(data))

            formRef.current.setErrors({})
            history.push('/usuarios')
            //reset()
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
            <Container component="main" maxWidth="xs">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Alterar Usuário
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
                        >Salvar</Button>
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
        }</>
    );
};
