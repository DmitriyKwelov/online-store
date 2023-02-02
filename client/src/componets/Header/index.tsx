import React from 'react';
import styles from './NavBar.module.scss'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <div className="logo">
                    <NavLink to="/">
                        <p>Купи слона</p>
                    </NavLink>
                </div>
                <nav>
                    <ul>
                        <li><NavLink to="/">fawef</NavLink></li>
                        <li><NavLink to="/">fawef</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;