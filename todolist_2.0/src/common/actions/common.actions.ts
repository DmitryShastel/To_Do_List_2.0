import {createAction} from "@reduxjs/toolkit";
import {TodolistDamainType} from "../../features/TodolistList/model/todolistsSlice";
import {TasksType} from "../../features/TodolistList/api/tasksApi.types";


export type ClearTasksAndTodolistsType = {
    tasks: TasksType
    todolists: TodolistDamainType[]
}

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>('common/clear-tasks-todolists')