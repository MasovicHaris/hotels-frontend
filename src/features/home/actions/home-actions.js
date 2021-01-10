import cookiesHelper from '../../../core/helpers/cookies-helper';

import { HOME_ACTIONS } from '../constants/home-constants';

export const handleGetHotels = (query, sort, paging, history ) => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL,
  query,
  sort,
  paging,
  history
});

export const handleGetHotelsInProgress = status => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL_IN_PROGRESS,
  status,
});

export const handleGetHotelsSuccess = data => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL_SUCCESS,
  data,
});

export const handleGetReviews = (data) => ({
  type: HOME_ACTIONS.HANDLE_GET_REVIEWS,
  data
});

export const handleGetReviewsInProgress = status => ({
  type: HOME_ACTIONS.HANDLE_GET_REVIEWS_IN_PROGRESS,
  status,
});

export const handleGetReviewsSuccess = data => ({
  type: HOME_ACTIONS.HANDLE_GET_REVIEWS_SUCCESS,
  data,
});

export const handlePostReview = (author, rating, description, hotelID ) => ({
  type: HOME_ACTIONS.HANDLE_POST_REVIEW,
  author, rating, description, hotelID
});

export const handleGetHotel = (data) => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL1,
  data
});

export const handleGetHotelInProgress = status => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL1_IN_PROGRESS,
  status,
});

export const handleGetHotelSuccess = data => ({
  type: HOME_ACTIONS.HANDLE_GET_HOTEL1_SUCCESS,
  data,
});