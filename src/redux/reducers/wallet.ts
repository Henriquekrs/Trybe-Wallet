import { DELETE_EXPENSE, REQUEST_SUCCESSFUL, SET_OPTIONS } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica se uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que está sendo editada
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTIONS:
      return { ...state, currencies: action.payload };
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        idToEdit: state.idToEdit + 1,
      };
    case DELETE_EXPENSE: {
      const updatedExpenses = state.expenses
        .filter((expense) => expense.id !== action.payload);
      return {
        ...state,
        expenses: updatedExpenses,
      }; }
    default:
      return state;
  }
};

export default wallet;
