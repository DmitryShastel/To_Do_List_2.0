import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}
    ])

    let [filter, setFilter] = useState('all')

    let taskForTodolist = tasks
    if(filter === 'active'){
        taskForTodolist = tasks.filter(t => t.isDone != false)
    }
    if(filter === 'completed'){
        taskForTodolist = tasks.filter(t => t.isDone != true)
    }

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                task={taskForTodolist}
                removeTask={removeTask}
            />
        </div>
    );
}


