import { LUNCH_MONEY_ACCESS_TOKEN } from 'react-native-dotenv';

const LUNCH_MONEY_DOMAIN = 'https://dev.lunchmoney.app';
const LUNCH_MONEY_VERSION = 'v1';

// accessToken can eventually be enabled through an "add access token screen"
const accessToken = LUNCH_MONEY_ACCESS_TOKEN;

const DEFAULT_HEADERS = {
  Accept         : 'application/json',
  'Content-Type' : 'application/json',
  Authorization  : `Bearer ${accessToken}`,
};

async function fetchJson({ method='GET', domain = LUNCH_MONEY_DOMAIN, version = LUNCH_MONEY_VERSION, endpoint, headers = DEFAULT_HEADERS, params, data }) {

  const url = domain + '/' + version + '/' + endpoint + '?' + queryString(params);

  const body = data ? JSON.stringify(data) : undefined;

  const response = await fetch(url, {
    headers,
    method,
    body,
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

const API = {
  get  : async (args) => await fetchJson(args),
  post : async (args) => await fetchJson({ method: 'POST', ...args }),
}

export default API;
