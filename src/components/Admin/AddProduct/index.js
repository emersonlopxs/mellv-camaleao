import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';

import api from '../../../api';
import { Container, Sizes, Imagens } from './styles.module.scss';

function Add({ setActive }) {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const [product, setProduct] = useState({
    name: '',
    type: 1,
    price: '',
    description: '',
    images: [''],
  });

  const [sizes, setSizes] = useState({
    pp: 0,
    p: 0,
    m: 0,
    g: 0,
    gg: 0,
  });

  async function handleCreate(e) {
    e.preventDefault();
    const data = {
      name: product.name,
      type: parseInt(product.type),
      price: product.price,
      sizes: [sizes],
      description: product.description,
      images: product.images,
    };

    console.log('data -> ', data)

    try {
      await api.post('/products/create', data).then(() => {
        store.addNotification({
          title: 'Produto Adcionado!',
          message: 'O produto foi adcionado com successo!',
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

        // history.push('/admin');
        // perguntar se quer adcionar mais ou apenas 1
        setActive(0);
      });
    } catch (error) {
      console.log(error);
      store.addNotification({
        title: 'Ooops',
        message: 'Houve um erro ao adcionar o produto',
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

  return (
    <div className={Container}>
      <form onSubmit={handleCreate}>
        <label>Nome</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <label>Tipo</label>
        <select
          value={product.type}
          onChange={(e) => setProduct({ ...product, type: e.target.value })}>
          <option value={1}>Tipo 1</option>
          <option value={2}>Tipo 2</option>
        </select>
        <label>Preço</label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <label>Tamanhos</label>
        <div className={Sizes}>
          <label>PP</label>
          <input
            type="number"
            value={sizes.pp}
            onChange={(event) =>
              setSizes({
                ...sizes,
                pp: event.target.value,
              })
            }
          />
          <label>P</label>
          <input
            type="number"
            value={sizes.p}
            onChange={(event) =>
              setSizes({
                ...sizes,
                p: event.target.value,
              })
            }
          />
          <label>M</label>
          <input
            type="number"
            value={sizes.m}
            onChange={(event) =>
              setSizes({
                ...sizes,
                m: event.target.value,
              })
            }
          />
          <label>G</label>
          <input
            type="number"
            value={sizes.g}
            onChange={(event) =>
              setSizes({
                ...sizes,
                g: event.target.value,
              })
            }
          />
          <label>GG</label>
          <input
            type="number"
            value={sizes.gg}
            onChange={(event) =>
              setSizes({
                ...sizes,
                gg: event.target.value,
              })
            }
          />
        </div>
        <label>Descrição</label>
        <input
          type="text"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <label>Imagens</label>
        <div className={Imagens}>
          {product.images.map((value, i) => (
            <input
              key={i}
              placeholder={`Imagem ${i + 1}`}
              type="text"
              value={value}
              onChange={(e) =>
                setProduct({
                  ...product,
                  images: product.images.map((value, j) => {
                    if (i === j) value = e.target.value;
                    return value;
                  }),
                })
              }
            />
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct((prev) => ({
                ...prev,
                images: [...prev.images, ''],
              }));
            }}>
            +
          </button>
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
export default Add;
