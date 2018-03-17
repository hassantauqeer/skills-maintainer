/*
 *
 * HomePage actions
 *
 */

import {
  JOIN_LINKEDIN, SAVE_CONNECTION_DATA
} from './constants';

export function joinLinkedIn() {
  return {
    type: JOIN_LINKEDIN,
  };
}

export function saveLinkedConnection(val) {
  return {
    type: SAVE_CONNECTION_DATA,
    val
  };
}
