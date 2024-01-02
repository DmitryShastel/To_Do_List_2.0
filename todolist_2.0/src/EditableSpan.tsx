import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
// import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    console.log('EditableSpan')
    let [editMode, setEditeMode] = useState(false)
    let [title, setTitle] = useState(props.title)

    const activateEditMode = () =>{
        setEditeMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        setEditeMode(false)
        props.onChange(title);
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}
