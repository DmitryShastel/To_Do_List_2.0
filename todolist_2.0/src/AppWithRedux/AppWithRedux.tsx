import React, {useCallback, useEffect} from 'react';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TodolistList} from "../features/TodolistList/TdolistsList";
import {ErrorSnackbar} from "../components/common/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {initializeAppTC, RequestStatusType} from "../State/app-reduser";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {logautTC} from "../State/auth-reducer";


type AppWithReduxType = {
    demo?: boolean
}

export const AppWithRedux = ({demo = false}: AppWithReduxType) => {

    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    const logoutHandler = useCallback(() => {
        dispatch(logautTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }



    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6' style={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color='inherit' onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistList demo={demo}/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}