import { ADMIN_ACTIONS } from '../constants/admin-page-constants';

const getAdminInitialState = () => {
    return {
      createInProgress: false,
      editInProgress: false,
    };
  };


export const admin = (state = getAdminInitialState(), action) => {
    switch (action.type) {
        case ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_IN_PROGRESS:
            return {...state, createInProgress: action.status};
        case ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_SUCCESS:
            return state;
        case ADMIN_ACTIONS.HANDLE_DELETE_HOTEL_IN_PROGRESS:
            return {...state, createInProgress: action.status};
        case ADMIN_ACTIONS.HANDLE_DELETE_HOTEL_SUCCESS:
            return state;
        case ADMIN_ACTIONS.HANDLE_EDIT_HOTEL_IN_PROGRESS:
            return {...state, editInProgress: action.status};
        case ADMIN_ACTIONS.HANDLE_EDIT_HOTEL_SUCCESS:
            return state;
        default:
            return state;
    }
};