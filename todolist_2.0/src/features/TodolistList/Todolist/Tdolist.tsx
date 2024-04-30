import React, {useCallback, useEffect} from "react";
import {EditableSpan} from "../../../components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {AddItemForm} from "../../../components/AddItemForm";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {fetchTaskTC} from "../../../State/tasks-reducer";
import {FilterType, TodolistDamainType} from "../../../State/todolists-reducer";


type PropsType = {
    todolist: TodolistDamainType
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistsId: string, title: string) => void
    removeTodolist: (todolistsId: string) => void
    changeTodolistTitle: (id: string, newTitle: string,) => void
    removeTask: (todolistsId: string, id: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {


    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTaskTC(props.todolist.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title);
    }, [props.addTask, props.todolist.id])
    const removeTodolistHandler = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'),
        [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'),
        [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'),
        [props.changeFilter, props.todolist.id]);


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3><EditableSpan onChange={changeTodolistTitle} title={props.todolist.title}/>
                <IconButton disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete onClick={removeTodolistHandler}/>
                </IconButton>
            </h3>
            <div>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            </div>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task
                            task={t}
                            changeStatus={props.changeStatus}
                            todolistId={props.todolist.id}
                            removeTask={props.removeTask}
                            changeTaskTitle={props.changeTaskTitle}
                            key={props.todolist.id}
                        />
                    )
                }
            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})