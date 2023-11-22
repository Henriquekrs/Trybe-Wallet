import { useSelector } from "react-redux"
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  `

export function WalletPage() {
  const { email } = useSelector((rootReducer) => rootReducer.user);
  const { expenses } = useSelector((rootReducer) => rootReducer.wallet);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    let totalAsk = 0;

    expenses.forEach((expense) => {
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
      <h3
        data-testid="email-field"
      >
        { email }
      </h3>
      <h3
        data-testid="total-field"
      >
        { expensesTotal.toFixed(2) }
      </h3>
      <h3
        data-testid="header-currency-field"
      >
        BRL
      </h3>
      <label
      >
        <button
          onClick={(e) => navigate('/')}
        >
          Voltar
        </button>
      </label>
    </TagWallet>
  )
};
