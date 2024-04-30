import React, {ChangeEvent, useState} from 'react';

export const useAddItemForm = (onItemAdded: (title: string) => void) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const addItemHandler = () => {
        if (title.trim() !== '') {
            onItemAdded(title);
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
    return {title, onKeyPressHandler, onChangeHandler, error, addItemHandler}
};
