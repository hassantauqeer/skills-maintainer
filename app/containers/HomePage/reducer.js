/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_CONNECTION_DATA
} from './constants';

const initialState = fromJS({
  linkedInConnData: ''
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CONNECTION_DATA:
      console.log(action.val)
      return state.set('linkedInConnData', action.val);
    default:
      return state;
  }
}

export default homePageReducer;
