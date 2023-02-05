import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import {useSelector} from "react-redux";
import {fetchBrand, fetchTypes, selectFilters} from "../../redux/slices/filterSlice";
import {useAppDispatch} from "../../redux/store";
import {IBrand, IType} from "../../models/IFilter";
import {createProducts} from "../../redux/slices/productSlice";

interface Info {
    title: string
    description: string
    number: number
}

interface Props {
    show: boolean;
    onHide: () => void
}

const CreateProduct: FC<Props> = ({show, onHide}) => {

    const {brands, types} = useSelector(selectFilters)
    const dispatch = useAppDispatch();

    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [file, setFile] = useState<any>(null)
    const [brand, setBrand] = useState<IBrand | null>(null)
    const [type, setType] = useState<IType | null>(null)
    const [info, setInfo] = useState<Info[]>([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number: number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key: string, value: string, number: number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files![0])
    }

    useEffect(() => {
        dispatch(fetchTypes())
        dispatch(fetchBrand())
    }, [])

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', `${brand?.id}`)
        formData.append('typeId', `${type?.id}`)
        formData.append('info', JSON.stringify(info))
        dispatch(createProducts(formData))
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
                    <Dropdown className="mt-2">
                        <DropdownToggle>{type && type.name || 'Выберите'}</DropdownToggle>
                        <Dropdown.Menu>
                            {types && types.map(type =>
                                <Dropdown.Item
                                    onClick={() => setType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <DropdownToggle>{brand && brand.name || 'Выберите бренд'}</DropdownToggle>
                        <Dropdown.Menu>
                            {brands && brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => setBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите название продукта"}
                    />
                    <Form.Control
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder={"Введите стоимость устройства"}
                    />
                    <Form.Control
                        className="mt-3"
                        onChange={selectFile}
                        type="file"
                    />
                    <Button
                        className="mt-3"
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новое свойство
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание свойства"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateProduct;