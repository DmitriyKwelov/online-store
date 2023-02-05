import React, {FC, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useAppDispatch} from "../../redux/store";
import {createBrand} from "../../redux/slices/filterSlice";

interface Props {
    show: boolean;
    onHide: ()=>void
}

const CreateBrand:FC<Props> = ({show, onHide}) => {

    const [value, setValue] = useState('')

    const dispatch = useAppDispatch();

    const addBrand = () => {
        dispatch(createBrand(value))
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
                        placeholder={"Введите название типа"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;