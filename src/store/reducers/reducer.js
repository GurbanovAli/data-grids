import { SET_DATA, SORT_DATA } from "../actions";

const initialState = {
  statics: []
};

export default function staticsInfo(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DATA:
      return { ...state, statics: payload };
    case SORT_DATA:
      return { ...state, statics: [].concat(payload) };
    default:
      return state;
  }
}
