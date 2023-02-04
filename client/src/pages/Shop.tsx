import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {fetchBrand, fetchTypes, selectFilters} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";
import {fetchProducts, selectProducts} from "../redux/slices/productSlice";
import {Col, Row} from "react-bootstrap";
import TypeBar from "../componets/TypeBar";
import BrandBar from "../componets/Header/BrandBar";
import DeviceList from "../componets/DeviceList";

const Shop: FC = () => {

    const [isLoading, setIsLoading] = useState(true)
    const {types, brands} = useSelector(selectFilters)
    const products = useSelector(selectProducts)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTypes())
        dispatch(fetchBrand())
        dispatch(fetchProducts())
    }, [])

    return (
        <div>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </div>
    );
};

export default Shop;