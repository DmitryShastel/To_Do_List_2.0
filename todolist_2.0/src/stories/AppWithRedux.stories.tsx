import React from 'react';
import {AppWithRedux} from "../AppWithRedux/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


export const AddItemFormBaseExample = (props: any) => {
    return <AppWithRedux demo={true}/>
}