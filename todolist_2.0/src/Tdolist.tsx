import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {FilterType} from "./State/AppWithReducer";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "./AddItemForm";
import {Task} from "./State/Task";


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
    filter: string
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistsId: string, title: string) => void
    removeTodolist: (todolistsId: string) => void
    changeTodolistTitle: (id: string, newTitle: string,) => void
    removeTask: (todolistsId: string, id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (todolistsId: string, taskId: string, isDone: boolean) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title);
    }, [props.addTask, props.todolistId])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolistId)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'all'),
        [props.changeFilter, props.todolistId]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'active'),
        [props.changeFilter, props.todolistId])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'completed'),
        [props.changeFilter, props.todolistId]);


    let tasksForTodolist = props.tasks

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3><EditableSpan onChange={changeTodolistTitle} title={props.title}/>
                <IconButton>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask}/>
            </div>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task
                            task={t}
                            changeStatus={props.changeStatus}
                            todolistId={props.todolistId}
                            removeTask={props.removeTask}
                            changeTaskTitle={props.changeTaskTitle}
                            key={props.id}
                        />
                    )
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
})