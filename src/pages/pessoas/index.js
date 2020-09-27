import React, { useEffect, useState, useCallback, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { Edit as EditIcon, AddCircle, Delete as DeleteIcon, Search as SearchIcon } from '@material-ui/icons';
import {
    ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, TablePagination, Grid
    , TableFooter, Link, Paper, Divider
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Done as DoneIcon, Block as BlockIcon, Visibility as VisibilityIcon, RotateLeft as RotareLeftIcon } from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { pessoaActions } from '../../store/actions'
import { pessoaConstants } from '../../store/constants'
import { useConfirm } from "material-ui-confirm";
import { Link as LinkRouter } from 'react-router-dom'
import BuscaForm from './buscaForm';
import { TextField } from 'unform-material-ui';
import { Form } from "@unform/web";
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));
function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    botoes: {
        marginLeft: 1,
        marginRight: 1,
        padding: 1
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0),
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Pessoas() {
    const classes = useStyles()
    const formRef = useRef(null)

    const { pessoas: { items, loading }
    } = useSelector(state => state)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [pessoas, setPessoas] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [total, setTotal] = useState(0)
    const [filtro, setFiltro] = useState({ limit: 25, offset: 0 })
    const [cpf, setCpf] = useState('')
    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }
    useEffect(() => {
        dispatch(pessoaActions.findPages(filtro))
    }, [])

    useEffect(() => {
        console.log(filtro)
        if (cpf) {
            setFiltro({ ...filtro, cpf })
        }
        dispatch({ type: pessoaConstants.PESSOA_LOADING })
        dispatch(pessoaActions.findPages(filtro))
    }, [filtro])

    useEffect(() => {
        setFiltro({ ...filtro, limit: rowsPerPage })
    }, [rowsPerPage])

    useEffect(() => {
        setFiltro({ ...filtro, offset: page })
    }, [page])

    useEffect(() => {
        if (items.count)
            setTotal(items.count)
        if (items.rows) {
            setPessoas(items.rows)
            dispatch({ type: pessoaConstants.PESSOA_LOADING })
        }
    }, [items])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 15));
        setPage(0);
    };
    const resetFiltro = () => {
        setFiltro({ limit: 25, offset: 0 })
    }
    const confirm = useConfirm();
    const handleDelete = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `'${item.nome}' será removido.`,
            cancellationText: 'CANCELAR',
            confirmationText: 'REMOVER'
        })
            .then(() => {
                dispatch(pessoaActions.pessoaRemove(item))
                //dispatch(pessoaActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    async function handleSubmit(data, { reset }) {
        if (data.cpf === "") delete data.cpf
        else {
            let cpf = data.cpf.split('.').join('').split('-').join('')
            dispatch({ type: pessoaConstants.PESSOA_LOADING })
            setPage(0)
            dispatch(pessoaActions.findPages({ ...filtro, cpf }))

        }


    };
    return (
        <>

            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={5}>
                        <Title>Pessoas <Button component={LinkRouter} aria-label="Adicionar pessoa" title="Adicionar pessoa" to="/pessoas/adicionar"><AddCircle style={{ color: green[500] }} />
                        </Button>
                        </Title>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Form className={classes.form} onSubmit={handleSubmit} ref={formRef}>

                            <Paper className={classes.root}>
                                <TextField
                                    className={classes.input} name="cpf"
                                    id="cpf"
                                    placeholder="Digite CPF"
                                    inputProps={{ 'aria-label': 'Busque CPF' }}
                                />
                                <IconButton type="submit" className={classes.iconButton} aria-label="Buscar" title="Buscar">
                                    <SearchIcon />
                                </IconButton>
                                <Divider className={classes.divider} orientation="vertical" />
                                <IconButton type="reset" className={classes.iconButton} aria-label="Resetar Filtro" title="Resetar Filtro" onClick={resetFiltro}>
                                    <RotareLeftIcon />
                                </IconButton>

                            </Paper>
                        </Form>

                    </Grid>
                </Grid>




                {loading && !pessoas.length ? <Loading />
                    :
                    <Paper>
                        <Table size="small" style={{ marginTop: 10 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Benefícios</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!loading && pessoas.length === 0
                                    ?
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" > Nenhum registro encontrado</TableCell>
                                    </TableRow>
                                    :
                                    pessoas.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nome}</TableCell>
                                            <TableCell>{row.cpf}</TableCell>
                                            <TableCell align="center">{row.beneficios && row.beneficios.length > 0 ? row.beneficios.length : 0}</TableCell>
                                            <TableCell align="right">
                                                <ButtonGroup size="small" aria-label="small outlined button group">
                                                    <Button component={LinkRouter} to={`/pessoas/${row.id}`} title="Ver detalhes"><VisibilityIcon style={{ color: blue[350] }} /></Button>
                                                    <Button component={LinkRouter} to={`/pessoas/alterar/${row.id}`} title="Alterar"><EditIcon style={{ color: blue[500] }} fontSize="small" /></Button>
                                                    <Button size="small"
                                                        aria-label="Remover"
                                                        title="Remover"
                                                        onClick={() => handleDelete(row)}
                                                    >
                                                        <DeleteIcon style={{ color: red[500] }} fontSize="small" />
                                                    </Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[25, 50, 75, 100, { label: 'Todos', value: -1 }]}
                                        colSpan={5}
                                        count={total}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page', },
                                            native: true,
                                        }}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                }
            </React.Fragment>
        </>
    );
}
