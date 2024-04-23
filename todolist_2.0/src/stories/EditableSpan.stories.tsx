import React from 'react';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan,

}

const value = 'Test title'
const callback = action('Title is changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan onChange={callback} title={value}/>
}