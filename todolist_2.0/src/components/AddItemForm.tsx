import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddFormPropsType) => {

  //const {title, onKeyPressHandler, onChangeHandler, error, addItemHandler} = useAddItemForm(props.addItemHandler)

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
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