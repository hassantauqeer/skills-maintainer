import { createSelector } from 'reselect';

/**
 * Direct selector to the authorization state domain
 */
const selectAuthorizationDomain = (state) => state.get('authorization');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Authorization
 */

const makeSelectAuthorization = () => createSelector(
  selectAuthorizationDomain,
  (substate) => substate.toJS()
);

export default makeSelectAuthorization;
export {
  selectAuthorizationDomain,
};
