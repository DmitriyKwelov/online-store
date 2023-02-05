import React, {FC} from 'react';
import {ListGroup} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectFilters, setSelectedType} from "../redux/slices/filterSlice";
import {useAppDispatch} from "../redux/store";

const TypeBar:FC = () => {
    const {types, selectedType} = useSelector(selectFilters)

    const dispatch = useAppDispatch();

    return (
        <ListGroup>
            {
                types && types.map(type =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        active={type.id === selectedType?.id}
                        key={type.id}
                        onClick={() => dispatch(setSelectedType(type))}
                    >
                        {type.name}
                    </ListGroup.Item>
                )
            }
        </ListGroup>
    );
};

export default TypeBar;