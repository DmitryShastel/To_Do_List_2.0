import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export const App = () => {

    let task1 = [
        {id: 1, title: 'HTML', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ]

    return (
        <div className="App">
            <Todolist  title='What to learn' task={task1}/>
        </div>
    );
}


