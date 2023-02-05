import React, {FC, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../componets/modals/CreateBrand";
import CreateType from "../componets/modals/CreateType";
import CreateProduct from "../componets/modals/CreateProduct";

const Admin:FC = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    if(user && user.role !== "ADMIN"){
        navigate('/')
    }

    const [brandVisible, SetBrandVisible] = useState(false);
    const [typeVisible, SetTypeVisible] = useState(false);
    const [productVisible, SetProductVisible] = useState(false);

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => SetTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => SetBrandVisible(true)}
            >
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-2"
                onClick={() => SetProductVisible(true)}
            >
                Добавить продукт
            </Button>
            <CreateBrand show={brandVisible} onHide={() => SetBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => SetTypeVisible(false)}/>
            <CreateProduct show={productVisible} onHide={() => SetProductVisible(false)}/>
        </Container>
    );
};

export default Admin;