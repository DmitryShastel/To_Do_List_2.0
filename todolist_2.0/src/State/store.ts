import {AnyAction} from "redux";
import {tasksSlice} from "../features/TodolistList/model/tasksSlice";
import {ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./appSlice";
import {authSlice} from "../features/auth/model/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsSlice} from "../features/TodolistList/model/todolistsSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
        todolists: todolistsSlice,
        app: appReducer,
        auth: authSlice
    }
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootStateType = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;