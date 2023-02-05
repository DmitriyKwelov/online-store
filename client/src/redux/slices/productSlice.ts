import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$authHost, $host} from "../../http";
import {RootState} from "../store";
import {IProduct} from "../../models/IProduct";
import {filterSlice} from "./filterSlice";

export interface IParams {
    email: string;
    password: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface ProductParams {
    typeId: number | null;
    brandId: number | null;
    page: number;
    limit: number
}

interface AuthState {
    products: null | IProduct[];
    page: number,
    totalCount: number,
    limit: number
    status: Status;
}

const initialState: AuthState = {
    products: null,
    page: 1,
    totalCount: 0,
    limit: 3,
    status: Status.LOADING
}
export const createProducts = createAsyncThunk('products/createProduct', async (params: any) => {
    try {
        const {data} = await $host.post('api/device', params);
        return data;
    } catch (e) {
        console.log(e);
    }
})
export const fetchProducts = createAsyncThunk('products/product', async (params: ProductParams ) => {
    try {
        const {data} = await $host.get('api/device', {params});
        console.log(data)
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setTotalCount: (state, action: PayloadAction<number>) => {
            state.totalCount = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = Status.LOADING;
                state.products = null;
                state.totalCount = 0;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.products = action.payload.rows;
                state.totalCount = action.payload.count;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = Status.ERROR;
                state.products = null;
                state.totalCount = 0;
            })
    }
})

export const {setTotalCount, setPage} = productsSlice.actions

export const selectProducts = (state: RootState) => state.products.products
export const selectProductsState = (state: RootState) => state.products

export default productsSlice.reducer