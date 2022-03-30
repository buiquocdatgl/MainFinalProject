import React from "react";
import { Switch ,Route } from 'react-router-dom';
import DashboardPage from '../screen/Dashboard/Dashboard';
import LoginPage from '../screen/Login/Login';
import AdminRoute from "./AdminRoute";

function AppRouter() {

    return (
        <Switch>
            <Route
                exact path="/"
                component={
                    LoginPage
                }
            />
            <AdminRoute exact path="/dash" component={DashboardPage} />
        </Switch>

    )
}

export default AppRouter