import jwtDecode from 'jwt-decode';
import { call, put, takeLatest } from 'redux-saga/effects';

import cookiesHelper from '../../../core/helpers/cookies-helper';

import { handleGetHotels, handleGetHotelsInProgress, handleGetHotelsSuccess, handleGetReviewsInProgress, handleGetReviewsSuccess, handleGetHotelInProgress, handleGetHotelSuccess, handleGetHotel } from '../actions/home-actions';
import { handleShowMessage } from '../../snackbar/actions/snackbar-actions';

import HomeApi from '../../../api/home-api';

import { SNACKBAR_SEVERITY_VARIANTS } from '../../snackbar/constants/snackbar-constants';
import { HOME_ACTIONS } from '../constants/home-constants';

function* requestGetHotels({ query, sort, paging, history }) {
  try {
    yield put(handleGetHotelsInProgress(true));

    const dataToSend = {
      query: query,
      sort: sort,
      paging: paging,
    };

    const res = yield call(HomeApi.requestGetHotels, dataToSend);

    yield put(handleGetHotelsSuccess(res.data));
    history.push('/home');
  } catch (err) {
    console.log(err);
    yield put(handleShowMessage('Error getting hotels.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    //yield put(handleGetHotelsInProgress(false));
  }
}

function* requestGetReviews({data}) {
  try {
    yield put(handleGetReviewsInProgress(true));
    const res = yield call(HomeApi.requestGetReviews, data);
    console.log(res);
    yield put(handleGetReviewsSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(handleShowMessage('Error getting reviews.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    //yield put(handleGetReviewsInProgress(false));
  }
}

function* requestPostReview({author, rating, description, hotelID }) {
  try {
    yield put(handleGetReviewsInProgress(true));

    const dataToSend = {
      author: author,
      rating: rating,
      description: description,
      hotelID: hotelID
    };

    const res = yield call(HomeApi.requestPostReview, dataToSend);
    yield put(handleGetReviewsSuccess(res.data));
    yield put(handleShowMessage('Successfully created a review.', SNACKBAR_SEVERITY_VARIANTS.SUCCESS));
    
    if(description=="" || description==null) {
    yield put(handleShowMessage('Review is not allowed to be empty.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
    }
  } catch (err) {
    console.log(err);
    yield put(handleShowMessage('Error posting review.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    //yield put(handleGetReviewsInProgress(false));
  }
}

function* requestGetCurrentHotel({data}) {
  try {
    yield put(handleGetHotelInProgress(true));
    const res = yield call(HomeApi.requestGetHotel, data);
    yield put(handleGetHotelSuccess(res.data));
  } catch (err) {
    console.log(err);
    yield put(handleShowMessage('Error getting hotel.', SNACKBAR_SEVERITY_VARIANTS.ERROR));
  } finally {
    //yield put(handleGetReviewsInProgress(false));
  }
}

export default function* saga() {
  yield takeLatest(HOME_ACTIONS.HANDLE_GET_HOTEL, requestGetHotels);
  yield takeLatest(HOME_ACTIONS.HANDLE_GET_REVIEWS, requestGetReviews);
  yield takeLatest(HOME_ACTIONS.HANDLE_POST_REVIEW, requestPostReview);
  yield takeLatest(HOME_ACTIONS.HANDLE_GET_HOTEL1, requestGetCurrentHotel);
}
