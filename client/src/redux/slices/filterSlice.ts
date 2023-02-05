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
    selectedType: null | IType;
    brands: null | IBrand[];
    selectedBrand: null | IBrand;
    status: Status
}

const initialState: AuthState = {
    types: null,
    selectedType: null,
    brands: null,
    selectedBrand: null,
    status: Status.LOADING
}

export const createType = createAsyncThunk('filter/createType', async (name: string) => {
    try {
        const {data} = await $authHost.post('api/type', {name: name});
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
export const createBrand = createAsyncThunk('filter/createBrand', async (name: string) => {
    try {
        const {data} = await $authHost.post('api/brand', {name: name});
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
    reducers: {
        setSelectedType: (state, action: PayloadAction<IType>) => {
            state.selectedType = action.payload
        },
        setSelectedBrand: (state, action: PayloadAction<IBrand>) => {
            state.selectedBrand = action.payload
        }
    },
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

export const {setSelectedType, setSelectedBrand} = filterSlice.actions

export default filterSlice.reducer