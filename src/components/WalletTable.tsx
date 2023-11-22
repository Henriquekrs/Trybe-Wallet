import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";
import { removeExpense } from "../redux/actions";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: white;

  th, td {
    border: 1px solid white;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #333;
  }

  tbody tr:hover {
    background-color: #555;
  }

  button {
    cursor: pointer;
    background-color: #b60000c5;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
    border-radius: 4px;
  }
`;

export function WalletTable() {
  const { expenses } = useSelector((rootReducer) => rootReducer.wallet);
  const dispatch = useDispatch();

  const handleDelete = (expenseId) => {
    dispatch(removeExpense(expenseId))
  };

    return (
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
                {expenses.map((expense) => (
                    <tr key={expense.id}>
                        <td>{expense.description}</td>
                        <td>{expense.tag}</td>
                        <td>{expense.method}</td>
                        <td>{parseFloat(expense.value).toFixed(2)}</td>
                        <td>{expense.exchangeRates[expense.currency].name}</td>
                        <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                        <td>{(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                        <td>BRL</td>
                        <td>
                            <button 
                              onClick={() => (expense.id)}
                            >Editar
                            </button>
                            <button
                              onClick={ (e) => handleDelete(expense.id) }
                              data-testid="delete-btn"
                            >Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    )
}