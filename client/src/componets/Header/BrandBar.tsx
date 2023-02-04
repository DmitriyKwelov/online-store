import React from 'react';
import {Card, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectFilters} from "../../redux/slices/filterSlice";

const BrandBar = () => {
    const {brands} = useSelector(selectFilters)
    return (
        <Row className="d-flex">
            {brands && brands.map(brand =>
                <Card style={{width: '100px'}} key={brand.id}>
                    {brand.name}
                </Card>
            )}
        </Row>
    );
};

export default BrandBar;