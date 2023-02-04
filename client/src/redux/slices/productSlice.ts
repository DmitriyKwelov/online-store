import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$authHost, $host} from "../../http";
import {RootState} from "../store";
import {IProduct} from "../../models/IProduct";

export interface IParams {
    email: string;
    password: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface AuthState {
    products: null | IProduct[];
    status: Status;
}

const initialState: AuthState = {
    products: null,
    status: Status.LOADING
}
export const createProducts = createAsyncThunk('products/createProduct', async (params) => {
    try {
        const {data} = await $host.post('api/device', params);
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const fetchProducts = createAsyncThunk('products/product', async () => {
    try {
        const {data} = await $host.get('api/device');
        console.log(data)
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = Status.LOADING;
                state.products = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.products = action.payload.rows;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = Status.ERROR;
                state.products = null;
            })
    }
})

export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer