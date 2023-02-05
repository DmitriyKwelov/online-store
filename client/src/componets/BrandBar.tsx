import React from 'react';
import {Card, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectFilters, setSelectedBrand, setSelectedType} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";

const BrandBar = () => {
    const {brands, selectedBrand} = useSelector(selectFilters)

    const dispatch = useAppDispatch();

    return (
        <Row className="d-flex">
            {brands && brands.map(brand =>
                <Card
                    style={{width: '100px', marginRight: '10px', cursor: 'pointer'}}
                    border={brand.id === selectedBrand?.id ? 'danger' : 'light'}
                    key={brand.id}
                    onClick={() => dispatch(setSelectedBrand(brand))}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
};

export default BrandBar;