import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import './scss/_normalize.scss'
import Header from "./componets/Header";
import Auth from "./pages/Auth";

const App:FC = () => {
    console.log(process.env.REACT_APP_TT)
    return (
        <>
            <Header/>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/basket" element={<Basket/>}/>
                </Route>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/registration" element={<Auth/>}/>
                <Route path="/" element={<Shop/>}/>
                <Route path="/device-page" element={<DevicePage/>}/>
            </Routes>
        </>
    );
};

export default App;