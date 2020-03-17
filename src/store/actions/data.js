import { createAction } from "redux-actions";

export const SET_DATA = "SET_DATA";
export const SORT_DATA = "SORT_DATA";

export const setDataAction = createAction(SET_DATA);
export const sortDataAction = createAction(SORT_DATA);
