import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addOptions, requestSuccessful } from '../redux/actions';
import { Dispatch, GlobalStateWallet } from '../type/types';
import { resultApi } from '../utils/functions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1037px;
  height: 134px;
  top: 147px;
  background: rgba(225, 229, 235, 0.49);
  position: absolute;
`;
const TagWalletForm = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  align-items: center;
  justify-content: space-between;
  width: 820px;
  height: 87px;
  flex-shrink: 0;
  color: #003BE5;
  font-family: Epilogue;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 39px;

  & input:nth-child(2) {
    width: 158px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #003BE5;
  }

  input:nth-child(4) {
    width: 228px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #003BE5;
  }

  select:nth-child(6) {
    width: 91px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #003BE5;
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    --webkit-appearance: none;
    
    

    & option {
      display: flex;
      align-items: center;
    }
  }

  select:nth-child(8) {
    width: 228px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #003BE5;
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    --webkit-appearance: none;
  }

  select:nth-child(10) {
    width: 155px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #003BE5;
    color: #003BE5;
    font-family: Epilogue;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    --webkit-appearance: none;
  }
`;

const Button = styled.button`
  position: relative;
  width: 330px;
  height: 40px;
  top: 51px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #2FC18C;
  color: #FFF;
  border: none;
  text-align: center;
  font-family: Epilogue;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export function WalletForm() {
  const [valueInput, setValueInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [option, setOption] = useState('USD');
  const [methodInput, setMethodInput] = useState('Dinheiro');
  const [tagInput, setTagInput] = useState('Alimentação');
  const dispatch: Dispatch = useDispatch();
  const { currencies } = useSelector(
    (rootReducer: GlobalStateWallet) => rootReducer.wallet,
  );
  const { idToEdit } = useSelector(
    (rootReducer: GlobalStateWallet) => rootReducer.wallet,
  );

  const handleAddExpense = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const id = idToEdit;
    const value = valueInput;
    const description = descriptionInput;
    const currency = option;
    const method = methodInput;
    const tag = tagInput;
    const exchangeRates = await resultApi();

    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    dispatch(requestSuccessful(expense));
    setValueInput('');
    setDescriptionInput('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await resultApi();
      dispatch(addOptions(Object.keys(result)));
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container>
      <TagWalletForm>
        <label htmlFor="valor">Valor:</label>
        <input
          data-testid="value-input"
          type="text"
          name=""
          id="valor"
          value={ valueInput }
          onChange={ (event) => setValueInput(event.target.value) }
        />
        <label htmlFor="description">Descrição da despesa</label>
        <input
          data-testid="description-input"
          type="text"
          name=""
          id="description"
          value={ descriptionInput }
          onChange={ (event) => setDescriptionInput(event.target.value) }
        />
        <label htmlFor="currency">Moeda</label>
        <select
          data-testid="currency-input"
          name=""
          id="currency"
          value={ option }
          onChange={ ({ target }) => setOption(target.value) }
        >
          { currencies.map((options, index) => (
            <option key={ index } value={ options }>
              { options }
            </option>
          )) }
        </select>
        <label htmlFor="method">Método de pagamento</label>
        <select
          data-testid="method-input"
          name=""
          id="method"
          value={ methodInput }
          onChange={ ({ target }) => setMethodInput(target.value) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="tag">Categoria da despesa</label>
        <select
          data-testid="tag-input"
          name=""
          id="tag"
          value={ tagInput }
          onChange={ ({ target }) => setTagInput(target.value) }
        >
          <option value="Alimentacao">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saude">Saúde</option>
        </select>
      </TagWalletForm>
      <Button
        onClick={ handleAddExpense }
      >
        Adicionar despesa
      </Button>
    </Container>
  );
}
