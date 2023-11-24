import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GlobalStateUser, GlobalStateWallet } from '../type/types';
import { WalletForm } from './WalletForm';
import { WalletTable } from './WalletTable';
import background from '../assets/foto_fundo.png';
import logoMoney from '../assets/emoji_Money.svg';
import logoTrybe from '../assets/Trybe.svg';
import logoWallet from '../assets/Wallet.svg';
import retangle from '../assets/Rectangle.svg';
import logoCoin from '../assets/Moedas.svg';
import logoAvatar from '../assets/Vector.svg';

const Container = styled.div`
  width: 100vw; // 100% da largura da viewport
  height: 100vh; // 100% da altura da viewport
  max-width: 100%;
  max-height: 965.393px;
  background: url(${background}), rgba(63, 210, 156);
  background-size: cover; // faz a imagem de fundo cobrir todo o elemento
  background-position: center; // centraliza a imagem de fundo
  mix-blend-mode: luminosity;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
`;

const TagWallet = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-items: center;
  justify-content: space-around;
  align-items: center;
  width: 1037px;
  height: 482px;
  top: -105px;
  border-radius: 0 0 10px 10px;
  background: #FFF;
  box-shadow: -4px 9px 13px 0px rgba(5, 18, 54, 0.40);

  h3:nth-child(3) {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  h3:nth-child(4) {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 4px;
  }

  h3:nth-child(5) {
    width: 123px;
    color: #2FC18C;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

const HeaderLogo = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  width: 250.185px;
  height: 52.293px;
  flex-shrink: 0;
  left: 70px;
  top: -63px;

  & img:nth-child(1) {
    position: absolute;
    width: 85.882px;
    height: 33.795px;
    flex-shrink: 0;
    left: 61px;
    margin-top: 21px;
  }

  img:nth-child(2) {
    position: absolute;
    width: 112.152px;
    height: 26.756px;
    flex-shrink: 0;
    left: 151px;
    margin-top: 21px;
    margin-bottom: 7px;
  }

  img:nth-child(3) {
    position: absolute;
    width: 50.516px;
    height: 50.516px;
    flex-shrink: 0;
    left: 4px;
    top: 4px;
  }

  img:nth-child(4) {
    position: absolute;
    width: 55.497px;
    height: 55.497px;
    flex-shrink: 0;
  }
`;

const TotalDispesas = styled.div`
  position: relative;
  display: flex;
  color: #003BE5;
  width: 270px;
  height: 28.705px;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: -47px;
  left: 44px;

  & h3:nth-child(2) {
    width: 138px;
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 8.29px;
  }
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  width: 157px;
  height: 25.21px;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  margin-right: 104px;
  top: -47px;

  & h3:nth-child(2) {
    width: 123px;
    color: #2FC18C;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 8.75px;
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
        <HeaderLogo>
          <img src={ logoTrybe } alt="logo_trybe" />
          <img src={ logoWallet } alt="logo_wallet" />
          <img src={ retangle } alt="retangulo_logo" />
          <img src={ logoMoney } alt="logo_dinheiro" />
        </HeaderLogo>
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
