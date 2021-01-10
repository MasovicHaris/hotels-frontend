import jwtDecode from 'jwt-decode';
import { call, put, takeLatest } from 'redux-saga/effects';

import cookiesHelper from '../../../core/helpers/cookies-helper';

import { handleLoginInProgress, handleLoginSuccess, handleSignupInProgress } from '../actions/auth-actions';
import { handleShowMessage } from '../../snackbar/actions/snackbar-actions';

import AuthApi from '../../../api/auth-api';

import { SNACKBAR_SEVERITY_VARIANTS } from '../../snackbar/constants/snackbar-constants';
import { AUTH_ACTIONS } from '../constants/auth-constants';

function* requestLogin({ email, password, history }) {
  try {
    yield put(handleLoginInProgress(true));

    const { data } = yield call(AuthApi.requestLogin, { email, password });

    const token = data;

    const { type, id } = jwtDecode(token);

    cookiesHelper.setCookie('token', token);

    yield put(handleLoginSuccess({ user: { type, id }, token }));

    history.push('/');
    yield put(handleShowMessage('Email sent for confirmation.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
  } catch (err) {
    console.log(err);
    yield put(handleShowMessage('Error logging in.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    yield put(handleLoginInProgress(false));
  }
}

function* requestSignup({ data, history }) {
  try {
    yield put(handleSignupInProgress(true));

    const dataToSend = {
      name: `${data.name} ${data.surname}`,
      email: data.email,
      password: data.password,
    };

    yield call(AuthApi.requestSignup, dataToSend);

    yield put(handleShowMessage('Successfully created an account.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
    history.push('/login');
  } catch (err) {
    yield put(handleShowMessage('Error creating account.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    yield put(handleSignupInProgress(false));
  }
}

export default function* saga() {
  yield takeLatest(AUTH_ACTIONS.HANDLE_LOGIN, requestLogin);
  yield takeLatest(AUTH_ACTIONS.HANDLE_SIGNUP, requestSignup);
}
