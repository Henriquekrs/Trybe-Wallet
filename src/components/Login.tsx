import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addEmail } from '../redux/actions';
import validedForm from '../utils/functions';
import background from '../assets/foto_fundo.png';
import logoTrybeWallet from '../assets/logo_Trybe_Wallet.svg';

const Container = styled.div`
  width: 100vw; // 100% da largura da viewport
  height: 100vh; // 100% da altura da viewport
  background: url(${background}), rgba(63, 210, 156);
  background-size: cover; // faz a imagem de fundo cobrir todo o elemento
  background-position: center; // centraliza a imagem de fundo
  mix-blend-mode: luminosity;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    background: url(${background}), rgba(63, 210, 156);
    background-size: cover;
    background-position: center;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #FFF;
  box-shadow: -4px 9px 13px 0px rgba(57, 121, 106, 0.3);
  width: 30vw;
  height: 40vh;

  @media (max-width: 768px) {
    height: 50vh;
    width: 95vw;
    background-color: #ffffff;
    box-shadow: -4px 9px 13px 0px rgba(34, 77, 67, 0.81);
  }
`;

const Logo = styled.img`
  width: 17vw;
  margin-top: 3vh;
  margin-bottom: 3vh;

  @media (max-width: 768px) {
    width: 70vw;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }
`;

const Input = styled.input`
  display: flex;
  width: 17vw;
  height: 5vh;
  padding: 0 15px;
  border-radius: 5px;
  border: 2px solid #003BE5;
  background: #FFF;
  margin-top: 5px;
  font-size: 1vw;

  &::placeholder {
    color: #003BE5;
    font-family: Epilogue;
    font-size: 2vh;
    font-style: normal;
    font-weight: 800;
    line-height: bold;
  }

  @media (max-width: 768px) {
    width: 70vw;
    height: 7vh;
    padding: 0 15px;
    font-size: 5vw;
    border-radius: 5px;
    border: 2px solid #003BE5;
    background: none;
    margin-top: 1vh;
  }
`;

const Button = styled.button`
  margin-top: 30px;
  width: 17vw;
  height: 6vh;
  border-radius: 5px;
  border: none;
  background: #003BE5;
  color: #fff;
  cursor: pointer;
  color: #FFF;
  text-align: center;
  font-family: Epilogue;
  font-size: 2vh;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  @media (max-width: 768px) {
    width: 70vw;
    height: 7vh;
    border-radius: 5px;
    border: none;
    background: #003BE5;
    color: #FFF;
    text-align: center;
    font-family: Epilogue;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(addEmail(email));
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/carteira');
  };

  const validForm = validedForm(email, password);

  return (
    <Container>
      <FormContainer>
        <Logo src={ logoTrybeWallet } alt="logo_trybe" />
        <label htmlFor="email">
          <Input
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
          <Input
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

export default LoginPage;
