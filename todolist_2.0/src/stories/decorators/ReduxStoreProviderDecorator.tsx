import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../State/tasks-reducer";
import {todolistsReducer} from "../../State/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../common/api/todolists-api";
import {appReducer} from "../../State/app-reduser";
import {thunk as thunkMiddleware} from 'redux-thunk'
import {authReducer} from "../../State/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: 'Oil', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Oil', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: 'Oil', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Oil', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

//@ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}