import * as types from '../actions/actionTypes';
import initialState from './initialState';

const activityReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case types.LOAD_ACTIVITIES_SUCCESS:
      const obj = { ...state, activities: payload.activities };
      return obj;
    default:
      return state;
  }
}

export default activityReducer;