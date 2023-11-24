import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeExpense } from '../redux/actions';
import excluir from '../assets/Excluir.svg';
import editar from '../assets/Editar.svg';

const Container = styled.div`
display: flex;
width: 1155px;
position: static;
height: 464px;
flex-shrink: 0;
margin-top: 147px;
border-radius: 10px;
background: #003BE5;
box-shadow: -4px 9px 13px 0px rgba(3, 107, 82, 0.30);
align-items: flex-end;
justify-content: center;
`;

const StyledTable = styled.table`
  width: 1040px;
  height: 129px;
  border-collapse: separate;
  border-spacing: 0 10px;
  color: white;
  position: relative;
  top: -20px;
  

  th {
    border-left: 1px solid #FFF;
    width: 110.933px;
    color: #FFF;
    text-align: center;
    font-family: Epilogue;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 13px;

    &:first-child {
      border-left: none;
    }
  }

  td {
    width: 115.556px;
    height: 40.923px;
    flex-direction: column;
    justify-content: center;
    border-top: 1px solid #FFF;
    color: #2FC18C;
    text-align: center;
    font-family: Epilogue;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 13px; /* 108.333% */ 
  }

  tbody tr:hover {
    background-color: #003be52b;
  }

  button {
    cursor: pointer;
    border: none;
    padding: 0;
    background-color: transparent;

    & img {
      width: 15.318px;
      height: 13.613px;
      margin-right: 5px;
    }
  }
`;

type ExpenseType = {
  id: number,
  value: string,
  currency: string,
  method: string,
  tag: string,
  description: string,
  exchangeRates: any,
};

export function WalletTable() {
  const { expenses } = useSelector((rootReducer: any) => rootReducer.wallet);
  const dispatch = useDispatch();

  const handleDelete = (expenseId: number) => {
    dispatch(removeExpense(expenseId));
  };

  return (
    <Container>
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
    </Container>
  );
}
