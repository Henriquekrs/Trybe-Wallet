import styled from "styled-components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import rootReducer from "../redux/reducers/root-reducer"
import { addOptions, requestSuccessful } from "../redux/actions"
import { Dispatch } from "../type/types"
import { resultApi } from "../utils/functions"

const TagWalletForm = styled.div`
  align-items: center;
  border: 1px solid white;
  padding: 10px 15px;

  & form {
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
`

export function WalletForm() {
  const [valueInput, setValueInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [option, setOption] = useState('USD');
  const [methodInput, setMethodInput] = useState('Dinheiro');
  const [tagInput, setTagInput] = useState('Alimentação');
  const dispatch: Dispatch = useDispatch()
  const { currencies } = useSelector((rootReducer) => rootReducer.wallet)
  const { expenses } = useSelector((rootReducer) => rootReducer.wallet)
  const { chaveQueSalvaOId } = useSelector((rootReducer) => rootReducer.wallet)

  const handleAddExpense = async (e) => {
    e.preventDefault();
        
    const id = chaveQueSalvaOId;
    const value = valueInput;
    const description = descriptionInput;
    const currency = option;
    const method = methodInput;
    const tag = tagInput;
    const exchangeRates = await resultApi();

    const expense = { //isto tem que ser igual ao do teste
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    }
    dispatch(requestSuccessful(expense))
    setValueInput("")
    setDescriptionInput("")
  }

  useEffect(() => {
    const xablau = async () => {
      const variavel = await resultApi()
      dispatch(addOptions(Object.keys(variavel)))
    }
    xablau()
  }, [])
  
  return (
    <TagWalletForm>
      <form>
        <label htmlFor="valor">Valor:</label>
        <input
          data-testid="value-input"
          type="text"
          name=""
          id="valor"
          value={valueInput}
          onChange={(event) => setValueInput(event.target.value)}
        />
        <label htmlFor="description">Descrição:</label>
        <input
          data-testid="description-input"
          type="text"
          name=""
          id="description"
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
        />
        <select
          data-testid="currency-input"
          name=""
          id=""
          value={option}
          onChange={({target}) => setOption(target.value)}
        >
          {currencies.map((options, index) => (
            <option
              key={index}
              value={options}
            >
              {options}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name=""
          id=""
          value={ methodInput }
          onChange={({target}) => setMethodInput(target.value)}
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name=""
          id=""
          value={ tagInput }
          onChange={({target}) => setTagInput(target.value)}
        >
          <option value="Alimentacao">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saude">Saúde</option>
        </select>
        <label
        htmlFor=""
        >
          <button
          onClick={handleAddExpense}
          >
            Adicionar despesa
          </button>
        </label>
      </form>
    </TagWalletForm>
  )
}


