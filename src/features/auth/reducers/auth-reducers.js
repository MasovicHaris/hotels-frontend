import cacheHelper from '../../../core/helpers/cookies-helper';
import jwtDecode from 'jwt-decode';

import { AUTH_ACTIONS } from '../constants/auth-constants';

const getAuthInitialState = () => {
  let token = cacheHelper.getCookie('token');
  let data;
  if (token) {
    try {
      data = jwtDecode(token);
    }
    catch(err) {
      token = null;
    }
  }


  return {
    userLoggedIn: token ? true : false,
    loginInProgress: false,
    signupInProgress: false,
    token,
    user: {
      id: data && data.id ? data.id : null,
      type: data && data.type ? data.type : null,
    },
  };
};

export const auth = (state = getAuthInitialState(), action) => {
  switch (action.type) {
    case AUTH_ACTIONS.HANDLE_LOGIN_IN_PROGRESS:
      return { ...state, loginInProgress: action.status };
    case AUTH_ACTIONS.HANDLE_LOGIN_SUCCESS:
      const { user, token } = action.data;
      return { ...state, user, token, userLoggedIn: true };
    case AUTH_ACTIONS.HANDLE_SIGNUP_IN_PROGRESS:
      return { ...state, signupInProgress: action.status };
    case AUTH_ACTIONS.HANDLE_LOGOUT:
      return getAuthInitialState();
    default:
      return state;
  }
};
