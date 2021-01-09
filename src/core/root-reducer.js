import { combineReducers } from 'redux';

import { auth } from '../features/auth/reducers/auth-reducers';
import { snackbar } from '../features/snackbar/reducers/snackbar-reducers';
import { admin } from '../features/admin-page/reducers/admin-page-reducers';

const appReducer = combineReducers({
  auth,
  snackbar,
  admin
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
