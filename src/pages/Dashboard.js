import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, IconButton,
    Container,
} from "@material-ui/core";
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import ListItems from './listItems';
import {
    Route,
    Switch,
} from "react-router-dom";

import Copyright from "../component/Copyright";
import Users from './usuarios';
import UserForm from './usuarios/userForm';
import UserEditForm from './usuarios/userEditForm';
import UserPassForm from './usuarios/userPassForm';
import Pessoas from './pessoas';
import PessoaForm from './pessoas/pessoaForm';
import PessoaEditForm from './pessoas/pessoaEditForm';
import PessoaDetalhes from './pessoas/pessoaDetalhes';
import TelefoneForm from './telefones/telefoneForm';
import TelefoneEditForm from './telefones/telefoneEditForm';
import EnderecoForm from './enderecos/enderecoForm';
import EnderecoEditForm from './enderecos/enderecoEditForm';
import BeneficioForm from './beneficios/beneficioForm';
import BeneficioEditForm from './beneficios/beneficioEditForm';
import EmprestimoForm from './emprestimos/emprestimoForm';
import EmprestimoEditForm from './emprestimos/emprestimoEditForm';
import CartaoEditForm from './cartoes/cartaoEditForm';
import CartaoForm from './cartoes/cartaoForm';
import Inicio from './dashbord';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    logo: {
        maxWidth: 120,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
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
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (

        <div className={classes.root}>
            <CssBaseline />
            <AppBar

                position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Base Estruturados
                        </Typography>

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List><ListItems /></List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <Route path="/" exact component={Inicio} />

                        <Route path="/pessoas/:pessoa_id/beneficios/:beneficio_id/cartoes/alterar/:id" component={CartaoEditForm} />
                        <Route path="/pessoas/:pessoa_id/beneficios/:beneficio_id/cartoes/cadastrar" component={CartaoForm} />


                        <Route path="/pessoas/:pessoa_id/beneficios/:beneficio_id/emprestimos/alterar/:id" component={EmprestimoEditForm} />
                        <Route path="/pessoas/:pessoa_id/beneficios/:beneficio_id/emprestimos/cadastrar" component={EmprestimoForm} />

                        <Route path="/pessoas/:pessoa_id/beneficios/alterar/:id" component={BeneficioEditForm} />
                        <Route path="/pessoas/:pessoa_id/beneficios/cadastrar" component={BeneficioForm} />

                        <Route path="/pessoas/:pessoa_id/enderecos/alterar/:id" component={EnderecoEditForm} />
                        <Route path="/pessoas/:pessoa_id/enderecos/cadastrar" component={EnderecoForm} />

                        <Route path="/pessoas/:pessoa_id/telefones/alterar/:id" component={TelefoneEditForm} />
                        <Route path="/pessoas/:pessoa_id/telefones/cadastrar" component={TelefoneForm} />


                        <Route path="/pessoas/adicionar" component={PessoaForm} />
                        <Route path="/pessoas/alterar/:id" component={PessoaEditForm} />
                        <Route path="/pessoas/:id" component={PessoaDetalhes} />
                        <Route path="/pessoas" component={Pessoas} />



                        <Route path="/usuarios/pass/:id" component={UserPassForm} />
                        <Route path="/usuarios/alterar/:id" component={UserEditForm} />
                        <Route path="/usuarios/adicionar" component={UserForm} />
                        <Route path="/usuarios" component={Users} />

                    </Switch>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>

            </main>

        </div>

    );
}