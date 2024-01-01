import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddFormPropsType) => {
    console.log('AddItemForm')

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
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
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label="Type Value"
                value={title}
                onKeyDown={onKeyPressHandler}
                onChange={onChangeHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                color={"default"}
                onClick={addItem}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});