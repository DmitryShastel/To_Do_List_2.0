import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "../State/Task";


export default {
    title: 'Task',
    component: Task
}

const changeTaskTitleCallback = action('Title is changed')
const removeTaskCallback = action('Task is deleted')
const changeStatusCallback = action('Task status is changed')

export const TaskBaseExampleForIsDone = () => {
    return <Task
        task={{id: '1', title: 'HTML', isDone: true}}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId1'}
        changeStatus={changeStatusCallback}
    />
}

export const TaskBaseExampleForNoDone = () => {
    return <Task
        task={{id: '2', title: 'HTML', isDone: false}}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={'todolistId1'}
        changeStatus={changeStatusCallback}
    />
}