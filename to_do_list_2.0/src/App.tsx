import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed'

export const App = () => {
    let [filter, setFilter] = useState<FilterType>('all')

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
    ]);

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    const changeFilter = (value: FilterType)=> {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}


