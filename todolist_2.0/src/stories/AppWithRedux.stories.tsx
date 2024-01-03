import React from 'react';
import {AppWithRedux} from "../State/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AddItemFormBaseExample = () => {
    return <AppWithRedux/>
}