import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

const emailInput = 'email-input';
const passwordInput = 'password-input';

describe('Test login page', () => {
  test('Test input in the screen', () => {
    renderWithRouterAndRedux(<App />);

    const enterBtn = screen.getByRole('button', { name: 'Entrar' });

    const email = screen.getByTestId(emailInput);
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId(passwordInput);
    expect(password).toBeInTheDocument();

    const enter = enterBtn;
    expect(enter).toBeInTheDocument();
  });

  test('Tests the button remains disabled if the fields are invalid.', async () => {
    renderWithRouterAndRedux(<App />);

    const user = userEvent.setup();

    const enterBtn = screen.getByRole('button');

    await user.type(screen.getByTestId(emailInput), 'alguemalguem.com');
    await user.type(screen.getByTestId(passwordInput), '1234');
    expect(enterBtn).toBeDisabled();

    await user.clear(screen.getByTestId(emailInput));
    await user.clear(screen.getByTestId(passwordInput));

    await user.type(screen.getByTestId(emailInput), 'alguem@alguem.com.br');
    await user.type(screen.getByTestId(passwordInput), '1234');
    expect(enterBtn).toBeDisabled();

    await user.clear(screen.getByTestId(emailInput));
    await user.clear(screen.getByTestId(passwordInput));

    await user.type(screen.getByTestId(emailInput), 'alguemalguem.com');
    await user.type(screen.getByTestId(passwordInput), '123456');
    expect(enterBtn).toBeDisabled();

    await user.clear(screen.getByTestId(emailInput));
    await user.clear(screen.getByTestId(passwordInput));

    await user.type(screen.getByTestId(emailInput), 'alguem@alguem.com');
    await user.type(screen.getByTestId(passwordInput), '123456');
    expect(enterBtn).toBeEnabled();
  });

  test('Test button redirect the page /carteira', async () => {
    renderWithRouterAndRedux(<App />);
    const user = userEvent.setup();

    const validEmail = 'alguem@alguem.com';
    const validPassword = '1234567';

    const loginButton = screen.getByRole('button');

    await user.type(screen.getByTestId(emailInput), validEmail);
    await user.type(screen.getByTestId(passwordInput), validPassword);
    expect(loginButton).toBeEnabled();

    await user.click(loginButton);
    waitFor(() => expect(global.window.location.pathname).toEqual('/carteira'));
  });
});
