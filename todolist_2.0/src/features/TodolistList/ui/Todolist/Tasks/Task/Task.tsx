import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../../../components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/tasksApi.types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {removeTask, updateTask} from "../../../../model/tasksSlice";
import  s from './task.module.css'


export type Props = {
    task: TaskType
    todolistId: string
}

export const Task = ({task, todolistId}: Props) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const {id: taskId, status, title} = task
    const isTaskCompleted = status === TaskStatuses.Completed


    const removeTaskHandler = () => {
        dispatch(removeTask({todolistId, taskId}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask({taskId, domainModel: {status}, todolistId}))
    }

    const changeTaskTitleHandler = (newValue: string) => {
        dispatch(updateTask({taskId, domainModel: {title: newValue}, todolistId}))
    }

    return (
        <React.Fragment>
            <div key={task.id} className={isTaskCompleted ? s.isDone : ''}>
                <Checkbox onChange={changeTaskStatusHandler} checked={isTaskCompleted}
                          color="secondary"/>
                <EditableSpan title={title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={removeTaskHandler}>
                    <Delete color="primary"/>
                </IconButton>
            </div>
        </React.Fragment>
    );
};