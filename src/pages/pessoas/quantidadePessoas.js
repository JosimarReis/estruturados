import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import moment from 'moment'
import { Link as LinkRouter } from "react-router-dom";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function QuantidadePessoas(props) {
    const classes = useStyles();
    const { quantidade } = props
    return (
        <React.Fragment>
            <Title>Pessoas na base</Title>
            <Typography component="p" variant="h4">
                {new Intl.NumberFormat('pt').format(quantidade)}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {moment().format('DD/MM/YYYY')}
            </Typography>
            <div>
                <Link color="primary" component={LinkRouter} to="/pessoas" >
                    Ver todos</Link>
            </div>
        </React.Fragment>
    );
}