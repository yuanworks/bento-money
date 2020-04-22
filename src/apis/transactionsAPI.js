import API from './api';

export async function fetchAll(params) {
  return await API.get({ params, endpoint: 'transactions' });
}

export async function insertTransaction(data) {
  return await API.post({ data, endpoint: 'transactions' });
}
