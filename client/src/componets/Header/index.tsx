import React from 'react';
import styles from './NavBar.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../../redux/slices/authSlice";

const Header = () => {

    const isAuth = useSelector(selectIsAuth)

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className="logo">
                    <NavLink to="/">
                        <p>Купи слона</p>
                    </NavLink>
                </div>
                {isAuth
                    ?
                    <button>logout</button>
                    :
                    <nav>
                    <ul>
                    <li><NavLink to="/login">login</NavLink></li>
                    <li><NavLink to="/registration">registration</NavLink></li>
                    </ul>
                    </nav>
                }

            </div>
        </header>
    );
};

export default Header;