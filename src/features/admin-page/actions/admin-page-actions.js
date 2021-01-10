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

export const handleEditHotel = (name, address, description, id) => ({
    type: ADMIN_ACTIONS.HANDLE_EDIT_HOTEL,
    name,
    address,
    description,
    id
});

export const handleEditHotelInProgress = status => ({
    type: ADMIN_ACTIONS.HANDLE_EDIT_HOTEL_IN_PROGRESS,
    status,
});

export const handleEditHotelSuccess = data => ({
    type: ADMIN_ACTIONS.HANDLE_EDIT_HOTEL_SUCCESS,
    data
});

export const handleDeleteHotel = id => ({
    type: ADMIN_ACTIONS.HANDLE_DELETE_HOTEL,
    id
})

export const handleDeleteHotelInProgress = status => ({
    type: ADMIN_ACTIONS.HANDLE_DELETE_HOTEL_IN_PROGRESS,
    status,
});

export const handleDeleteHotelSuccess = id => ({
    type: ADMIN_ACTIONS.HANDLE_DELETE_HOTEL_SUCCESS,
    id
});

export const handleEditClicked = () => ({
    type: ADMIN_ACTIONS.HANDLE_EDIT_CLICKED
})