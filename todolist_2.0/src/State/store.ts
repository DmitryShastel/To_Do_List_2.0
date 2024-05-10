import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {thunk as thunkMiddleware} from 'redux-thunk'
import {appReducer} from "./app-reduser";
import {authReducer} from "./auth-reducer";




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
//@ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store