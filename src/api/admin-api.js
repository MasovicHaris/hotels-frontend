import axios from '../config/axios-config';

const requestCreateHotel = data => {
    return axios({
        method: 'POST',
        url: '/hotels',
        data
    });
}


export default {
    requestCreateHotel,
  };
  