import { ADMIN_ACTIONS } from '../constants/admin-page-constants';

export const handleCreateHotel = (name, address, description) => ({
    type: ADMIN_ACTIONS.HANDLE_CREATE_HOTEL,
    name,
    address,
    description,
});

export const handleCreateHotelInProgress = status => ({
    type: ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_IN_PROGRESS,
    status,
});

export const handleCreateHotelSuccess = data => ({
    type: ADMIN_ACTIONS.HANDLE_CREATE_HOTEL_SUCCESS,
    data
});