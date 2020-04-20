import API from './api';

export async function fetchAll() {
  return await API.get({ endpoint: 'categories' });
}
