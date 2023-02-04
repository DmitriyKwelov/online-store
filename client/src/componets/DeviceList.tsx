import React, {FC} from 'react';
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectProducts} from "../redux/slices/productSlice";
import DeviceItem from "./DeviceItem";

const DeviceList:FC = () => {
    const products = useSelector(selectProducts)
    return (
        <Row className="mt-3">
            {products && products.map(product =>
                <DeviceItem key={product.id} {...product}/>
            )}
        </Row>
    );
};

export default DeviceList;