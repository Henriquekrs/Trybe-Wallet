import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ReduxState = {
  isFetching: boolean,
  cambio: string[],
};

export type GlobalStateWallet = {
  wallet: {
    currencies: string[],
    expenses: object[],
    editor: boolean,
    idToEdit: number,
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
