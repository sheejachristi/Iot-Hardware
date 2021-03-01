import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import {UserContext} from "../context/user-context";

const PrivateRoute = ({component: Component, ...rest}) => {

    const[profile] = useContext(UserContext);
    return (
        <Route {...rest} render={props => (
        profile.authenticated ?
            !!profile.onboarded || window.location.pathname === "/patient/healthcare/register" || window.location.pathname === "/patient/diagnosis/edit" || window.location.pathname === "/patient/healthcare/connect/success" || window.location.pathname === '/patient/interests/add' ?
    <Component {...props} />
: <Redirect push to="/patient/healthcare/register" />
: <Redirect push to="/signin" />
)} />
);
};

export default PrivateRoute;