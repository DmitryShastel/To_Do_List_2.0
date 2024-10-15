import React, {useCallback, useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {
    addTodolist,
    changeTodolistFilterAC, changeTodolistTitle,
    fetchTodolists,
    FilterType, removeTodolist,
} from "../../State/todolists-reducer";
import {addTask, removeTask, updateTask} from "../../State/tasks-reducer";
import {TaskStatuses} from "../../common/api/todolists-api";
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
        dispatch(fetchTodolists())
    }, [])

//todolistFuns
    const addTodolistCallback = useCallback((titleTodolist: string) => {
        dispatch(addTodolist(titleTodolist))
    }, [])
    const removeTodolistCallback = useCallback((todolistId: string) => {
        dispatch(removeTodolist({todolistId}))
    }, [])
    const changeToDoListTitleCallback = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitle({todolistId, newTitle}))
    }, [])
    const changeToDoListFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: filter}))
    }, [])

//taskFuns
    const addTaskCallback = useCallback((todolistId: string, title: string) => {
        dispatch(addTask({ todolistId, title }))
    }, [dispatch])
    const removeTaskCallback = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTask({todolistId, taskId}))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTask({taskId, domainModel: {status}, todolistId}))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(updateTask({taskId, domainModel: {title}, todolistId}))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItem={addTodolistCallback}/>
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
                                        removeTaskCallback={removeTaskCallback}
                                        changeFilter={changeToDoListFilter}
                                        addTaskCallback={addTaskCallback}
                                        changeStatus={changeTaskStatus}
                                        removeTodolist={removeTodolistCallback}
                                        changeTodolistTitle={changeToDoListTitleCallback}
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