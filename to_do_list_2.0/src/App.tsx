import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {

    let task1 = [
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    let task2 = [
        {id: 1, title: 'Hello world', isDone: false},
        {id: 2, title: 'Buy world', isDone: false},
        {id: 3, title: 'Hi', isDone: true}
    ]

    return (
        <div className="App">
            <Todolist  title='What to learn' task={task1}/>
            <Todolist  title='Songs' task={task2}/>
        </div>
    );
}


