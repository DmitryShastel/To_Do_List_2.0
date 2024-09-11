import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
//don't remove
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../State/store";
import {setAppErrorAC} from "../../../State/app-reduser";

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const error = useSelector<AppRootStateType, string | null>(state=> state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error: null}))
        //setOpen(false);
    };



    const isOpen = error !== null;

    return (
        <div>
            {/*<Button onClick={handleClick}>Open Snackbar</Button>*/}
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    // variant="filled"
                    // sx={{width: '100%'}}
                >
                    {error}
                </Alert>
                {/*<span>This is a success Alert inside a Snackbar!</span>*/}
            </Snackbar>
        </div>
    );
}