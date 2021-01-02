import axios from '../config/axios-config';

const requestLogin = data => {
  return axios({
    method: 'POST',
    url: '/login',
    data,
  });
};

const requestSignup = data => {
  return axios({
    method: 'POST',
    url: '/register',
    data,
  });
};

export default {
  requestLogin,
  requestSignup
};
