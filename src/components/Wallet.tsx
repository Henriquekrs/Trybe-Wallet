import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStateUser, GlobalStateWallet } from '../type/types';
import { WalletForm } from './WalletForm';
import { WalletTable } from './WalletTable';
import background from '../assets/foto_fundo.png';
import logoTrybeWallet from '../assets/logo_Trybe_Wallet.svg';
import logoCoin from '../assets/Moedas.svg';
import logoAvatar from '../assets/Vector.svg';

const Container = styled.div`
  width: 100vw; // 100% da largura da viewport
  height: 100vh; // 100% da altura da viewport
  background: url(${background}), rgba(63, 210, 156);
  background-size: cover; // faz a imagem de fundo cobrir todo o elemento
  background-position: center; // centraliza a imagem de fundo
  mix-blend-mode: luminosity;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TagWallet = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 75vw;
  height: 65vh;
  top: -10vh;
  border-radius: 1vw;
  background: #FFF;
  box-shadow: -4px 9px 13px 0px rgba(5, 18, 54, 0.40);
  align-items: flex-start;

  h3:nth-child(3) {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 1vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 0.3vw;
  }

  h3:nth-child(4) {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 1vw;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 0.3vw;
  }

  h3:nth-child(5) {
    color: #2FC18C;
    font-family: Epilogue;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const Logo = styled.img`
  width: 17vw;
  margin-top: 15vh;
`;

const TotalDispesas = styled.div`
  position: relative;
  display: flex;
  color: #173cad;
  width: 18vw;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 18vh;

  & h3:nth-child(2) {
    color: #003BE5;

    font-family: Epilogue;
    font-size: 1.8vh;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 0.5vw;
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 18vh;

  & h3:nth-child(2) {
    color: #2FC18C;
    font-family: Epilogue;
    font-size: 1vw;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 0.3vw;
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
    <Container>
      <TagWallet>
        <Logo src={ logoTrybeWallet } alt="logo_trybe" />
        <TotalDispesas>
          <img src={ logoCoin } alt="" />
          <h3>Total de despesas:</h3>
          <h3 data-testid="total-field">{ expensesTotal.toFixed(2) }</h3>
          <h3 data-testid="header-currency-field">BRL</h3>
        </TotalDispesas>
        <Profile>
          <img src={ logoAvatar } alt="" />
          <h3 data-testid="email-field">{ email }</h3>
        </Profile>
      </TagWallet>
      <WalletForm />
      <WalletTable />
    </Container>
  );
}
