import React, {FC, useState} from 'react';
import styles from './Auth.module.scss'
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../redux/store";
import {login} from "../../redux/slices/authSlice";

const Auth:FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();

    const loginUser = (email: string, password: string) => {
        dispatch(login({
            email,
            password
        }))
    }

    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <div className={styles.content}>
                    <h2>Login</h2>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="text"/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="text"/>
                    <div className={styles.downContent}>
                        <p>Нет aккаунта? <NavLink to="/registration">Зарегистрируйся!</NavLink></p>
                        <button onClick={() => loginUser(email, password)}>login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;