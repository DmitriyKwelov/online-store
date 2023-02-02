import React, {FC} from 'react';
import styles from './Auth.module.scss'
import {NavLink} from "react-router-dom";

const Auth:FC = () => {
    return (
        <div className={styles.root}>
            <div className={styles.form}>
                <div className={styles.content}>
                    <h2>Login</h2>
                    <input placeholder="Email" type="text"/>
                    <input placeholder="Password" type="text"/>
                    <div className={styles.downContent}>
                        <p>Нет aккаунта? <NavLink to="/registration">Зарегистрируйся!</NavLink></p>
                        <button>login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;