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

export function sortTransactions(transactions, sortBy, direction) {
  return Object.values(transactions).sort((t1, t2) => {
    return direction === 'asc' ? t1[sortBy] - t2[sortBy] : t2[sortBy] - t1[sortBy]
  });
}
