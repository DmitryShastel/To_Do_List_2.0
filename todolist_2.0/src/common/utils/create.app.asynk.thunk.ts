import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "../../State/store";
import {BaseResponse} from "../types/common.types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch?: AppDispatch
    rejectValue: null | BaseResponse
}>()