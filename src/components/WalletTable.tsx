import { useSelector } from "react-redux"
import styled from "styled-components";

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
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-right: 5px;
  }
`;

export function WalletTable() {
  const { expenses } = useSelector((rootReducer) => rootReducer.wallet)

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
                        <td>{expense.value}</td>
                        <td>{expense.currency}</td>
                        <td>{expense.exchangeRates[expense.currency].ask}</td>
                        <td>{(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                        <td>BRL</td>
                        <td>
                            <button onClick={() => (expense.id)}>Editar</button>
                            <button onClick={() => (expense.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    )
}