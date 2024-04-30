import React from 'react';
import '../App.css';
import {AddItemForm} from "../components/AddItemForm";
import {Todolist} from "../features/TodolistList/Todolist/Tdolist";
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";
import {TaskStatuses, TaskType} from "../api/todolists-api";


export type TasksType = {
    [key: string]: TaskType[]
}


export const App = () => {

    let {
        tasks, removeTask, changeTaskTitle, addTask, changeStatus,
        completelyRemoveTasksForTodolist, addStateForNewTodolist
    } = useTasks()

    let {todolists, removeTodolist, addTodolist, changeTodolistTitle, changeFilter} =
        useTodolists(completelyRemoveTasksForTodolist, addStateForNewTodolist)


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
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                            }
                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            todolist={tl}
                                            //id={tl.id}
                                            key={tl.id}
                                            //todolistId={tl.id}
                                           //title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            //filter={tl.filter}
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