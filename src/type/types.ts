import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type ReduxState = {
    isFetching: boolean,
    cambio: string[],
}

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;