import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../../State/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch?: AppDispatch
    rejectValue: null
}>()