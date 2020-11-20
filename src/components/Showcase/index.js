import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Loader } from '../../Camaleao';
import { Grid } from './styles.module.scss';
import Card from '../Card';
import api from '../../api';

function Showcase() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProducts() {
      try {
        await api
          .get('/products')
          .then((response) => setProducts(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  function handleProduct(id) {
    history.push(`product/${id}`);
  }

  if (products.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div className={Grid}>
        {products.map((product) => (
          <Card
            key={product.id}
            primaryImage={product.images[0]}
            secundaryImage={product.images[1]}
            title={product.name}
            price={product.price}
            nameBtn1={'Ver Produto'}
            // pp={JSON.parse(product.sizes).pp}
            // p={JSON.parse(product.sizes).p}
            // m={JSON.parse(product.sizes).m}
            // g={JSON.parse(product.sizes).g}
            // gg={JSON.parse(product.sizes).gg}
            clickBtn1={() => handleProduct(product.id)}
          />
        ))}
      </div>
    </>
  );
}
export default Showcase;
