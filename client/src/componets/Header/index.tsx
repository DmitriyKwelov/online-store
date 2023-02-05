import React from 'react';
import styles from './NavBar.module.scss'
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth, selectUser} from "../../redux/slices/authSlice";
import {Button, Container} from "react-bootstrap";

const Header = () => {

    const isAuth = useSelector(selectIsAuth)
    const user = useSelector(selectUser)

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.content}>
                    <div className="logo">
                        <NavLink to="/">
                            <p>Купи слона</p>
                        </NavLink>
                    </div>
                    {isAuth
                        ?
                        <div className={styles.authBtns}>
                            {user && user.role === "ADMIN" && <NavLink className={styles.adminBtn} to="/admin">Админ панель</NavLink>}
                            <Button>logout</Button>
                        </div>
                        :
                        <nav>
                            <ul>
                                <li><NavLink to="/login">login</NavLink></li>
                                <li><NavLink to="/registration">registration</NavLink></li>
                            </ul>
                        </nav>
                    }

                </div>
            </Container>
        </header>
    );
};

export default Header;