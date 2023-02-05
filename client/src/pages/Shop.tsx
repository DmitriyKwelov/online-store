import React, {FC, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {fetchBrand, fetchTypes, selectFilters} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";
import {fetchProducts, selectProducts, selectProductsState} from "../redux/slices/productSlice";
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../componets/TypeBar";
import BrandBar from "../componets/BrandBar";
import DeviceList from "../componets/DeviceList";
import Pages from "../componets/Pages";

const Shop: FC = () => {

    const [isLoading, setIsLoading] = useState(true)
    const {selectedBrand, selectedType} = useSelector(selectFilters)
    const {products, page, limit} = useSelector(selectProductsState)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTypes())
        dispatch(fetchBrand())
        dispatch(fetchProducts({
            typeId: null,
            brandId: null,
            limit: 3,
            page: 1,
        }))
    }, [])

    useEffect(() => {
        dispatch(fetchProducts({
            typeId: selectedType?.id || null,
            brandId: selectedBrand?.id || null,
            limit: limit,
            page: page,
        }))
    }, [selectedBrand, selectedType, page])

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;