import { parseAmount } from "../currencyUtil";

describe('parseAmount', () => {

  it("parses: '100 twd' as { '100', 'twd' }", () => {
    expect(parseAmount('100 twd')).toEqual({ amount: 100, currency: 'twd' })
  });

  it("parses: 'eur50.30' as { '50.3', 'euro' }", () => {
    expect(parseAmount('euro50.30')).toEqual({ amount: 50.3, currency: 'eur' })
  });

  it("parses: '$100EUR' as { '100', 'usd' } (first currency matched)", () => {
    expect(parseAmount('$100EUR')).toEqual({ amount: 100, currency: 'usd' })
  });

  it("parses: '13000円' as { '13000', 'jpy' } (first currency matched", () => {
    expect(parseAmount('13000円')).toEqual({ amount: 13000, currency: 'jpy' })
  });

  // TO DO (or no to do...) parse full-width numbers (japanese/chinese):
  // it("parses: '５０.３円' as { '50.3', 'jpy' }", () => {
  //   expect(parseAmount('５０.３円')).toEqual({ amount: 50.3, currency: 'jpy' })
  // });

});

/*
console.log(parseAmount('100.50 twd'));
console.log(parseAmount('100.50 円'));
console.log(parseAmount('15000￥'));
console.log(parseAmount('nt 150'));
console.log(parseAmount('300euros'));
*/
