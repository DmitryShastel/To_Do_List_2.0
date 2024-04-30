import React from 'react';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from "@mui/icons-material";
import {TodolistList} from "../features/TodolistList/TdolistsList";
import {ErrorSnackbar} from "../components/common/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../State/store";
import {RequestStatusType} from "../State/app-reduser";


type AppWithReduxType = {
    demo?: boolean
}

export const AppWithRedux = ({demo = false}: AppWithReduxType) => {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistList demo={demo}/>
            </Container>
        </div>
    );
}


