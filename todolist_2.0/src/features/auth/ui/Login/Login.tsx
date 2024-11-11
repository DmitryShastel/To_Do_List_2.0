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
import {Navigate} from "react-router-dom";
import {useLogin} from "../../lib/hooks";


export const Login = () => {

    const {formik, isLoggedIn} = useLogin()

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
                                <a href="src/features/auth/ui/Login/Login" target="_blank"
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