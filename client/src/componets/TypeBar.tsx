import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectFilters} from "../redux/slices/filterSlice";

const TypeBar:FC = () => {
    const {types} = useSelector(selectFilters)
    return (
        <ListGroup>
            {
                types && types.map(type =>
                    <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>
                )
            }
        </ListGroup>
    );
};

export default TypeBar;