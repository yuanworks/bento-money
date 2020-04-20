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

async function fetchJson({ method='GET', domain = LUNCH_MONEY_DOMAIN, version = LUNCH_MONEY_VERSION, endpoint, headers = DEFAULT_HEADERS, params }) {

  const url = domain + '/' + version + '/' + endpoint + '?' + queryString(params);

  const response = await fetch(url, {
    headers,
    method,
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


export default class API {

  static async get(args) {
    return await fetchJson(args);
  }

  static async post(args) {
    return await fetchJson({ method: 'POST', ...args })
  }
}
