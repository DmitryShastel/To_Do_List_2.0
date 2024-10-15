import {AppDispatch} from "../../State/store";
import axios from "axios";
import {appActions} from "../../State/app-reduser";

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatch): void => {
    let errorMessage = 'Some error occurred'

    if(axios.isAxiosError(error)){
        errorMessage = error.response?.data?.message || error?.message || errorMessage;
    }else if (error instanceof Error){
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }
    dispatch(appActions.setAppErrorAC({ error: errorMessage }));
    dispatch(appActions.setAppStatusAC({ status: "failed" }));
}