import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ReduxState = {
  isFetching: boolean,
  cambio: string[],
};

export type GlobalStateWallet = {
  wallet: {
    currencies: string[], // array de string
    expenses: object[], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: boolean, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: number, // valor numérico que armazena o id da despesa que está sendo editada
  }
};

export type GlobalStateUser = {
  user: {
    email: string,
  }
};

export type ExpenseType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: any,
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
