import React from 'react';
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";
import {useAddItemForm} from "./hooks/useAddItemForm";

export type AddFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddFormPropsType) => {

  const {title, onKeyPressHandler, onChangeHandler, error, addItem} = useAddItemForm(props.addItem)

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