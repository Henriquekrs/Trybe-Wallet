import { ADD_EMAIL } from "../actions";

const initialState = {
    email: '',
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMAIL:
            return {...state, email: action.payload };
        default:
            return state;
    }
}

export default user;