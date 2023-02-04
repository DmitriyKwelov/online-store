import React, {FC} from 'react';
import {Col} from "react-bootstrap";

const DeviceItem = ({name, img}: {name: string, img: string}) => {
    return (
        <Col md={3}>
            <img style={{width: '100%'}} src={`http://localhost:5000/${img}`} alt=""/>
            <h4>{name}</h4>
        </Col>
    );
};

export default DeviceItem;