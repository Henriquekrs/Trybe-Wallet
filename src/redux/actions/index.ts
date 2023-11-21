import { Dispatch, ReduxState } from '../../type/types'

export const ADD_EMAIL = 'ADD_EMAIL'
export const SET_OPTIONS = 'SET_OPTIONS'
export const REQUEST_STARTED = 'REQUEST_STARTED'
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL' 

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

export function requestStarted() {
    return { type: REQUEST_STARTED };
}

export const requestSuccessful = (expenses) => ({
        type: REQUEST_SUCCESSFUL,
        payload: expenses,
})

type GetState = () => ReduxState

export function fetchExpenses() {
    return async (dispatch: Dispatch, _getState: GetState) => {
        dispatch(requestStarted());
        try {
            const response = await fetch('https://economia.awesomeapi.com.br/json/all')
            const data = response.json();
            dispatch(requestSuccessful(data));
        } catch (error: any) {
            console.log('error fetch');
        }
    };
}
