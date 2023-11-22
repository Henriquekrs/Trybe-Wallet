import { fetchApi } from '../services/api';

function validedForm(email: string, password: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
  const senhaMinimaCaracteres = 6; // Número mínimo de caracteres para a senha

  const formatoEmailValido = emailRegex.test(email);
  const senhaComMinimoCaracteres = password.length >= senhaMinimaCaracteres;

  return formatoEmailValido && senhaComMinimoCaracteres;
}

export const resultApi = async () => {
  const result = await fetchApi();
  delete result.USDT;
  return result;
};

export default validedForm;
