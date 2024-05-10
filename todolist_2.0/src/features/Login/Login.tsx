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
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../State/auth-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppRootStateType} from "../../State/store";
import {Navigate} from "react-router-dom";


export const Login = () => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

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
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate  to={'/'}/>
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
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password" label="Password"
                                       margin="normal"  {...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label="Remember me"
                                              control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                 checked={formik.values.rememberMe}/>}/>
                            <Button type="submit" variant="contained" color="primary" >
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};