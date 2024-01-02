import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Tdolist";


type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistsId: string, id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (todolistsId: string, taskId: string, isDone: boolean) => void

}


export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.todolistId, props.task.id, newIsDoneValue);
    };
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }

    return (
        <React.Fragment>
            return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={onChangeHandler} checked={props.task.isDone} color="secondary"/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete color="primary"/>
            </IconButton>
        </div>
        </React.Fragment>
    );
});