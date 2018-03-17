import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HomePage
 */

const linkedInConnData = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('linkedInConnData')
);

export {
  linkedInConnData,
};
