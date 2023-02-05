import React from 'react';
import {Pagination} from "react-bootstrap";
import {useSelector} from "react-redux";
import {selectProductsState, setPage} from "../redux/slices/productSlice";
import {useAppDispatch} from "../redux/store";

const Pages = () => {
    const dispatch = useAppDispatch();
    const {totalCount, limit, page} = useSelector(selectProductsState)
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination>
            {pages.map(p =>
                <Pagination.Item
                    active={p === page}
                    onClick={() => dispatch(setPage(p))}
                >
                    {p}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;