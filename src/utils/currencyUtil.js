export const MAIN_CURRENCY = 'usd';

export const CURRENCIES = {
  'usd' : "$",
  'twd' : "NT",
  'crc' : "₡",
  'eur' : "€",
};

const CURRENCY_ALIASES = {
  'usd' : [ 'us', '$', 'dollar' ],
  'twd' : [ 'nt', 'ntd' ],
  'crc' : [ 'colones', 'colon', 'colón' ],
  'eur' : [ 'euro', '€', 'euros'],
  'jpy' : [ 'yen', '￥', '円'],
};

// Creates a quick look-up dictionary for currencies in the shape: { [alias]: currency }, IE:
// {
//   'us'  : 'usd',
//   '$'   : 'usd',
//   'nt'  : 'twd',
//   'ntd' : 'twd',
//   ...
// }
export const CURRENCY_LOOKUP = (function createAliases() {

  const aliases = {};

  Object.entries(CURRENCY_ALIASES).forEach(([currency, alias]) => {
    aliases[currency] = currency;
    alias.forEach(alias => aliases[alias] = currency);
  });

  return aliases;
})();

// Receives a string and parses the number amount and if a currency (or alias) is used.
// TODO: for now, it's only parsing based on the US format, other valid formats
// 12,50,00,000 rupee / 1 000 rub / 1.300,50 colones etc/etc/
// -> try currency.js / dinero.js / walletjs

export function parseAmount(value) {
  
  // digits, colons, and periods will get replaced by a white-space and then split:
  const currencyAlias = value.replace(/[\d,.]/g, ' ').split(/\s/g).find(searchString => {
    const possibleCurrency = searchString.trim();
    return (possibleCurrency.length > 0 && CURRENCY_LOOKUP[possibleCurrency]);
  });

  const amount = parseFloat(currencyAlias ? value.replace(currencyAlias, ' ') : value);
  const currency = currencyAlias ? CURRENCY_LOOKUP[currencyAlias] : null;

  return { amount, currency };
}
