import cacheHelper from '../../../core/helpers/cookies-helper';

import { HOME_ACTIONS } from '../constants/home-constants';

const getHotelsInitialState = () => {
  return {
    hotelsInProgress: false,
    hotels: {
      data: [
        {
        _id: null,
        rating: null,
        name: null
        }
      ]
    },
    reviewsInProgress: false,
    reviews: [
      {
        _id: null,
        likes: null,
        dislikes: null,
        author: null,
        rating: null,
        hotelId: null
        }
    ],
    currentHotelInProgress: false,
    currentHotel: 
        {
        _id: null,
        rating: null,
        name: null,
        description: null
    },
  };
};

export const hotels = (state = getHotelsInitialState(), action) => {
  switch (action.type) {
    case HOME_ACTIONS.HANDLE_GET_HOTEL_IN_PROGRESS:
      return { ...state, hotelsInProgress: action.status };
    case HOME_ACTIONS.HANDLE_GET_HOTEL_SUCCESS:
      return { ...state, hotels: action.data };
    case HOME_ACTIONS.HANDLE_GET_HOTEL:
      return getHotelsInitialState();

    case HOME_ACTIONS.HANDLE_GET_REVIEWS_IN_PROGRESS:
      return { ...state, reviewsInProgress: action.status };
    case HOME_ACTIONS.HANDLE_GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.data };

    case HOME_ACTIONS.HANDLE_GET_REVIEWS:
      return getHotelsInitialState();

    case HOME_ACTIONS.HANDLE_GET_HOTEL1_IN_PROGRESS:
      return { ...state, currentHotelInProgress: action.status };
    case HOME_ACTIONS.HANDLE_GET_HOTEL1_SUCCESS:
      return { ...state, currentHotel: action.data };
    case HOME_ACTIONS.HANDLE_GET_HOTEL1:
      return getHotelsInitialState();

    default:
      return state;
  }
};
