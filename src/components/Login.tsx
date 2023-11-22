import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components'; // Correção 1
import { addEmail } from '../redux/actions';

import validedForm from '../utils/functions';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(29, 29, 29);
  background: linear-gradient(90deg, rgba(29, 29, 29, 1) 0%, rgba(98, 96, 96, 1) 100%);
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 8px 1px;
  padding: 55px;
  border: 1px solid #ddd3;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Input = styled.input`
  display: flex;
  justify-content: flex-start;
  margin: 8px 1px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #ffffff38;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
        <label htmlFor="email">
          Email
          <Input
            type="text"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
          />
        </label>
        <label htmlFor="password">
          Senha
          <Input
            type="text"
            name="password"
            id="password"
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
