import {AnyAction} from "redux";
import {tasksReducer} from "../features/TodolistList/model/tasksSlice";
import {ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./appSlice";
import {authSlice} from "../features/auth/model/authSlice";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "../features/TodolistList/model/todolistsSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authSlice
    }

})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;