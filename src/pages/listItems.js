import React, { useEffect } from 'react';
import { useHistory, Link as LinkRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Divider } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { AirlineSeatReclineNormal, AirportShuttle, Contacts, Explore, PermContactCalendar } from '@material-ui/icons';

import { userActions } from "../store/actions";

function ListItemLink(props) {
    if (props.onClick)
        return <ListItem  {...props} />;
    else
        return <ListItem component={LinkRouter} {...props} />;
}

export default function ListItems() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user, user: { perfil } } = useSelector(state => state.users)

    async function onLogout() {
        dispatch(userActions.logout())
        // history.push('/login')
    }
    return (
        <div>
            <Divider />
            <ListItemLink to="/" button >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemLink>

            <ListItemLink to="/pessoas" button>
                <ListItemIcon>
                    <Contacts />
                </ListItemIcon>
                <ListItemText primary="Pessoas" />
            </ListItemLink>

            {perfil === 'ADMIN' &&
                <ListItemLink to="/usuarios" button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                </ListItemLink>
            }
            <Divider />
            <ListItemLink onClick={onLogout} button>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItemLink>
        </div>
    )
}