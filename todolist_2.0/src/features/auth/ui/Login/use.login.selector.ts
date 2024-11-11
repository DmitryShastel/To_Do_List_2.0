import {AppRootStateType} from "../../../../State/store";


export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn