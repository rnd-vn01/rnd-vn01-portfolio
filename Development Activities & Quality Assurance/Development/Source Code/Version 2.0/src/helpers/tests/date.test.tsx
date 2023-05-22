import { faker } from '@faker-js/faker';
import {
  getCurrentDateShortString,
  getCurrentDateTimeFullString,
  getMonday,
  getMonthNameFromIndex,
  getShortMonthNameFromIndex,
  getWeekNumber
} from 'src/helpers/date';

test("getCurrentDateTimeFullString", () => {
  const randomDate = faker.date.past()

  //Format hours
  let hourReminder = randomDate.getHours() % 12;
  let stringHourReminder = "";
  if (hourReminder === 0)
    stringHourReminder = "12"
  else
    stringHourReminder = hourReminder < 10 ? "0" + hourReminder.toString() : hourReminder.toString()

  const dateInfo = {
    date: randomDate.getDate() < 10 ? "0" + randomDate.getDate().toString() : randomDate.getDate(),
    month: randomDate.getMonth() + 1 < 10 ? "0" + (randomDate.getMonth() + 1).toString() : randomDate.getMonth() + 1,
    year: randomDate.getFullYear(),
    hour: stringHourReminder,
    minute: randomDate.getMinutes() < 10 ? "0" + randomDate.getMinutes().toString() : randomDate.getMinutes()
  }

  expect(getCurrentDateTimeFullString(randomDate))
    .toBe(`${dateInfo.date}/${dateInfo.month}/${dateInfo.year} ${dateInfo.hour}:${dateInfo.minute}`)
})

test("getCurrentDateShortString", () => {
  const randomDate = faker.date.past()
  const dateInfo = {
    date: randomDate.getDate() < 10 ? "0" + randomDate.getDate().toString() : randomDate.getDate(),
    month: randomDate.getMonth() + 1 < 10 ? "0" + (randomDate.getMonth() + 1).toString() : randomDate.getMonth() + 1,
  }

  expect(getCurrentDateShortString(randomDate))
    .toBe(`${dateInfo.date}/${dateInfo.month}`)
})

test("getMonthNameFromIndex", () => {
  let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  array.forEach((month, index) => {
    expect(getMonthNameFromIndex(index)).toBe(month)
  })
})

test("getShortMonthNameFromIndex", () => {
  let array = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

  array.forEach((month, index) => {
    expect(getShortMonthNameFromIndex(index)).toBe(month.substring(0, 3))
  })
})

test("getWeekNumber", () => {
  const date = new Date(2023, 0, 4)
  expect(getWeekNumber(date)).toBe(1)
})

test("getMonday", () => {
  const date = new Date(2023, 0, 4)
  const monday = getMonday(date)
  expect(monday.getDate()).toBe(2)
  expect(monday.getMonth()).toBe(0)
  expect(monday.getFullYear()).toBe(2023)
})

test("getMonday of a date where monday is of previous month or year", () => {
  const date = new Date(2023, 0, 1)
  const monday = getMonday(date)
  expect(monday.getDate()).toBe(26)
  expect(monday.getMonth()).toBe(11)
  expect(monday.getFullYear()).toBe(2022)
})
