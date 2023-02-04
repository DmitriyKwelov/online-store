import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$authHost, $host} from "../../http";
import {IBrand, IType} from "../../models/IFilter";
import {RootState} from "../store";

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface AuthState {
    types: null | IType[];
    brands: null | IBrand[];
    status: Status
}

const initialState: AuthState = {
    types: null,
    brands: null,
    status: Status.LOADING
}

export const createType = createAsyncThunk('filter/createType', async (params) => {
    try {
        const {data} = await $authHost.post('api/type', params);
        return data;
    } catch (e) {
        console.log(e);
    }
})
export const fetchTypes = createAsyncThunk('filter/type', async () => {
    try {
        const {data} = await $host.get('api/type');
        return data;
    } catch (e) {
        console.log(e);
    }
})
export const createBrand = createAsyncThunk('filter/createBrand', async (params) => {
    try {
        const {data} = await $authHost.post('api/brand', params);
        return data;
    } catch (e) {
        console.log(e);
    }
})
export const fetchBrand = createAsyncThunk('filter/brand', async () => {
    try {
        const {data} = await $host.get('api/brand');
        return data;
    } catch (e) {
        console.log(e);
    }
})


export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTypes.pending, (state) => {
                state.status = Status.LOADING;
                state.types = null;
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.types = action.payload;
            })
            .addCase(fetchTypes.rejected, (state) => {
                state.status = Status.ERROR;
                state.types = null;
            })
            .addCase(fetchBrand.pending, (state) => {
                state.status = Status.LOADING;
                state.brands = null;
            })
            .addCase(fetchBrand.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.brands = action.payload;
            })
            .addCase(fetchBrand.rejected, (state) => {
                state.status = Status.ERROR;
                state.brands = null;
            })
    }
})

export const selectFilters = (state: RootState) => state.filter

// export const {setAuthState} = filterSlice.actions

export default filterSlice.reducer