import moment from 'moment';

export function normalizeTransactions(newTransactions, existingTransactions) {

  newTransactions?.forEach(transaction => {
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

  const sort = (t1, t2) => {
    if (typeof t1[sortBy] === 'string') {
      if (direction === 'asc') {
        return (t1[sortBy] > t2[sortBy]) ? 1 : -1;
      }
      else {
        return (t2[sortBy] > t1[sortBy]) ? 1 : -1;
      }
    }

    return direction === 'asc' ? t1[sortBy] - t2[sortBy] : t2[sortBy] - t1[sortBy];
  }

  return Object.values(transactions).sort(sort); //(t1, t2) => {
  //   console.log('t1[sortBy], t2[sortBy]:', t1[sortBy], t2[sortBy]);
  //   return direction === 'asc' ? t1[sortBy] - t2[sortBy] : t2[sortBy] - t1[sortBy]
  // });
}

// return previous month in { year, date } format: 
export function previousMonth(date = null) {
  return changeMonth(date, 'substract');
}

export function nextMonth(date = null) {
  return changeMonth(date, 'add');
}

export function changeMonth(date = null, direction) {

  let momentDate = date ? moment(date) : moment();

  if (momentDate.isValid()) {
    momentDate = direction === 'substract' ? momentDate.subtract(1, 'month') : momentDate.add(1, 'month');
    return { month: momentDate.month() + 1, year: momentDate.year() }
  }

  return null;

}