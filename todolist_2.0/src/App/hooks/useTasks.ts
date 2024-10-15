export {}

// import {useState} from "react";
// import {todolistId1, todolistId2} from "../id-utils";
// import {v1} from "uuid";
// import {TasksType} from "../App";
// import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
//
//
// export const useTasks = () => {
//     let [tasks, setTasks] = useState<TasksType>({
//         [todolistId1]: [
//             {
//                 id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistId1,
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//         ],
//         [todolistId2]: [
//             {
//                 id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistId1,
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//         ]
//     })
//
//     let removeTask = (todolistId: string, taskId: string) => {
//         let newTasks = tasks[todolistId]
//         let filteredTasks = newTasks.filter(t => t.id != taskId)
//         tasks[todolistId] = filteredTasks
//         setTasks({...tasks})
//     }
//     let changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
//         debugger
//         //достанем нужный массив по todolistId:
//         let todolistTasks = tasks[todolistId];
//         //найдем нужную таску:
//         let task = todolistTasks.find(t => t.id === id);
//         //изменим таску, если нашлась
//         if (task) {
//             task.title = newTitle;
//             // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
//             setTasks({...tasks})
//         }
//     }
//     let addTask = (todolistId: string, title: string) => {
//         let task = {
//             id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistId1,
//             description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//         }
//         let tasks2 = tasks[todolistId]
//         let newTasks = [task, ...tasks2]
//         tasks[todolistId] = newTasks
//         setTasks({...tasks})
//     }
//     let changeStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
//         let tasks2 = tasks[todolistId]
//         let task = tasks2.find(t => t.id === taskId)
//         if (task) {
//             task.status = TaskStatuses.Completed
//             setTasks({...tasks})
//         }
//     }
//
//     let completelyRemoveTasksForTodolist = (todolistsId: string) => {
//         delete tasks[todolistsId]
//         setTasks({...tasks})
//     }
//     let addStateForNewTodolist = (newTodolistId: string) => {
//         setTasks({...tasks, [newTodolistId]: []})
//     }
//
//
//     return {
//         tasks, removeTask, changeTaskTitle, addTask, changeStatus,
//         completelyRemoveTasksForTodolist, addStateForNewTodolist
//     }
// }