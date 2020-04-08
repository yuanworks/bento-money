export async function fetchAll(params) {
  const response = await fetch(`https://dev.lunchmoney.app/v1/transactions?${queryString(params)}`, {
    method: 'GET',
    headers: {
      Accept         : 'application/json',
      'Content-Type' : 'application/json',
      Authorization  : 'Bearer b8a0da897c53ddbda9995ba833fa8b7fc1cb9c4be67d0b82d7',
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