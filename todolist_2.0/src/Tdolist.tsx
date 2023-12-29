import React, {ChangeEvent, useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {FilterType} from "./State/AppWithReducer";
import {Button, Checkbox, IconButton, TextField} from "@mui/material";
import {ControlPoint, Delete} from "@mui/icons-material";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistsId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistsId: string, title: string) => void
    changeStatus: (todolistsId: string, taskId: string, isDone: boolean) => void
    filter: string
    removeTodolist: (todolistsId: string) => void
    changeTodolistTitle: (id: string, newTitle: string,) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent | React.KeyboardEvent) => {
        setError(null)
        if (e.keyCode === 13) {
            addTask()
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all')
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed')


    return (
        <div>

            <h3> <EditableSpan onChange={changeTodolistTitle} title={props.title}/>
                <IconButton>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <div>
                <TextField
                    variant={'outlined'}
                    label="Type Value"
                    value={title}
                    onKeyDown={onKeyPressHandler}
                    onChange={onChangeHandler}
                    error={!!error}
                    helperText={error}
                />
                <IconButton
                    color={"default"}
                    onClick={addTask}>
                    <ControlPoint/>
                </IconButton>

            </div>

            <div>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(props.todolistId, t.id, newIsDoneValue)
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} color="secondary"/>
                        <EditableSpan title={t.title}  onChange={onChangeTitleHandler}/>
                        {/*<span>{t.title}</span>*/}
                        <IconButton onClick={onClickHandler}>
                            <Delete color="primary"/>
                        </IconButton>
                    </div>
                })
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>


    )
}