export {}



// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     FilterType,
//     removeTodolistAC,
//     setTodolistsAc,
//     TodolistDamainType,
//     todolistsSlice
// } from './todolists-reducer';
// import {v1} from 'uuid';
// import {addTaskAC, removeTaskAC, setTaskAC, tasksSlice, updateTaskAC} from "./tasks-reducer";
// import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../api/todolists-api";
//
//
// let todolistId1: string
// let todolistId2: string
// let startState: Record<string, TaskType[]>
//
//
// beforeEach(() => {
//     todolistId1 = v1();
//     todolistId2 = v1();
//     startState = {
//         'todolistId1': [
//             {
//                 id: '1', title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId1',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//             {
//                 id: '2', title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId1',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//         ],
//         'todolistId2': [
//             {
//                 id: '1', title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//             {
//                 id: '2', title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId2',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//         ]
//     }
// })
//
// //test for todolists
// test('correct todolist should be removed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     const startState: TodolistDamainType[] = [
//         {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all",  entityStatus: 'idle',addedDate: '', order: 0}
//     ]
//
//     const endState = todolistsSlice(startState, removeTodolistAC(todolistId1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });
// // test('correct todolist should be added', () => {
// //     let todolistId1 = v1();
// //     let todolistId2 = v1();
// //
// //     let newTodolistTitle = "New Todolist";
// //
// //     const startState: TodolistDamainType[] = [
// //         {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
// //         {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
// //     ]
// //
// //
// //     const endState = todolistsSlice(startState, addTodolistAC(newTodolistTitle))
// //
// //     expect(endState.length).toBe(3);
// //     expect(endState[0].title).toBe(newTodolistTitle);
// //     expect(endState[2].filter).toBe('all');
// // });
// test('correct todolist should be added', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: TodolistDamainType[] = [
//         { id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0 },
//         { id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0 }
//     ]
//
//     const newTodolist: TodolistType = {
//         id: v1(),
//         title: newTodolistTitle,
//         addedDate: '',
//         order: 0
//     };
//
//     const endState = todolistsSlice(startState, addTodolistAC(newTodolist));
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(newTodolistTitle);
//     expect(endState[2].filter).toBe('all');
// });
// test('correct todolist should change its name', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: TodolistDamainType[] = [
//         {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
//     ]
//
//     const endState = todolistsSlice(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newFilter: FilterType = "completed";
//
//     const startState: TodolistDamainType[] = [
//         {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all",entityStatus: 'idle', addedDate: '', order: 0}
//     ]
//
//     const action = changeTodolistFilterAC(todolistId2, newFilter)
//
//     const endState = todolistsSlice(startState, action);
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//
// //test for tasks
// test('correct task should be deleted from correct array', () => {
//
//     const action = removeTaskAC('todolistId1', '1')
//     const endState = tasksSlice(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             {
//                 id: '2', title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId1',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//         ],
//         'todolistId2': [
//             {
//                 id: '1', title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             },
//             {
//                 id: '2', title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId2',
//                 description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
//             }
//         ]
//     })
//     expect(endState['todolistId1'].length).toBe(1)
//     expect(endState['todolistId2'].length).toBe(2)
// });
// test('correct task should be added to correct array', () => {
//
//     const action = addTaskAC({
//         todoListId: 'todolistId2',
//         id: 'is exist',
//         status: TaskStatuses.New,
//         addedDate: '',
//         order: 0,
//         priority: 0,
//         deadline: '',
//         title: 'juce',
//         description: '',
//         startDate: ''
//     });
//
//     const endState = tasksSlice(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(2);
//     expect(endState["todolistId2"].length).toBe(3);
//
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
//
// });
// test('status of specified task should be changed', () => {
//     const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");
//
//     const endState = tasksSlice(startState, action)
//
//     expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
//     expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
// });
// test('title of specified task should be changed', () => {
//
//     const action = updateTaskAC('1', {title: 'testTitle'}, 'todolistId1')
//     const endState = tasksSlice(startState, action)
//
//     expect(endState['todolistId1'][0].title).toBe('testTitle');
// });
// test('new array should be added when new todolist is added', () => {
//
//     const newTodolist: TodolistType = {
//         id: v1(),
//         title: "new todolist",
//         addedDate: '',
//         order: 0
//     };
//
//
//     const action = addTodolistAC(newTodolist);
//
//     const endState = tasksSlice(startState, action)
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
// test('property with todolistId should be deleted', () => {
//
//     const action = removeTodolistAC("todolistId2");
//
//     const endState = tasksSlice(startState, action)
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });
// test('empty arrays should be added when we set todolists', () => {
//     const action = setTodolistsAc([
//         {id: '1', title: "What to learn", addedDate: '', order: 0},
//         {id: '2', title: "What to buy", addedDate: '', order: 0}
//     ])
//
//     const endState = tasksSlice({}, action)
//     const keys = Object.keys(endState)
//
//     expect(keys.length).toBe(2)
//     expect(endState['1']).toStrictEqual([])
//     expect(endState['2']).toStrictEqual([])
// });
// test('tasks should be added for todolist', () => {
//     const action = setTaskAC(startState['todolistId1'], 'todolistId1')
//
//     const endState = tasksSlice({
//         'todolistId2': [],
//         'todolistId1': []
//     }, action)
//
//     expect(endState['todolistId1'].length).toBe(2)
//     expect(endState['todolistId2'].length).toBe(0)
// });