import React, {useCallback, useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC
} from "../../State/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../State/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Tdolist";
import {Navigate} from "react-router-dom";
import {selectTodolists} from "./use.todo.selector";
import {selectIsLoggedIn} from "../Login/use.login.selector";
import {selectTasks} from "./Todolist/Task/use.task.selector";
import {useAppSelector} from "../../State/store";


type TodolistPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistPropsType> = ({demo = false, ...props}) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    const todolists = useAppSelector(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const tasks = useAppSelector(selectTasks)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

//todolistFuns
    const addTodolist = useCallback((titleTodolist: string) => {
        dispatch(addTodolistTC(titleTodolist))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const changeToDoListTitle = useCallback((todolistId: string, titleTodolist: string) => {
        dispatch(changeTodolistTitleTC(todolistId, titleTodolist))
    }, [])
    const changeToDoListFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: filter}))
    }, [])

//taskFuns
    const addTask = useCallback((todolistId: string, taskTitle: string) => {
        dispatch(addTaskTC(todolistId, taskTitle))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, taskTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {title: taskTitle}, todolistId))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeToDoListFilter}
                                        addTask={addTask}
                                        changeStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeToDoListTitle}
                                        changeTaskTitle={changeTaskTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    )
}