import { all } from 'redux-saga/effects';

import authSagas from '../features/auth/sagas/auth-sagas';
import adminSagas from '../features/admin-page/sagas/admin-page-sagas';

export default function* rootSaga() {
  yield all([authSagas(), adminSagas()]);
}
