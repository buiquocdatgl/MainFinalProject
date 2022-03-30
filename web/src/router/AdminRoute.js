import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {

        if (user && user.id) {
            if (user.role === "ADMIN"){
                console.log("Admin")
                setOk(true);
            }else {
                setOk(false);
            }
        }
    }, [user]);

    return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default AdminRoute;
