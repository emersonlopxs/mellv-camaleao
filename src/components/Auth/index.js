import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { store } from 'react-notifications-component';

import {
  Container,
  Checkbox,
  Register,
  Login,
  RegisterGroup,
  InputGroup,
} from './styles.module.scss';

import api from '../../api';
import Segment from '../Segment';

export default function Auth() {
  const history = useHistory();
  const [values, setValues] = useState({
    eEmail: '',
    ePassword: '',
    rName: '',
    rSurname: '',
    rDisplayName: '',
    rEmail: '',
    rPhone: '',
    rPassword: '',
    rConfirmPassword: '',
  });

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function _handleLogin(e) {
    e.preventDefault();
    const data = {
      email: values.eEmail,
      password: values.ePassword,
    };
    try {
      api.post('clients/logIn', data).then((response) => {
        if (response.status === 204) {
          localStorage.setItem('token', response.headers['x-access-token']);
          history.push('/my-account');
        }
      });
    } catch (error) {
      console.log('Error ->', error);
      store.addNotification({
        title: 'Ooops',
        message:
          'Houve um erro ao processar a sua requisição, confira as suas credencias e tente novamente',
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
  }

  async function _handleRegister(e) {
    e.preventDefault();
    const data = {
      name: values.rName,
      surname: values.rSurname,
      displayname: values.rDisplayName,
      email: values.rEmail,
      phone: values.rPhone,
      password: values.rPassword,
    };

    if (values.rConfirmPassword !== values.rPassword) {
      store.addNotification({
        title: 'Ooops',
        message: 'As senhas devem ser iguais',
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

      return;
    }

    try {
      api.post('clients/signUp', data).then((response) => {
        if (response.status === 201) {
          localStorage.setItem('token', response.headers['x-access-token']);
          history.push('/my-account');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={Container}>
      <Segment name="Minha Conta" />
      <h2>Minha Conta</h2>

      <section>
        <div className={Login}>
          <h3>Entrar</h3>
          <form onSubmit={_handleLogin}>
            <label htmlFor="eEmail">Email</label>
            <input
              type="email"
              required
              name="eEmail"
              value={values.eEmail}
              placeholder="Seu email de acesso"
              onChange={(e) => _handleChange(e)}
            />

            <label htmlFor="ePassword">Senha</label>
            <input
              type="password"
              required
              name="ePassword"
              value={values.ePassword}
              placeholder="Sua senha de acesso"
              onChange={(e) => _handleChange(e)}
            />

            <div className={Checkbox}>
              <input type="checkbox" name="" id="" />
              <label htmlFor="">Lembre-me</label>
            </div>

            <button type="submit">Acessar</button>

            <Link to="/forgot-password">Perdeu sua senha?</Link>
          </form>
        </div>

        <div className={Register}>
          <h3>Registrar</h3>
          <form onSubmit={_handleRegister}>
            <div className={RegisterGroup}>
              <div className={InputGroup}>
                <label htmlFor="rName">Nome</label>
                <input
                  type="text"
                  required
                  name="rName"
                  value={values.rName}
                  placeholder="Seu nome"
                  onChange={(e) => _handleChange(e)}
                />
              </div>
              <div className={InputGroup}>
                <label htmlFor="rSurname">Sobrenome</label>
                <input
                  type="text"
                  required
                  name="rSurname"
                  value={values.rSurname}
                  placeholder="Seu sobrenome"
                  onChange={(e) => _handleChange(e)}
                />
              </div>
            </div>
            <div className={InputGroup}>
              <label htmlFor="rDisplayName">Nome de exibição</label>
              <input
                type="text"
                required
                name="rDisplayName"
                value={values.rDisplayName}
                placeholder="Nome será exibido na seção da conta e nos comentários"
                onChange={(e) => _handleChange(e)}
              />
            </div>
            <div className={InputGroup}>
              <label htmlFor="rEmail">Email</label>
              <input
                type="email"
                required
                name="rEmail"
                value={values.rEmail}
                placeholder="Seu email para contato"
                onChange={(e) => _handleChange(e)}
              />
            </div>
            <div className={InputGroup}>
              <label htmlFor="rEmail">Celular</label>
              <input
                type="text"
                required
                name="rPhone"
                value={values.rPhone}
                placeholder="Seu número de celular para contato"
                maxLength={20}
                onChange={(e) => _handleChange(e)}
              />
            </div>
            <div className={InputGroup}>
              <label htmlFor="rPassword">Senha</label>
              <input
                type="password"
                required
                name="rPassword"
                value={values.rPassword}
                placeholder="Sua senha de acesso"
                onChange={(e) => _handleChange(e)}
              />
            </div>
            <div className={InputGroup}>
              <label htmlFor="rConfirmPassword">Confirmar senha</label>
              <input
                type="password"
                required
                name="rConfirmPassword"
                value={values.rConfirmPassword}
                placeholder="Confirme sua senha de acesso digitada anteriormente"
                onChange={(e) => _handleChange(e)}
              />
            </div>
            <p>
              Seus dados pessoais serão usados para aprimorar a sua experiência
              em todo este site, para gerenciar o acesso a sua conta e para
              outros propósitos, como descritos em nossa{' '}
              <Link to="/">política de privacidade</Link>.
            </p>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </section>
    </div>
  );
}
