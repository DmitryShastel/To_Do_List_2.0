import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../features/TodolistList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../common/api/todolists-api";



export default {
    title: 'Task',
    component: Task
}

const changeTaskTitleCallback = action('Title is changed')
const removeTaskCallback = action('Task is deleted')
const changeStatusCallback = action('Task status is changed')

export const TaskBaseExampleForIsDone = () => {
    return <Task
        task={{id: '1', title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1',
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId1'}
        changeStatus={changeStatusCallback}
    />
}

export const TaskBaseExampleForNoDone = () => {
    return <Task
        task={{id: '2', title: 'HTML', status: TaskStatuses.New, todoListId: 'todolistId1',
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId1'}
        changeStatus={changeStatusCallback}
    />
}