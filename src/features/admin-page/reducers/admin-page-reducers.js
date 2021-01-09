import cacheHelper from '../../../core/helpers/cookies-helper';

import { ADMIN_ACTIONS } from '../constants/admin-page-constants';

const getAdminInitialState = () => {
    const token = cacheHelper.getCookie('token');
  
    return {
      userLoggedIn: token ? true : false,
      createInProgress: false,
      token,
      user: {
        id: null,
        type: null,
      },
    };
  };


export const admin = (state = getAdminInitialState(), action) => {
    console.log(action);
    switch (action.type) {
        case ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_IN_PROGRESS:
            return {...state, createInProgress: action.status};
        case ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_SUCCESS:
            console.log(action.data)
        default:
            return state;
    }
};