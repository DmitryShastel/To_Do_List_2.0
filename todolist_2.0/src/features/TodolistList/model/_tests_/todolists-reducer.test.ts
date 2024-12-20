export {}



// import {
//     addTodolistAC,
//     changeTodolistFilterAC, changeTodolistEntityStatusAC,
//     changeTodolistTitleAC, FilterType,
//     removeTodolistAC, setTodolistsAc, TodolistDamainType,
//     todolistsSlice
// } from './todolists-reducer';
// import {v1} from 'uuid';
// import {TodolistType} from "../api/todolists-api";
// import {RequestStatusType} from "./app-reduser";
//
// let todolistId1: string
// let todolistId2: string
// let startState: Array<TodolistDamainType> = []
//
//
// beforeEach(() => {
//     todolistId1 = v1();
//     todolistId2 = v1();
//     startState = [
//         {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
//     ]
// })
//
// test('correct todolist should be removed', () => {
//
//     const endState = todolistsSlice(startState, removeTodolistAC(todolistId1))
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todolistId2);
// });
// test('correct todolist should be added', () => {
//
//     let newTodolistTitle = "New Todolist";
//     const newTodolist: TodolistType = {
//         id: v1(),
//         title: newTodolistTitle,
//         addedDate: '',
//         order: 0
//     };
//
//     const endState = todolistsSlice(startState, addTodolistAC(newTodolist))
//
//     expect(endState.length).toBe(3);
//     expect(endState[0].title).toBe(newTodolistTitle);
//     expect(endState[2].filter).toBe('all');
// });
// test('correct todolist should change its name', () => {
//
//     let newTodolistTitle = "New Todolist";
//
//     const endState = todolistsSlice(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
// test('correct filter of todolist should be changed', () => {
//
//     let newFilter: FilterType = "completed";
//
//     const action = changeTodolistFilterAC(todolistId2, newFilter)
//
//     const endState = todolistsSlice(startState, action);
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
// test('todolists should be set to the state', () => {
//     const action = setTodolistsAc(startState)
//
//     const endState = todolistsSlice([], action)
//     expect(endState.length).toBe(2)
// })
// test('correct status of todolist should be changed', () => {
//
//     let newStatus: RequestStatusType = 'loading';
//
//     const action = changeTodolistEntityStatusAC(todolistId2, newStatus)
//
//     const endState = todolistsSlice(startState, action);
//
//     expect(endState[0].entityStatus).toBe("idle");
//     expect(endState[1].entityStatus).toBe(newStatus);
// });