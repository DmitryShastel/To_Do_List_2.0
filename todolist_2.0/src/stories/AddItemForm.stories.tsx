import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm
}

const callback = action('Item is added')

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}