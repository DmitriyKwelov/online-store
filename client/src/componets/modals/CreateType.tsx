import React, {FC, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useAppDispatch} from "../../redux/store";
import {createType} from "../../redux/slices/filterSlice";

interface Props {
    show: boolean;
    onHide: ()=>void
}

const CreateType:FC<Props> = ({show, onHide}) => {

    const [value, setValue] = useState('')

    const dispatch = useAppDispatch();

    const addType = () => {
        dispatch(createType(value))
        setValue('')
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;