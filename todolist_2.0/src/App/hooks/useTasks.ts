import {useState} from "react";
import {todolistId1, todolistId2} from "../id-utils";
import {v1} from "uuid";
import {TasksType} from "../App";

export const useTasks = () => {
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

    let completelyRemoveTasksForTodolist = (todolistsId: string) => {
        delete tasks[todolistsId]
        setTasks({...tasks})
    }
    let addStateForNewTodolist = (newTodolistId: string) => {
        setTasks({...tasks, [newTodolistId]: []})
    }


    return {tasks, removeTask, changeTaskTitle, addTask, changeStatus,
        completelyRemoveTasksForTodolist, addStateForNewTodolist}
}