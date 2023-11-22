export const fetchApi = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = response.json();
  return data;
};
