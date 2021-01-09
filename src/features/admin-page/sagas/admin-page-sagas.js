import { call, put, takeLatest } from 'redux-saga/effects';

import AdminApi from '../../../api/admin-api';

import { handleCreateHotelInProgress, handleCreateHotelSuccess, handleDeleteHotelInProgress, handleDeleteHotelSuccess, handleEditHotelInProgress, handleEditHotelSuccess} from '../actions/admin-page-actions';
import { handleShowMessage } from '../../snackbar/actions/snackbar-actions';

import { ADMIN_ACTIONS } from '../constants/admin-page-constants';
import { SNACKBAR_SEVERITY_VARIANTS } from '../../snackbar/constants/snackbar-constants';


function* requestCreateHotel({name, address, description}) {
    try {
        yield put(handleCreateHotelInProgress(true));

        const { data } = yield call(AdminApi.requestCreateHotel, { name, address, description, lat: 35.922457,
        long: 14.493488 });

        yield put(handleShowMessage('Successfully created new hotel.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
        yield put(handleCreateHotelSuccess(data));

    }
    catch (err) {
        yield put(handleShowMessage('Error while creating new hotel.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
    }
    finally {
        yield put(handleCreateHotelInProgress(false));
    }
}

function* requestDeleteHotel({id}) {
    try {
        yield put(handleDeleteHotelInProgress(true));

        const { data } = yield call(AdminApi.requestDeleteHotel, id);
        console.log(data);
        yield put(handleShowMessage('Successfully deleted hotel.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
        yield put(handleDeleteHotelSuccess(data));
    }
    catch (err) {
        yield put(handleShowMessage('Error while deleting hotel.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
    }
    finally {
        yield put(handleDeleteHotelInProgress(false));
    }
}

function* requestEditHotel({name, address, description, id}) {
    try {
        yield put(handleEditHotelInProgress(true));

        const { data } = yield call(AdminApi.requestEditHotel, { name, address, description}, id);

        yield put(handleShowMessage('Successfully updated hotel.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
        yield put(handleEditHotelSuccess(data));

    }
    catch (err) {
        yield put(handleShowMessage('Error while updating hotel.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
    }
    finally {
        yield put(handleEditHotelInProgress(false));
    }
}

export default function* saga() {
    yield takeLatest(ADMIN_ACTIONS.HANDLE_CREATE_HOTEL, requestCreateHotel);
    yield takeLatest(ADMIN_ACTIONS.HANDLE_DELETE_HOTEL, requestDeleteHotel);
    yield takeLatest(ADMIN_ACTIONS.HANDLE_EDIT_HOTEL, requestEditHotel);
}