import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../../State/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {appReducer} from "../../State/appSlice";
import {thunk as thunkMiddleware} from 'redux-thunk'
import {authSlice} from "../../features/auth/model/authSlice";
import {TaskPriorities, TaskStatuses} from "../../features/TodolistList/api/tasksApi.types";
import {tasksReducer} from "../../features/TodolistList/model/tasksSlice";
import {todolistsReducer} from "../../features/TodolistList/model/todolistsSlice";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authSlice
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