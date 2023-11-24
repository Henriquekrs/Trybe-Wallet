import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components'; // Correção 1
import { addEmail } from '../redux/actions';
import validedForm from '../utils/functions';
import background from '../assets/foto_fundo.png';
import logoMoney from '../assets/emoji_Money.svg';
import logoTrybe from '../assets/Trybe.svg';
import logoWallet from '../assets/Wallet.svg';
import retangle from '../assets/Rectangle.svg';

const Container = styled.div`
  width: 100vw; // 100% da largura da viewport
  height: 100vh; // 100% da altura da viewport
  flex-shrink: 0;
  background: url(${background}), rgba(63, 210, 156);
  background-size: cover; // faz a imagem de fundo cobrir todo o elemento
  background-position: center; // centraliza a imagem de fundo
  mix-blend-mode: luminosity;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #FFF;
  box-shadow: -4px 9px 13px 0px rgba(3, 107, 82, 0.30);
  width: 525px;
  height: 356px;
  flex-shrink: 0;
`;

const HeaderForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 268.604px;
  height: 56.142px;
  flex-shrink: 0;
  margin-top: 59px;

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

const Input1 = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  padding: 0 15px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #003BE5;
  background: #FFF; 
  margin-top: 43px;

  &::placeholder {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Input2 = styled.input`
  display: flex;
  width: 300px;
  height: 40px;
  padding: 0 15px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #003BE5;
  background: #FFF;
  margin-top: 10px;

  &::placeholder {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-left: 15px;
    margin-top: 13px;
    margin-right: 18px;
    margin-bottom: 13px;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 330px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #003BE5;
  background: #003BE5;
  color: #fff;
  cursor: pointer;
  color: #FFF;
  text-align: center;
  font-family: Epilogue;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addEmail(email));
    navigate('/carteira');
  };

  const validForm = validedForm(email, password);

  return (
    <Container>
      <FormContainer>
        <HeaderForm>
          <img src={ logoTrybe } alt="logo_trybe" />
          <img src={ logoWallet } alt="logo_wallet" />
          <img src={ retangle } alt="retangulo_logo" />
          <img src={ logoMoney } alt="logo_dinheiro" />
        </HeaderForm>
        <label htmlFor="email">
          <Input1
            type="text"
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="E-mail"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password">
          <Input2
            type="text"
            name="password"
            id="password"
            placeholder="Senha"
            data-testid="password-input"
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />
        </label>
        <Button
          onClick={ handleLogin }
          disabled={ !validForm }
        >
          Entrar
        </Button>
      </FormContainer>
    </Container>
  );
}
