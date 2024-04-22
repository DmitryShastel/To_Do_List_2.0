import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/todolists-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistsId: string, id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.todolistId, props.task.id),
        [props.removeTask, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeStatus(props.task.id,   newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId );
        },
        [props.changeStatus, props.todolistId, props.task.id]);
        
    const onChangeTitleHandler = useCallback((newValue: string) => {
            props.changeTaskTitle(props.task.id, newValue, props.todolistId);
        },
        [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <React.Fragment>
            <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed} color="secondary"/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete color="primary"/>
                </IconButton>
            </div>
        </React.Fragment>
    );
});