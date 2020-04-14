import { LUNCH_MONEY_ACCESS_TOKEN } from 'react-native-dotenv';

const accessToken = LUNCH_MONEY_ACCESS_TOKEN;

export async function fetchAll(params) {
  const response = await fetch(`https://dev.lunchmoney.app/v1/transactions?${queryString(params)}`, {
    method: 'GET',
    headers: {
      Accept         : 'application/json',
      'Content-Type' : 'application/json',
      Authorization  : `Bearer ${accessToken}`,
    },
  });

  return await response.json();
}

function queryString(obj) {
  const keyValuePairs = [];
  
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}