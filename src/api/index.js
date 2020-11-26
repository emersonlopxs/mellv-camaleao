import axios from 'axios';
import { store } from 'react-notifications-component';



const base = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 6000,
});

// Setting defaults
base.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Handling errors
base.interceptors.response.use(
  (response) => {
    // response.message = 'There was an error processing your request ...'
    if (response.status === 200) {
      response.message = response.data.message;
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      error.message = 'There was an error connecting to the server';
      store.addNotification({
        title: 'Ooops',
        message: 'Houve um erro ao processar a sua requisição!',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 8000,
          onScreen: true,
        },
      });
    } else if (error.response.data.error) {
      error.message = error.response;
      console.log('error message ->', error.response);

      store.addNotification({
        title: 'Ooops',
        message: 'Houve um erro ao processar a sua requisição!',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 8000,
          onScreen: true,
        },
      });
    } else {
      error.message = 'There was an error processing your request';
      store.addNotification({
        title: 'Ooops',
        message: 'Houve um erro ao processar a sua requisição!',
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 8000,
          onScreen: true,
        },
      });
    }
    return Promise.reject(error);
  }
);

export default base;
