import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';
import { Edit as EditIcon, AddCircle, Delete as DeleteIcon } from '@material-ui/icons';
import {
    ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, TablePagination
    , TableFooter, Link, Container, Grid, Paper
} from '@material-ui/core';

import { Done as DoneIcon, Block as BlockIcon, Visibility as VisibilityIcon } from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { pessoaActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { Link as LinkRouter } from 'react-router-dom'
import QuantidadePessoas from '../pessoas/quantidadePessoas';
import clsx from 'clsx';
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    botoes: {
        marginLeft: 1,
        marginRight: 1,
        padding: 1
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

export default function Inicio() {
    const classes = useStyles()
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [quantidade, setQuantidade] = useState(0)
    const { pessoas: { items, loading }
    } = useSelector(state => state)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(pessoaActions.findPages({ limit: 0, offset: 0 }))
    }, [])
    useEffect(() => {
        if (items.count) setQuantidade(items.count)
    }, [items])

    return (
        <>

            <React.Fragment>
                <Title>Dados Estruturados</Title>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {loading && !items.count ? <Loading />
                            : <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <QuantidadePessoas quantidade={quantidade} />
                                </Paper>
                            </Grid>
                        }

                    </Grid>
                </Container>

            </React.Fragment>
        </>
    );
}
