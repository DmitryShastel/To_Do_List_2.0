import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";
import {unwrapResult} from "@reduxjs/toolkit";
import {BaseResponse2} from "../features/auth/api/authApi.types";

export type Props = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: Props) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title)
                .then(unwrapResult)
                .then((res) => {
                    setTitle('')
                }).catch((err: BaseResponse2) => {
                if (err.messages) {
                    setError(err.messages[0])
                }
            })

        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent | React.KeyboardEvent) => {
        if (error !== null) {
            setError(null)
        }
        if (e.keyCode === 13) {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                disabled={disabled}
                label="Type Value"
                value={title}
                onKeyDown={onKeyPressHandler}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={"default"}
                disabled={disabled}
                onClick={addItemHandler}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});