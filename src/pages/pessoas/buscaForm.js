import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { TextField } from 'unform-material-ui';
import { Form } from "@unform/web";
import {
    Button, Container, Grid, MenuItem, Link
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Title from '../Title';
import { AddCircle } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

import { Link as LinkRouter } from 'react-router-dom'
import { pessoaActions } from '../../store/actions';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
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
    },
}));
const BuscaForm = (props) => {
    const formRef = useRef(null)
    const classes = useStyles();
    const dispatch = useDispatch()



    async function handleSubmit(data, { reset }) {
        if (data.cpf === "") delete data.cpf
        else {
            let cpf = data.cpf
            console.log(cpf)
            props.handleChangeCpf(cpf)
        }


    };

    return (

        <div className={classes.paper}>

            <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}> <Title>Pessoas <Button component={LinkRouter} aria-label="Adicionar pessoa" title="Adicionar pessoa" to="/pessoas/adicionar"><AddCircle style={{ color: green[500] }} />
                    </Button>
                    </Title></Grid>
                    <Grid item xs={12} sm={2} >
                        <TextField
                            name="cpf"
                            id="cpf"
                            label="CPF"
                            fullWidth

                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            className={classes.submit}
                        >Buscar</Button>
                    </Grid>

                </Grid>


            </Form>
        </div>

    );
};

export default BuscaForm