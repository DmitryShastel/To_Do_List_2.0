export  {}

// import {useEffect, useState} from "react";
// import {todolistsAPI} from "../common/api/todolists-api";
//
// export default {
//     title: 'API'
// }
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//
//     useEffect(() => {
//         todolistsAPI.getTodolists()
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//
//     return <div>{JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistId, setTodolistId] = useState<any>('')
//
//     const deleteTodolist = () => {
//         todolistsAPI.deleteTodolist(todolistId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
//                 setTodolistId(e.currentTarget.value)
//             }}/>
//             <button onClick={deleteTodolist}>Delete todolist</button>
//         </div>
//     </div>
// }
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistTitle, setTodolistTitle] = useState<any>('')
//
//     const createTodolist = () => {
//         todolistsAPI.createTodolist(todolistTitle)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input placeholder={'Todolist Title'} value={todolistTitle} onChange={(e) => {
//                 setTodolistTitle(e.currentTarget.value)
//             }}/>
//             <button onClick={createTodolist}>Create todolist</button>
//         </div>
//     </div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistTitle, setTodolistTitle] = useState<any>('')
//     const [todolistId, setTodolistId] = useState<any>('')
//
//     const updateTodolist = () => {
//         todolistsAPI.updateTodolist(todolistId, todolistTitle)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
//                    value={todolistId}/>
//             <input type="text" placeholder={'title'} onChange={(e) => setTodolistTitle(e.currentTarget.value)}
//                    value={todolistTitle}/>
//             <button onClick={updateTodolist}>Update todolist</button>
//         </div>
//     </div>
// }
//
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [taskTitle, setTaskTitle] = useState<any>('')
//     const [todolistId, setTodolistId] = useState<any>('')
//
//     const createTask = () => {
//         todolistsAPI.createTask({todolistId, title})
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
//                 setTodolistId(e.currentTarget.value)
//             }}/>
//             <input placeholder={'Task Title'} value={taskTitle} onChange={(e) => {
//                 setTaskTitle(e.currentTarget.value)
//             }}/>
//             <button onClick={createTask}>Create task</button>
//         </div>
//     </div>
// }
// export const GetTasks = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistId, setTodolistId] = useState<any>('')
//
//     const getTasks = () => {
//         todolistsAPI.getTasks(todolistId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
//                 setTodolistId(e.currentTarget.value)
//             }}/>
//             <button onClick={getTasks}>Get tasks</button>
//         </div>
//     </div>
// }
// export const DeleteTask = () => {
//     const [state, setState] = useState<any>(null)
//     const [taskId, setTaskId] = useState<string>('')
//     const [todolistId, setTodolistId] = useState<string>('')
//
//     const deleteTask = () => {
//         todolistsAPI.deleteTask(todolistId, taskId)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }
//
//     return <div>{JSON.stringify(state)}
//         <div>
//             <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
//                 setTodolistId(e.currentTarget.value)
//             }}/>
//             <input placeholder={'taskId'} value={taskId} onChange={(e) => {
//                 setTaskId(e.currentTarget.value)
//             }}/>
//             <button onClick={deleteTask}>Delete task</button>
//         </div>
//     </div>
// }
// export const UpdateTaskTitle = () => {
//     const [state, setState] = useState<any>(null)
//     const [todolistId, setTodolistId] = useState<any>('')
//     const [taskId, setTaskId] = useState<any>('')
//     const [title, setTitle] = useState<any>('')
//     const [description, setDescription] = useState<any>('')
//     const [isDone, setIsDone] = useState<any>(false)
//     const [status, setStatus] = useState<any>(0)
//     const [priority, setPriority] = useState<any>(1)
//     const [startDate, setStartDate] = useState<any>('')
//     const [deadline, setDeadline] = useState<any>('')
//
//     const task = {
//         title: title,
//         description: description,
//         startDate: startDate,
//         deadline: deadline,
//         priority: priority,
//         status: status
//     }
//
//     const updateTask = () => {
//         todolistsAPI.updateTask(taskId, task, todolistId).then(res => {
//             setState(res.data)
//         })
//     }
//
//     return <div>
//         <div>{JSON.stringify(state)}</div>
//         <div>
//             <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
//                    value={todolistId}/>
//             <input type="text" placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}
//                    value={taskId}/>
//             <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}
//                    value={title}/>
//             <input type="text" placeholder={'status'} onChange={(e) => setStatus(e.currentTarget.value)}
//                    value={status}/>
//             <button onClick={updateTask}>Update task</button>
//         </div>
//     </div>
// }