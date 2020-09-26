import React, { useRef } from 'react'
import { useDispatch } from "react-redux";
import { telefoneActions } from "../../store/actions";
import { TextField, Select } from 'unform-material-ui';
import { Form } from "@unform/web";
import {
    Button, Container, Grid, Typography, Link, MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link as LinkRouter, useParams } from "react-router-dom";
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
export default function TelefoneForm() {
    const history = useHistory()
    const formRef = useRef(null)
    const classes = useStyles();
    const dispatch = useDispatch()
    const { pessoa_id } = useParams()

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                numero: yup.string().required('O número é necessário.'),
            });
            await schema.validate(data, {
                abortEarly: false
            })

            dispatch(telefoneActions.telefoneCreate(pessoa_id, { ...data, pessoa_id }))

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

        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>

                <Typography component="h1" variant="h5">Cadastrar Telefone</Typography>
                <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="numero"
                                fullWidth
                                required
                                id="numero"
                                label="Número "
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
                                Cancelar</Link>
                        </Grid>
                    </Grid>
                </Form>
            </div>

        </Container>
    );
};
