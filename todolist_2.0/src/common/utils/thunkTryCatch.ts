import {setAppStatusAC} from "../../State/appSlice";
import {handleServerNetworkError} from "./handle-server-network-error";

export const thunkTryCatch = async (thunkAPI: any, logic: () => Promise<any>) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        return await logic()
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(setAppStatusAC({status: 'idle'}))
    }
}