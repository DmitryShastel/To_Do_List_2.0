import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {

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


    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}


