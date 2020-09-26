import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { telefoneActions } from "../../store/actions";
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
export default function TelefoneEditForm(props) {
    const history = useHistory()
    const classes = useStyles();
    const formRef = useRef(null)
    const dispatch = useDispatch()
    const { pessoa_id, id } = useParams()

    const { telefones: { telefoneUpdated } }
        = useSelector(state => state)

    useEffect(() => {
        dispatch(telefoneActions.telefoneGet(pessoa_id, id))
    }, [])

    useEffect(() => {
        if (telefoneUpdated) {
            formRef.current.setData(telefoneUpdated)
        }
    }, [telefoneUpdated])

    async function handleSubmit(data, { reset }) {
        try {
            const schema = yup.object().shape({
                numero: yup.string().required('O número é necessário.'),
            });
            await schema.validate(data, {
                abortEarly: false
            })

            dispatch(telefoneActions.telefoneUpdate(pessoa_id, { ...data, pessoa_id, id }))

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
            <Container component="main" maxWidth="xs">

                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Alterar Telefone
                    </Typography>
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
