import React from 'react'

import {setStatics, getData} from './data'
import { connect } from "react-redux";
import { sortDataAction } from "../store/actions/data";
import Table from "./Main";

// const value = <div><input type='checkbox' checked={true}/></div>;
const sort = (onSort, getArr, tableFilter, searchList, boolean, inputValue) => dispatch => {
  let statics = [].concat(getData);
  if (boolean) {
    statics = statics.filter((el) => el[4] === 'true');
  }
  if (searchList !== null) {
    statics = statics.filter((el) => {
      let flag = false;
      searchList.forEach((i) => {
        if (el[i].toLowerCase().indexOf(tableFilter.toLowerCase().trim()) !== -1) {
          flag = true;
          return;
        };
      })
      return flag;
    });
  }
  if (onSort.position.length !== 3) {
    statics = statics.filter((arr) => {
      return onSort.position.some((el) => arr[5] === el);
    });
  }
  let rendColumnIndex = null;
  for (let columnIndex of getArr) {
    const column = Object.keys(onSort)[columnIndex];
    if (rendColumnIndex === null) {
      if (typeof onSort[column] !== "object") {
        switch (onSort[column]) {
          case 1:
            statics.sort((a, b) =>
              a[getArr[0]] > b[getArr[0]] ? 1 : -1
            );
            break;
          case 2:
            statics.sort((a, b) =>
              a[getArr[0]] > b[getArr[0]] ? -1 : 1
            );
            break;
          default:
            break;
        }
      }
    } else {
      const rendColumnIndex2 = rendColumnIndex;
      if (typeof onSort[column] !== "object") {
        switch (onSort[column]) {
          case 1:
            statics.sort((a, b) => {
              if (a[rendColumnIndex2] !== b[rendColumnIndex2]) {
                return 0;
              }
              return a[columnIndex] > b[columnIndex] ? 1 : -1;
            });
            break;
          case 2:
            statics.sort((a, b) => {
              if (a[rendColumnIndex2] !== b[rendColumnIndex2]) {
                return 0;
              }
              return a[columnIndex] > b[columnIndex] ? -1 : 1;
            });
            break;
          default:
            break;
        }
      }
    }
    rendColumnIndex = columnIndex;
  }
  dispatch(sortDataAction(statics));
};

function setMapTable(store) {
  return {
    statics: store.statics.statics
  };
}

function setMapDispatch(dispatch) {
  return {
    setStaticsInfo: () => {
      dispatch(setStatics());
    },
    sortStaticsInfo: (onSort, getArr, tableFilter, searchList, boolean, inputValue) => {
      dispatch(sort(onSort, getArr, tableFilter, searchList, boolean, inputValue));
    }
  };
}

export default connect(setMapTable, setMapDispatch)(Table);
