import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import {
  Container,
  // Checkbox,
  // Register,
  Login,
  // RegisterGroup,
  // InputGroup,
} from './styles.module.scss';

// import api from '../../api';
import Segment from '../Segment';

export default function ForgotPassword() {
  // const history = useHistory();
  const [values, setValues] = useState({
    eEmail: '',
  });

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  // async function _handleLogin(e) {
  //   e.preventDefault();
  //   const data = {
  //     email: values.eEmail,
  //     password: values.ePassword,
  //   };
  //   try {
  //     api.post('clients/logIn', data).then((response) => {
  //       if (response.status === 204) {
  //         localStorage.setItem('token', response.headers['x-access-token']);
  //         history.push('/my-account');
  //       }
  //     });
  //   } catch (error) {
  //     console.log('Error ->', error);
  //     store.addNotification({
  //       title: 'Ooops',
  //       message:
  //         'Houve um erro ao processar a sua requisição, confira as suas credencias e tente novamente',
  //       type: 'danger',
  //       insert: 'top',
  //       container: 'top-right',
  //       animationIn: ['animated', 'fadeIn'],
  //       animationOut: ['animated', 'fadeOut'],
  //       dismiss: {
  //         duration: 8000,
  //         onScreen: true,
  //       },
  //     });
  //   }
  // }

  // async function _handleRegister(e) {
  //   e.preventDefault();
  //   const data = {
  //     name: values.rName,
  //     surname: values.rSurname,
  //     displayname: values.rDisplayName,
  //     email: values.rEmail,
  //     phone: values.rPhone,
  //     password: values.rPassword,
  //   };

  //   if (values.rConfirmPassword !== values.rPassword) {
  //     store.addNotification({
  //       title: 'Ooops',
  //       message: 'As senhas devem ser iguais',
  //       type: 'danger',
  //       insert: 'top',
  //       container: 'top-right',
  //       animationIn: ['animated', 'fadeIn'],
  //       animationOut: ['animated', 'fadeOut'],
  //       dismiss: {
  //         duration: 8000,
  //         onScreen: true,
  //       },
  //     });

  //     return;
  //   }

  //   try {
  //     api.post('clients/signUp', data).then((response) => {
  //       if (response.status === 201) {
  //         localStorage.setItem('token', response.headers['x-access-token']);
  //         history.push('/my-account');
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function handleForgotPassword(event) {
    event.preventDefault();

    setTimeout(() => {
      store.addNotification({
        title: 'Email enviado',
        message:
          'Um email com as instruções de como recuperar a sua senha foi enviado!',
        type: 'success',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 8000,
          onScreen: true,
        },
      });
    }, 800);
  }

  return (
    <div className={Container}>
      <Segment name="Recuperar senha" />
      <h2>Recuperar senha</h2>

      <section>
        <div className={Login}>
          <form onSubmit={handleForgotPassword}>
            <label htmlFor="eEmail">Email</label>
            <input
              style={{ width: 500 }}
              type="email"
              required
              name="eEmail"
              value={values.eEmail}
              placeholder="Seu email de acesso"
              onChange={(e) => _handleChange(e)}
            />

            <button type="submit">Acessar</button>
          </form>
        </div>
      </section>
    </div>
  );
}
