import React from 'react';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm
}

const callback = action('Item is added')

export const AddItemFormBaseExample = () => {
    //@ts-ignore
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormBaseDisabledExample = () => {
    //@ts-ignore
    return <AddItemForm disabled={true} addItem={callback}/>
}