import styled from 'styled-components';
import background from '../assets/foto_fundo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: url(${background}), rgba(63, 210, 156);
  background-size: cover; // faz a imagem de fundo cobrir todo o elemento
  background-position: center; // centraliza a imagem de fundo

  h1 {
    font-size: 10vw;
    color: #FFF;
  }

  p {
    font-size: 2vw;
    color: #FFF;
  }

  button {
    padding: 1vw;
    margin-top: 2vw;
    background: #003BE5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.5vw;
    text-decoration: none;
    color: #FFF;
  }
`;

export function NotFound() {
  return (
    <Container>
      <h1>404</h1>
      <p>Page not found</p>
      <button
        onClick={ () => {
          window.location.href = '/';
        } }
      >
        Voltar ao Inicio
      </button>
    </Container>
  );
}
