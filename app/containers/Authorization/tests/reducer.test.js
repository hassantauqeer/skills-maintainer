
import { fromJS } from 'immutable';
import authorizationReducer from '../reducer';

describe('authorizationReducer', () => {
  it('returns the initial state', () => {
    expect(authorizationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
