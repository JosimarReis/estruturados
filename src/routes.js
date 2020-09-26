import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { history } from "./helpers";
import Dashboard from './pages/Dashboard'
import SingIn from "./pages/SingIn";
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch history={history}>
            <Route path="/login" component={SingIn} />
            <PrivateRoute path="/" component={Dashboard} />

        </Switch>
    </BrowserRouter>
);

export default Routes;