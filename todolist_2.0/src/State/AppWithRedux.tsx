import React, {useCallback} from 'react';
import {AddItemForm} from "../AddItemForm";
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tasks-reducer";
import {TaskType, Todolist} from "../Tdolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";


export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    [key: string]: TaskType[]
}


export const AppWithRedux = () => {
    console.log('AppWithRedux')

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    let changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    }, []) ;
    let removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, []) ;
    let addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, []);
    let changeStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone))
    }, []);
    let removeTodolist = useCallback((todolistsId: string) => {
            dispatch(removeTodolistAC(todolistsId))
    }, []) ;
    let addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, []);
    let changeTodolistTitle = useCallback((todolistsId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistsId, newTitle))
    }, []);
    let changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, []);


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

                            // if (tl.filter === 'completed') {
                            //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            // }
                            // if (tl.filter === 'active') {
                            //     tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            // }

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
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
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