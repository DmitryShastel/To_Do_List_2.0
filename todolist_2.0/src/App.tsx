import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {TaskType, Todolist} from "./Tdolist";
import {Menu} from "@mui/icons-material";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";

type FilterType = 'all' | 'active' | 'completed'

type TodolistsType = {
  id: string
  title: string
  filter: FilterType
}

type TasksType = {
  [key: string]: TaskType[]
}



export const App = () => {

  let todolistId1 = v1()
  let todolistId2 = v1()


  let [todolists, setTodolists] = useState<TodolistsType[]>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])


  let [tasks, setTasks] = useState<TasksType>({
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


  let removeTask = (todolistId: string, taskId: string) => {
    let newTasks = tasks[todolistId]
    let filteredTasks = newTasks.filter(t => t.id != taskId)
    tasks[todolistId] = filteredTasks
    setTasks({...tasks})

    //own method
    //setTasks({...tasks, [todolistId]: tasks[todolistId].filter(f => f.id !== taskId)})
  }
  let changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    debugger
    //достанем нужный массив по todolistId:
    let todolistTasks = tasks[todolistId];
    //найдем нужную таску:
    let task = todolistTasks.find(t => t.id === id);
    //изменим таску, если нашлась
    if (task) {
      task.title = newTitle;
      // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
      setTasks({...tasks})
    }
  }
  let addTask = (todolistId: string, title: string) => {
    let task = {id: v1(), title: title, isDone: false}
    let tasks2 = tasks[todolistId]
    let newTasks = [task, ...tasks2]
    tasks[todolistId] = newTasks
    setTasks({...tasks})

    //own method
    // let newTask = {id: v1(), title: title, isDone: false}
    // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
  }
  let changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {

    let tasks2 = tasks[todolistId]
    let task = tasks2.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }

    //own method
    //setTasks({...tasks,[todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone}: t)})
  }
  let removeTodolist = (todolistsId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistsId))
    delete tasks[todolistsId]
  }
  let addTodolist = (title: string) => {
    let newTodolistId = v1();
    let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [newTodolistId]: []})
  }
  let changeTodolistTitle = (id: string, newTitle: string) => {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }
  let changeFilter = (todolistId: string, value: FilterType) => {

    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
    //own method
    //setTodolists(todolists.map(f => f.id === todolistId ? {...f, filter: value} : f))
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