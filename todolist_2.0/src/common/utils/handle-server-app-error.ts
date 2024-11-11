import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../State/appSlice";
import {BaseResponse2} from "../../features/auth/api/authApi.types";

export const handleServerAppError = <D>(data: BaseResponse2<D>,
                                        dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>,
                                        isShowGlobalError: boolean = true) => {

    if (isShowGlobalError) {
        if (data.messages.length) {
            dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: 'failed'}))
        }
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}