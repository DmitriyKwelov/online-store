import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../models/IUser";
import {$authHost, $host} from "../../http";
import {RootState} from "../store";

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
        localStorage.setItem('token', response.data.token)
        return response.data;
    } catch (e) {
        console.log(e);
    }
})
export const registration = createAsyncThunk ('auth/registration', async (params: IParams) => {
    try{
        const {email, password} = params;
        const response = await $host.post('api/user/registration', {email, password});
        localStorage.setItem('token', response.data.token)
        return response.data;
    } catch (e) {
        console.log(e);
    }
})
export const check = createAsyncThunk('auth/check', async () => {
    try{
        const {data} = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token)
        return data;
    } catch (e) {
        console.log(e);
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<AuthState>) => {
            state.isAuth = action.payload.isAuth
            state.user = action.payload.user
        }
    },
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
            .addCase(registration.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(registration.rejected, (state) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(check.pending, (state) => {
                state.status = Status.LOADING;
                state.isAuth = false;
                state.user = null;
            })
            .addCase(check.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.isAuth = true;
                state.user = action.payload.user;
            })
            .addCase(check.rejected, (state) => {
                state.status = Status.ERROR;
                state.isAuth = false;
                state.user = null;
            })
    }
})

export const selectIsAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user

export const {setAuthState} = authSlice.actions

export default authSlice.reducer