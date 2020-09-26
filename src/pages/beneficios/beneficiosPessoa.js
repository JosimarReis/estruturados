import React, { useEffect, useState } from 'react';
import { green, red, blue } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
    ButtonGroup, Button, TableRow, TableHead, TableCell, TableBody, Table, Link, Collapse,
    Box, Typography, IconButton
} from '@material-ui/core';
import {
    Delete as DeleteIcon, Edit as EditIcon, VpnKey as VpnKeyIcon, AddCircle,
    KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon
} from '@material-ui/icons';
import Title from '../Title';
import Loading from "../../component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { beneficioActions, cartaoActions, emprestimoActions } from '../../store/actions'
import { useConfirm } from "material-ui-confirm";
import { useHistory, Link as LinkRouter } from "react-router-dom";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});
export default function BeneficiosPessoa(props) {
    const [beneficios, setBeneficios] = useState(props.beneficios)
    const dispatch = useDispatch()
    const history = useHistory()
    const confirm = useConfirm();



    const handleDelete = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `O benefício de número '${item.beneficio}' será removido permanentemente.`,
            cancellationText: 'CANCELAR',
            confirmationText: "remover".toUpperCase()
        })
            .then(() => {

                dispatch(beneficioActions.beneficioRemove(props.pessoa_id, item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    const handleDeleteCartao = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `O cartão de contrato '${item.contrato}' será removido permanentemente.`,
            cancellationText: 'CANCELAR',
            confirmationText: "remover".toUpperCase()
        })
            .then(() => {

                dispatch(cartaoActions.cartaoRemove(props.pessoa_id, item.beneficio_id, item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    }; const handleDeleteEmprestimo = item => {

        confirm({
            title: `Deseja remover o registro?`,
            description: `O emprestimo de contrato '${item.contrato}' será removido permanentemente.`,
            cancellationText: 'CANCELAR',
            confirmationText: "remover".toUpperCase()
        })
            .then(() => {

                dispatch(emprestimoActions.emprestimoRemove(props.pessoa_id, item.beneficio_id, item))
                //dispatch(userActions.getAll())

            })
            .catch(() => console.log("Deletion cancelled."));
    };
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.beneficio}
                    </TableCell>
                    <TableCell>R$ {row.mensalidade}</TableCell>
                    <TableCell>R$ {row.margem_estimada}</TableCell>
                    <TableCell>R$ {row.margem_estimada_cartao}</TableCell>
                    <TableCell>{row.emprestimos.length ? `${row.emprestimos.length}` : 'Não possui'}</TableCell>
                    <TableCell>{row.cartoes.length ? `${row.cartoes.length}` : 'Não possui'}</TableCell>
                    <TableCell align="right">
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button component={LinkRouter} size="small" to={`/pessoas/${props.pessoa_id}/beneficios/alterar/${row.id}`} aria-label="Alterar" title="Alterar"><EditIcon style={{ color: blue[500] }} fontSize="small" /></Button>
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
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">Emprestimos
                                <Button component={LinkRouter} aria-label="Adicionar Emprestimo" title="Adicionar Emprestimo" to={`/pessoas/${props.pessoa_id}/beneficios/${row.id}/emprestimos/cadastrar`}><AddCircle style={{ color: green[500] }} /></Button>
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Banco</TableCell>
                                            <TableCell>Contrato</TableCell>
                                            <TableCell>Prazo</TableCell>
                                            <TableCell>Valor (R$)</TableCell>
                                            <TableCell>Parcela (R$)</TableCell>
                                            <TableCell>Inicio</TableCell>
                                            <TableCell>Fim</TableCell>
                                            <TableCell>Inclusão</TableCell>
                                            <TableCell>Situação</TableCell>
                                            <TableCell>Averbação</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.emprestimos && row.emprestimos < 1 ?
                                            <TableRow>
                                                <TableCell component="th" scope="row" align="center" colSpan={12}>
                                                    Sem emprestimos contratados.
                                                </TableCell>
                                            </TableRow>
                                            : row.emprestimos.map((emprestimo) => (
                                                <TableRow key={emprestimo.id}>
                                                    <TableCell component="th" scope="row">
                                                        {`${emprestimo.banco} - ${emprestimo.nome_banco}`}
                                                    </TableCell>
                                                    <TableCell>{emprestimo.contrato}</TableCell>
                                                    <TableCell>{emprestimo.prazo}</TableCell>
                                                    <TableCell>{emprestimo.valor_emprestimo}</TableCell>
                                                    <TableCell>{emprestimo.valor_parcela}</TableCell>
                                                    <TableCell>{emprestimo.inicio}</TableCell>
                                                    <TableCell>{emprestimo.fim}</TableCell>
                                                    <TableCell>{emprestimo.inclusao}</TableCell>
                                                    <TableCell>{emprestimo.situacao}</TableCell>
                                                    <TableCell>{emprestimo.averbacao}</TableCell>                                                    <TableCell align="right">
                                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                                            <Button component={LinkRouter} size="small" to={`/pessoas/${props.pessoa_id}/beneficios/${row.id}/emprestimos/alterar/${emprestimo.id}`} aria-label="Alterar" title="Alterar"><EditIcon style={{ color: blue[500] }} fontSize="small" /></Button>
                                                            <Button size="small"
                                                                aria-label="Remover"
                                                                title="Remover"
                                                                onClick={() => handleDeleteEmprestimo(emprestimo)}
                                                            >
                                                                <DeleteIcon style={{ color: red[500] }} fontSize="small" />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </TableCell>

                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">Cartões
                                <Button component={LinkRouter} aria-label="Adicionar Emprestimo" title="Adicionar Emprestimo" to={`/pessoas/${props.pessoa_id}/beneficios/${row.id}/cartoes/cadastrar`}><AddCircle style={{ color: green[500] }} /></Button>
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Banco</TableCell>
                                            <TableCell>Contrato</TableCell>
                                            <TableCell>Limite (R$)</TableCell>
                                            <TableCell>Mensalidade (R$)</TableCell>
                                            <TableCell>Inicio</TableCell>
                                            <TableCell>Averbação</TableCell>
                                            <TableCell>Observação</TableCell>
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.cartoes && row.cartoes < 1 ?
                                            <TableRow>
                                                <TableCell component="th" scope="row" align="center" colSpan={8}>
                                                    Sem cartões contratados
                                                </TableCell>
                                            </TableRow>
                                            : row.cartoes.map((cartao) => (
                                                <TableRow key={cartao.id}>
                                                    <TableCell component="th" scope="row">
                                                        {`${cartao.banco} - ${cartao.nome_banco}`}
                                                    </TableCell>
                                                    <TableCell>{cartao.contrato}</TableCell>
                                                    <TableCell>{cartao.limite}</TableCell>
                                                    <TableCell>{cartao.mensalidade}</TableCell>
                                                    <TableCell>{cartao.inicio}</TableCell>
                                                    <TableCell>{cartao.averbacao}</TableCell>
                                                    <TableCell>{cartao.observacao}</TableCell>
                                                    <TableCell align="right">
                                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                                            <Button component={LinkRouter} size="small" to={`/pessoas/${props.pessoa_id}/beneficios/${row.id}/cartoes/alterar/${cartao.id}`} aria-label="Alterar" title="Alterar"><EditIcon style={{ color: blue[500] }} fontSize="small" /></Button>
                                                            <Button size="small"
                                                                aria-label="Remover"
                                                                title="Remover"
                                                                onClick={() => handleDeleteCartao(cartao)}
                                                            >
                                                                <DeleteIcon style={{ color: red[500] }} fontSize="small" />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    return (
        <>
            <React.Fragment>
                <Title>Benefícios <Link component={LinkRouter} aria-label="Adicionar Benefício" title="Adicionar Benefício" to={`/pessoas/${props.pessoa_id}/beneficios/cadastrar`}><AddCircle style={{ color: green[500] }} />
                </Link></Title>
                {props.beneficios && props.beneficios.length < 1 ? 'Nenhum benefício cadastrado.'
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>NB</TableCell>
                                <TableCell>renda</TableCell>
                                <TableCell>Margem</TableCell>
                                <TableCell>Margem Cartão</TableCell>
                                <TableCell>Emprestimos</TableCell>
                                <TableCell>Cartões</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.beneficios.map((row) => (
                                <Row key={row.id} row={row} pessoa_id={props.pessoa_id} />
                            ))}
                        </TableBody>
                    </Table>
                }
            </React.Fragment>
        </>
    );
}
