import moment from 'moment';

export function normalizeTransactions(newTransactions, existingTransactions) {

  newTransactions.forEach(transaction => {
    const momentDate = moment(transaction.date);
    const month = momentDate.month() + 1; // jan = 0, add +1 to avoid head asploding
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
