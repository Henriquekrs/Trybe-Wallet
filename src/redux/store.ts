import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers/root-reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

if (window.Cypress) {
  window.store = store;
}

export default store;
