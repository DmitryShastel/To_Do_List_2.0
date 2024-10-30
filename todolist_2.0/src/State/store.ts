import {AnyAction} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./app-reduser";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        auth: authReducer
    }
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootStateType = ReturnType<typeof store.getState>
//export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;