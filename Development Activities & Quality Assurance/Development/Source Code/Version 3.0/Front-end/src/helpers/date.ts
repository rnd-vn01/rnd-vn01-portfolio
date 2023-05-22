import moment from 'moment';

export const getCurrentDateTimeFullString = (date: Date) => {
  return moment(date).format('DD/MM/YYYY hh:mm');
};

export const getCurrentDateFullString = (date: Date) => {
  return moment(date).format('DD/MM/YYYY');
};

export const getCurrentDateShortString = (date: Date) => {
  return moment(date).format('DD/MM');
};

export const getMonthNameFromIndex = (i: number) => {
  let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];
  return array[i];
}

export const getShortMonthNameFromIndex = (i: number) => {
  let array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec"];
  return array[i];
}

export const getTimeText = (date: Date) => {
  return moment(date).format('HH:mm');
}

export const getInputDateFormat = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
}

export const getMidnight = (date: Date) => {
  let result = new Date(date.getTime())
  result.setHours(0, 0, 0, 0);
  return result;
}

export const getWeekNumber = (date: Date) => {
  let cloneDate = new Date(date.getTime())
  return moment(getMonday(cloneDate)).isoWeek();
}

export const getMonday = (d: Date) => {
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1);

  let dateToReturn = new Date(d.setDate(diff));
  dateToReturn.setHours(0);
  dateToReturn.setMinutes(0);
  dateToReturn.setSeconds(0);

  return dateToReturn;
}

export const getSunday = (d: Date) => {
  let sunday = moment(d).endOf('week').add(1, "days").toDate()
  sunday.setHours(23);
  sunday.setMinutes(59);
  sunday.setSeconds(59);

  return sunday
}
