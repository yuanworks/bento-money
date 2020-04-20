import API from './api';

export async function fetchAll(params) {
  return await API.get({ params, endpoint: 'transactions' });
}
