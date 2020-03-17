import React from 'react'

import Faker from "faker";
import { setDataAction } from "../store/actions/data";

export let getData = [];
const randomInteger = (min, max) => {
  let getRandom = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(getRandom);
};
const value = <div><input type='checkbox' checked={true}/></div>;
export const setStatics = () => dispatch => {
  for (let i = 0; i < 150; i++) {
    getData.push([
      Faker.address.country(),
      Faker.company.companyName(),
      Faker.commerce.productMaterial(),
      Faker.phone.phoneNumberFormat(),
      Faker.random.boolean().toString(),
      ["Small", "Average", "High"][randomInteger(0, 2)],
      Faker.commerce.price(),
      value,
    ]);
  }
  dispatch(setDataAction(getData));
};
