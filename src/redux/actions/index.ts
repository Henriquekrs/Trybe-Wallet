import { Dispatch, ReduxState } from '../../type/types'

export const ADD_EMAIL = 'ADD_EMAIL'
export const SET_OPTIONS = 'SET_OPTIONS'
export const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'

export const addEmail = (email: string) => ({
    type: ADD_EMAIL,
    payload: email
}
);

export const addOptions = (options: string[]) => ({
    type: SET_OPTIONS,
    payload: options
}
);

export const requestSuccessful = (expenses) => ({
        type: REQUEST_SUCCESSFUL,
        payload: expenses,
})

export const removeExpense = (expenseId) => ({
    type: DELETE_EXPENSE,
    payload: expenseId,
}
);
