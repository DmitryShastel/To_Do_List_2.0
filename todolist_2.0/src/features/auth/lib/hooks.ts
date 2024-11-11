import {useFormik} from "formik";
import {authThunks} from "../model/authSlice";
import {BaseResponse} from "../../../common/types/common.types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../State/store";
import {selectIsLoggedIn} from "../ui/Login/use.login.selector";
import {LoginParamsType} from "../api/authApi.types";


type FormikErrorType = Partial<Omit<LoginParamsType, "captcha">>;

export const useLogin = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 3) {
                errors.password = "Must be 3 characters or more";
            }
            return errors;
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: (values, formikHelpers) => {
            dispatch(authThunks.login(values))
                .unwrap()
                .catch((err: BaseResponse) => {
                    if (err.fieldsErrors) {
                        err.fieldsErrors?.forEach((el) => {
                            formikHelpers.setFieldError(el.field, el.error)
                        })
                    }
                })
        },
    });
    return {formik, isLoggedIn}
}