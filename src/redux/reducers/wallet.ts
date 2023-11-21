import { REQUEST_SUCCESSFUL, SET_OPTIONS } from "../actions";

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
}

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      return { ...state, currencies: action.payload};
    case REQUEST_SUCCESSFUL:
      return {...state, expenses: [...state.expenses, action.payload]};
    default:
      return state;
  }
}

export default wallet;
