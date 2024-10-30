import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "./use.login.selector";
import {useAppSelector} from "../../State/store";
import {authThunks} from "../../State/auth-reducer";
import {BaseResponse} from "../../common/types/common.types";


export const Login = () => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
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

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return (
        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <Typography>
                                To log in get registered{' '}
                                <a href="https://social-network.samuraijs.com/" target="_blank"
                                   rel="noopener noreferrer">
                                    here
                                </a>
                            </Typography>
                            <Typography>or use common test account credentials:</Typography>
                            <Typography>Email: free@samuraijs.com</Typography>
                            <Typography>Password: free</Typography>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" margin="normal"  {...formik.getFieldProps('email')}/>
                            {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password"
                                       margin="normal"  {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel label="Remember me"
                                              control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                 checked={formik.values.rememberMe}/>}/>
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};