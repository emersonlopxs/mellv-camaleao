import React, { useState, useEffect } from 'react';
import { Container } from './styles.module.scss';
import Segment from '../Segment';
import { store } from 'react-notifications-component';

import api from '../../api';

export default function Contact() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  useEffect(() => {
    console.log(values);
  }, [values]);

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const { name, email, subject, message } = values;

    try {
      const response = await api.post('/contact', {
        name,
        email,
        subject,
        message,
      });

      console.log('response -> ', response);

      store.addNotification({
        title: 'Mensagem enviada!',
        message: 'Sua mensagem foi enviada com successo',
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

      setValues({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.log('error -> ', error);
    }
  }

  return (
    <div className={Container}>
      <Segment name="Contato" />
      <h2>Contato</h2>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="eEmail">Seu nome</label>
          <input
            type="text"
            required
            name="name"
            value={values.name}
            placeholder="Seu nome"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">seu email</label>
          <input
            type="email"
            required
            name="email"
            value={values.email}
            placeholder="Seu e-mail"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">Assunto</label>
          <input
            type="text"
            required
            name="subject"
            value={values.subject}
            placeholder="Assunto"
            onChange={(e) => _handleChange(e)}
          />

          <label htmlFor="ePassword">Sua mensagem</label>
          <textarea
            onChange={(e) => _handleChange(e)}
            name="message"
            id=""
            cols="150"
            rows="15"
            value={values.message}
            placeholder="Escreva aqui..."></textarea>

          <button type="submit" style={{ marginTop: 15 }}>
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}
