import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import Shop from "./pages/Shop";
import DevicePage from "./pages/DevicePage";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import './scss/_normalize.scss'
import Header from "./componets/Header";
import Auth from "./pages/Auth";
import {useAppDispatch} from "./redux/store";
import {check, setAuthState, Status} from "./redux/slices/authSlice";
import {$authHost} from "./http";

const App: FC = () => {

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const {data} = await $authHost.get('api/user/auth');
                localStorage.setItem('token', data.token)
                dispatch(setAuthState({
                    status: Status.SUCCESS,
                    isAuth: true,
                    user: data.user
                }))
                setIsLoading(false)
            } catch (e) {
                console.log(e)
                setIsLoading(false)
            }
        }
        checkAuth()
    }, [])

    if(isLoading){
        return <div>загрузка</div>
    }

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