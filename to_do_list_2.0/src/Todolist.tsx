import React from "react";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: number) => void
}

export const Todolist = (props: PropsType) => {
    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(t =>
                    <li key={t.id}>
                        <input type='checkbox' checked={t.isDone}/><span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>x</button>
                    </li>
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>


    )
}