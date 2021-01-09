import { call, put, takeLatest } from 'redux-saga/effects';

import AdminApi from '../../../api/admin-api';

import { handleCreateHotelInProgress, handleCreateHotelSuccess } from '../actions/admin-page-actions';
import { handleShowMessage } from '../../snackbar/actions/snackbar-actions';

import { ADMIN_ACTIONS } from '../constants/admin-page-constants';
import { SNACKBAR_SEVERITY_VARIANTS } from '../../snackbar/constants/snackbar-constants';


function* requestCreateHotel({name, address, description}) {
    try {
        yield put(handleCreateHotelInProgress(true));

        const { data } = yield call(AdminApi.requestCreateHotel, { name, address, description, lat: 35.922457,
        long: 14.493488 });

        yield put(handleCreateHotelSuccess(data));

    }
    catch (err) {
        yield put(handleShowMessage('Error while creating new hotel.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
    }
    finally {
        yield put(handleCreateHotelInProgress(false));
    }
}

export default function* saga() {
    yield takeLatest(ADMIN_ACTIONS.HANDLE_CREATE_HOTEL, requestCreateHotel);
}