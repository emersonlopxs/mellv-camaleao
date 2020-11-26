import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

import { Address } from './styles.module.scss';

import api from '../api';

export const CheckoutForm = () => {
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [note, setNote] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {}, [history]);

  useEffect(() => {
    const { token } = localStorage;

    if (!token) {
      history.push('/auth');
      return;
    }

    console.log('selectione um endereço -> ');
    async function getAddress() {
      try {
        const response = await api.get('/address', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
        console.log('response -> ', response.data);
        setAddress(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAddress();
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cart = JSON.parse(localStorage.cart);

    const { total } = localStorage;

    const data = {
      cart,
      total,
      address_id: selectedAddress.id,
      note: 'hello world!',
    };

    console.log('data -> ', data);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.log('error on stripe', error);
        return;
      }

      const { id } = paymentMethod;

      const response = await api.post(
        '/order/create',
        {
          stripe_pay_id: id,
          cart,
          total,
          address_id: selectedAddress.id,
          note,
          name,
          cpf,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      );

      console.log('response -> ', response);

      store.addNotification({
        title: 'Compra realizada',
        message: 'Acompanhe sua compra na tela de meus pedidos!',
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

      localStorage.cart = '[]';

      history.push('/my-account/orders');
    } catch (error) {
      console.log('error stripe? -> ', error.response);

      if (error.response.data.type === 'stripe-error') {
        store.addNotification({
          title: 'Erro ao processar os dados do cartão',
          message: 'Verifique os dados e tente novamente!',
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
  };

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  return (
    <div>
      <h3>Selecione um endereço</h3>

      <div className={Address}>
        {address.map((item) => (
          <div
            onClick={() => setSelectedAddress(item)}
            style={{
              backgroundColor: selectedAddress.id === item.id ? '#eee' : '',
            }}>
            <div>Cep: {item.cep}</div>
            <div>Complemento: {item.complement}</div>
            <div>Bairro: {item.district}</div>
            <div>Numero: {item.number}</div>
            <div>Rua: {item.street}</div>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Observação"
        style={{ marginBottom: 10, width: '100%' }}
      />

      <h3>Pagamento</h3>
      <div style={{ marginTop: 20 }}>
        Total: {Number(localStorage.total).toFixed(2)} Reais
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome no cartão"
        style={{ marginBottom: 10, marginTop: 10, width: '100%' }}
      />
      <input
        type="text"
        maxLength="14"
        value={cpf}
        onChange={(e) => setCpf(cpfMask(e.target.value))}
        placeholder="CPF do titular"
        style={{ marginBottom: -30, width: '100%' }}
      />
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement hidePostalCode={true} />
        <button>Realizar pagamento</button>
      </form>
    </div>
  );
};
