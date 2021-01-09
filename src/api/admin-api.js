import axios from '../config/axios-config';

const requestCreateHotel = data => {
    return axios({
        method: 'POST',
        url: '/hotels',
        data
    });
}

const requestDeleteHotel = id => {
    return axios({
        method: 'DELETE',
        url: '/hotels/'+ id
    });
}

const requestEditHotel = (data, id) => {
    return axios({
        method: 'PATCH',
        url: '/hotels/'+ id,
        data
    })
}

export default {
    requestCreateHotel,
    requestDeleteHotel,
    requestEditHotel
  };
  