import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {$host} from "../../http";

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
    user: null | IUser;
    isAuth: boolean;
    status: Status;
}

const initialState: AuthState = {
    user: null,
    isAuth: false,
    status: Status.LOADING
}

export const login = createAsyncThunk('auth/login', async (params: IParams) => {
    try{
        const {email, password} = params;
        const response = await $host.post('api/user/login', {email, password});
        return response.data;
    } catch (e) {
        console.log(e);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = null;
            })
    }
})