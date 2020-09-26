import React from 'react'
import Typography from '@material-ui/core/Typography';

export default function Copyright(props) {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {props.text && props.text}
            {!props.text && `Josimar Reis - 38 99853-8714`}
        </Typography >
    );
}