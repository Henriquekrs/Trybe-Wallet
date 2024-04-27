import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeExpense } from '../redux/actions';
import excluir from '../assets/Excluir.svg';
import editar from '../assets/Editar.svg';
import { ExpenseType } from '../type/types';

const Container = styled.div`
  display: flex;
  width: 85vw;
  height: 67vh; // Tamanho fixo para o container da tabela
  margin-top: 10vh;
  border-radius: 1vw;
  background: #003BE5;
  box-shadow: 11px 10px 18px 3px rgb(8 116 90);
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  width: 80vw;
  height: 35vh;
  overflow-y: auto; 
`;

const StyledTable = styled.table`
  width: 100%; // Usa a largura total do ScrollContainer
  background: none;
  border-collapse: separate;
  border-spacing: 0 10px; // Espaçamento entre linhas
  position: relative;

  th {
    position: sticky; // Cabeçalho fixo ao rolar
    top: 0; // Mantém o cabeçalho no topo
    background: #003BE5; // Cor de fundo para o cabeçalho
    color: white; // Cor do texto do cabeçalho
    padding: 0 10px; // Adiciona espaçamento ao cabeçalho
    font-family: Epilogue; // Define a fonte do texto
    font-size: 1vw;
    border-left: 1px solid #ffffff; // Adiciona borda à esquerda

    &:first-child {
      border: none;
    }
  }

  td {
    padding: 0.5vh 2vw;
    font-family: Epilogue;
    font-size: 1vw;
    color: #2FC18C;
    border-bottom: 1px solid #2FC18C; // Adiciona borda na parte inferior
    text-align: center;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;

    & img {
      width: 2vw;
      height: 2vw;
    }
  }
`;

export function WalletTable() {
  const { expenses } = useSelector((rootReducer: any) => rootReducer.wallet);
  const dispatch = useDispatch();

  const handleDelete = (expenseId: number) => {
    dispatch(removeExpense(expenseId));
  };

  return (
    <Container>
      <ScrollContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense: ExpenseType) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ parseFloat(expense.value).toFixed(2) }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  { parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {
                  (parseFloat(expense.value)
                    * parseFloat(expense.exchangeRates[expense.currency].ask))
                    .toFixed(2)
                  }
                </td>
                <td>BRL</td>
                <td>
                  <button
                    onClick={ () => (expense.id) }
                  >
                    <img src={ editar } alt="" />
                  </button>
                  <button
                    onClick={ () => handleDelete(expense.id) }
                    data-testid="delete-btn"
                  >
                    <img src={ excluir } alt="" />
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </StyledTable>
      </ScrollContainer>
    </Container>
  );
}
