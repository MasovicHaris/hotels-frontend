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

export default {
  requestGetHotels,
  requestGetReviews,
  requestPostReview,
  requestGetHotel
};
