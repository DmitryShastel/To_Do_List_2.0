import {BaseResponse2} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../State/app-reduser";

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