import React from 'react'
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
    return (
        <Typography variant="body2" component="div" color="textSecondary" align="center">
            <CircularProgress color="secondary"/>
        </Typography >
    );
}