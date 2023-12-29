import React, {useReducer} from 'react';
import {v1} from "uuid";
import {AddItemForm} from "../AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TaskType, Todolist} from "../Tdolist";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";


export type FilterType = 'all' | 'active' | 'completed'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksType = {
    [key: string]: TaskType[]
}


export const AppWithReducer = () => {

    let todolistId1 = v1()
    let todolistId2 = v1()


    let [todolists, dispatchToDolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Oil', isDone: false},
            {id: v1(), title: 'Sugar', isDone: false},
        ]
    })


    let changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId));
    };
    let removeTask = (todolistId: string, taskId: string) => {
        const action = removeTaskAC(todolistId, taskId)
        dispatchToTasks(action)
    }
    let addTask = (todolistId: string, title: string) => {
        const action = addTaskAC(todolistId, title)
        dispatchToTasks(action)
    }
    let changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC(todolistId, taskId, isDone)
        dispatchToTasks(action)
    }
    let removeTodolist = (todolistsId: string) => {
        const action = removeTodolistAC(todolistsId)
        dispatchToDolist(action)
        dispatchToTasks(action)
    }
    let addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToDolist(action)
        dispatchToTasks(action)
    }
    let changeTodolistTitle = (todolistsId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todolistsId, newTitle)
        dispatchToDolist(action)
    }
    let changeFilter = (todolistId: string, value: FilterType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToDolist(action)
    }


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
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                            }
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