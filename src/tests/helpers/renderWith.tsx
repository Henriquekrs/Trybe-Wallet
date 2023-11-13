import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore, Store } from 'redux';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

type Options = {
  initialEntries?: string[];
  initialState?: any;
  store?: Store;
};

function withRouter(component: React.ReactElement, initialEntries: string[]) {
  return (
    <MemoryRouter initialEntries={ initialEntries }>
      { component }
    </MemoryRouter>
  );
}

function withRedux(component: React.ReactElement, store: Store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

export function renderWithRouter(
  component: React.ReactElement,
  {
    initialEntries = ['/'],
  }: Options = {},
) {
  return render(withRouter(component, initialEntries));
}

export function renderWithRedux(component: React.ReactElement, options: Options = {}) {
  const {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
  } = options;

  return {
    ...render(withRedux(component, store)),
    store,
  };
}

export function renderWithRouterAndRedux(
  component: React.ReactElement,
  options: Options = {},
) {
  const {
    initialEntries = ['/'],
  } = options;

  return renderWithRedux(withRouter(component, initialEntries), options);
}
