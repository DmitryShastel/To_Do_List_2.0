import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../State/app-reduser";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'failed'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}