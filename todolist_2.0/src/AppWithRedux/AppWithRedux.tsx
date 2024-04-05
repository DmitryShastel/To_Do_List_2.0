import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {TaskType, Todolist} from "../Tdolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {useAppWithRedux} from "./hooks/useAppWithRedux";


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

    const {
        todolists,
        tasks,
        changeTaskTitle,
        removeTask,
        addTask,
        changeStatus,
        removeTodolist,
        addTodolist,
        changeTodolistTitle,
        changeFilter
    } = useAppWithRedux()


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