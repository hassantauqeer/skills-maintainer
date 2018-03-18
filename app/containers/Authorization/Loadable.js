/**
 *
 * Asynchronously loads the component for Authorization
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
