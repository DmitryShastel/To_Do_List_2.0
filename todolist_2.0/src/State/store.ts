import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {thunk as thunkMiddleware, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./app-reduser";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
//@ts-ignore
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

//@ts-ignore
window.store = store