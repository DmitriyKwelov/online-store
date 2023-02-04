import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import auth from './slices/authSlice'
import products from './slices/productSlice'
import filter from './slices/filterSlice'

export const store = configureStore({
    reducer: {
        auth,
        products,
        filter
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();