import {createAction} from "@reduxjs/toolkit";
import {TasksType} from "../api/todolists-api";
import {TodolistDamainType} from "../../State/todolists-reducer";


export type ClearTasksAndTodolistsType = {
    tasks: TasksType
    todolists: TodolistDamainType[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-tasks-todolists')