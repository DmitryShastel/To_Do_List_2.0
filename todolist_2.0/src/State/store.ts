import {combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {thunk as thunkMiddleware} from 'redux-thunk'
import {appReducer} from "./app-reduser";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer";


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


export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store