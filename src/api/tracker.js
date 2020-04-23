import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
  baseURL: 'http://367f0727.ngrok.io'
});

// telling axios to run these functions before making a request
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;