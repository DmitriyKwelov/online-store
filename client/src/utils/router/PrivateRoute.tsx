import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice";

const PrivateRoute = () => {
    const isAuth = useSelector(selectIsAuth)
    return (
        isAuth ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default PrivateRoute;