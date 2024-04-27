import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const HeaderAuthor = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  position: absolute;
  bottom: 0px;
  width: 100vw;
  font-size: 20px;
  font-weight: 100;
  color: #000000;
  font-family: "Open Sans", sans-serif;
  height: 5vh;
  margin: 0;
  padding: 0;

  a {
    margin-left: 1vw;
    margin-top: 0.5vw;
  }

  @media (max-width: 768px) {
    font-size: 17px;
    height: 5vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

export function Header() {
  return (
    <>
      <Outlet />
      <HeaderAuthor>
        Developed by Gustavo Henrique
        <a href="https://www.linkedin.com/in/henriquekrs/" target="_blank" rel="noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/256/174/174857.png"
            alt="Ícone 2"
            width="24"
          />
        </a>
        <a href="https://github.com/Henriquekrs" target="_blank" rel="noreferrer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Ícone 2"
            width="24"
          />
        </a>
      </HeaderAuthor>
    </>
  );
}
