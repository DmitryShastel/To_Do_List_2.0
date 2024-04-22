import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Tdolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistTC,
    TodolistDamainType
} from "../State/todolists-reducer";
import {AppRootStateType} from "../State/store";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../State/tasks-reducer";
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from "redux";


export type TasksType = {
    [key: string]: TaskType[]
}


export const AppWithRedux = () => {
    // const {
    //     todolists,
    //     tasks,
    //     changeTaskTitle,
    //     removeTask,
    //     addTask,
    //     changeStatus,
    //     removeTodolist,
    //     addTodolist,
    //     changeTodolistTitle,
    //     changeFilter
    // } = useAppWithRedux()

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDamainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

    useEffect(() => {
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
        dispatch(changeTodolistFilterAC(todolistId, filter))
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


    const changeTaskTitle = useCallback(( taskId: string, taskTitle: string, todolistId: string) => {
        dispatch(updateTaskTC( taskId,{title: taskTitle}, todolistId))
    }, [])


    return (
        <div className="App">
            <AppBar position='static'>

                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
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
                                            id={tl.id}
                                            key={tl.id}
                                            todolistId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeToDoListFilter}
                                            addTask={addTask}
                                            changeStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeToDoListTitle}
                                            changeTaskTitle={changeTaskTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}