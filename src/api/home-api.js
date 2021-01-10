import axios from '../config/axios-config';

const requestGetHotels = data => {
  return axios({
    method: 'POST',
    url: '/hotels/search',
    data
  });
};

const requestGetReviews = hotelId => {
  return axios({
    method: 'GET',
    url: `/review-per-hotel/${hotelId}`
  });
};

const requestPostReview = data => {
  return axios({
    method: 'POST',
    url: '/review',
    data
  });
};

const requestGetHotel = hotelId => {
  return axios({
    method: 'GET',
    url: `/hotels/${hotelId}`
  });
};

const requestLikeReview = revlId => {
  return axios({
    method: 'POST',
    url: `/review/${revlId}/like`
  });
};

const requestDislikeReview = revlId => {
  return axios({
    method: 'POST',
    url: `/review/${revlId}/dislike`
  });
};

export default {
  requestGetHotels,
  requestGetReviews,
  requestPostReview,
  requestGetHotel,
  requestLikeReview,
  requestDislikeReview,
};
