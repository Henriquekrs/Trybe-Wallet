import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStateUser, GlobalStateWallet } from '../type/types';

const TagWallet = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: white;
  font-size: calc(10px + 2vmin);
  border: 1px solid white;

  & h3 {
    display: flex;
    flex-direction: row;
    margin-left: 15px;
  }
`;

export function WalletPage() {
  const { email } = useSelector(
    (rootReducer: GlobalStateUser) => rootReducer.user,
  );
  const { expenses } = useSelector(
    (rootReducer: GlobalStateWallet) => rootReducer.wallet,
  );
  const [expensesTotal, setExpensesTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let totalAsk = 0;

    expenses.forEach((expense: any) => {
      const { value, currency, exchangeRates } = expense;

      if (exchangeRates && exchangeRates[currency] && exchangeRates[currency].ask) {
        const conversionRate = parseFloat(exchangeRates[currency].ask);
        totalAsk += parseFloat(value) * conversionRate;
      }
    });

    const somaTotalAskFormatada = totalAsk.toFixed(2);
    setExpensesTotal(parseFloat(somaTotalAskFormatada));
  }, [expenses]);

  return (
    <TagWallet>
      <h3 data-testid="email-field">{ email }</h3>
      <h3 data-testid="total-field">{ expensesTotal.toFixed(2) }</h3>
      <h3 data-testid="header-currency-field">BRL</h3>
      <button
        onClick={ () => navigate('/') }
      >
        Voltar
      </button>
    </TagWallet>
  );
}
