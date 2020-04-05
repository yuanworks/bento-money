import moment from 'moment';

export function normalizeTransactions(newTransactions, existingTransactions) {

  newTransactions.forEach(transaction => {
    const momentDate = moment(transaction.date);
    const month = momentDate.month() + 1; // moment.month(jan) = 0
    const year = momentDate.year();

    if (!existingTransactions[year]) {
      existingTransactions[year] = {};
    }
    
    existingTransactions[year][month] = {
      ...existingTransactions[year][month],
      [transaction.id]: transaction,
    };
  });

  return existingTransactions;
}
