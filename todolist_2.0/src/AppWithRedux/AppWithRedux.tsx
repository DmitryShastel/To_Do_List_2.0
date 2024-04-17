import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Tdolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch, useSelector} from "react-redux";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    fetchTodolistsTC,
    FilterType,
    removeTodolistAC,
    TodolistDamainType
} from "../State/todolists-reducer";
import {AppRootStateType} from "../State/store";
import {addTaskAC, changeTaskTitleAC, removeTaskAC} from "../State/tasks-reducer";
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
        dispatch(addTodolistAC(titleTodolist))
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [])
    const changeToDoListTitle = useCallback((todolistId: string, titleTodolist: string) => {
        dispatch(changeTodolistTitleAC(todolistId, titleTodolist))
    }, [])
    const changeToDoListFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [])

//taskFuns
    const addTask = useCallback((todolistId: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistId, taskTitle))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        //@ts-ignore
        dispatch(changeTaskTitleAC(todolistId, taskId, status))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, taskTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, taskTitle))
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