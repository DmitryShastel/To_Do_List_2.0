import {appActions, setAppStatusAC} from "../../../State/appSlice";
import {createSlice, isFulfilled, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "../../../common/actions/common.actions";
import {handleServerAppError} from "../../../common/utils/handle-server-app-error";
import {handleServerNetworkError} from "../../../common/utils/handle-server-network-error";
import {createAppAsyncThunk} from "../../../common/utils/create.app.asynk.thunk";
import {authAPI} from "../api/authApi";
import {ResultCode} from "../../TodolistList/api/tasksApi.types";
import {LoginParamsType} from "../api/authApi.types";


const initialState = {
    isLoggedIn: false
}


const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        // builder.addCase(login.fulfilled, (state, action) => {
        //     state.isLoggedIn = action.payload.isLoggedIn
        // })
        // builder.addCase(logout.fulfilled, (state, action) => {
        //     state.isLoggedIn = action.payload.isLoggedIn
        // })
        // builder.addCase(initializeApp.fulfilled, (state, action) => {
        //     state.isLoggedIn = action.payload.isLoggedIn
        // })
        builder.addMatcher(
            isFulfilled(login, logout, initializeApp),
            (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    }
})


// export const initializeApp = createAppAsyncThunk<any, undefined>(`${slice.name}/initializeApp`,
//     async (arg, thunkAPI) => {
//         const {rejectWithValue, dispatch} = thunkAPI
//         try {
//             const res = await authAPI.me()
//             if (res.data.resultCode === ResultCode.success) {
//                 return {isLoggedIn: true}
//             } else {
//                 handleServerAppError(res.data, dispatch, false)
//                 return rejectWithValue(null);
//             }
//         } catch (err) {
//             handleServerNetworkError(err, dispatch);
//             return rejectWithValue(null);
//         } finally {
//             dispatch(appActions.setIsInitializedAC({isInitialized: true}));
//         }
//     })

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/initializeApp`,
    //@ts-ignore
    async (_, {dispatch, rejectWithValue}) => {
        const res = await authAPI.me().finally(() => {
            dispatch(appActions.setIsInitializedAC({isInitialized: true}))
        })
        if (res.data.resultCode === ResultCode.success) {
            return {isLoggedIn: true}
        } else {
            rejectWithValue(res.data)
        }
    }
)

export const login = createAppAsyncThunk<{ isLoggedIn: true }, LoginParamsType>(`${slice.name}/login`,
    //@ts-ignore
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await authAPI.login(arg)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: true}
            } else {
                //@ts-ignore
                const isShowAppError = !res.data.fieldsErrors.length
                handleServerAppError(res.data, dispatch, isShowAppError)
                return rejectWithValue(res.data)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        }
    })

export const logout = createAppAsyncThunk<any, undefined>(`${slice.name}/logout`,
    async (_arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(clearTasksAndTodolists({tasks: {}, todolists: []}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (err: any) {
            handleServerNetworkError(err, dispatch)
            return rejectWithValue(null)
        }
    })


export const authSlice = slice.reducer
export const authThunks = {login, logout, initializeApp}
export const authActions = slice.actions;