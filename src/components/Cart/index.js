import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import { Name } from "../../Store";
import {
  Container,
  Vazio,
  CartStyle,
  Size,
  ToCheckout,
} from './styles.module.scss';

// import StripeContainer from '../../Stripe/StripeContainer';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const allCart = JSON.parse(localStorage.cart ? localStorage.cart : '[]');

    console.log('add cart -> ', allCart);

    let sum = 0;
    allCart.forEach(({ price, amount }) => {
      sum += Number(price * amount);
      console.log('total -> ', sum);
    });

    setTotal(sum);

    setCart(allCart);
  }, [loading]);

  function handleEmptyCart() {
    localStorage.cart = '[]';
    setLoading(true);
  }

  return (
    <div className={Container}>
      <h2>Carrinho</h2>

      {/* <StripeContainer /> */}

      <section>
        {cart.length === 0 ? (
          <p className={Vazio}>Seu Carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div onClick={() => history.push('/product/' + item.productId)}>
              <div className={CartStyle}>
                <img src={item.image} alt="" srcset="" />
                <div>
                  <div>
                    <span>Produto:</span> {item.name}
                  </div>
                  <div>
                    <span>Preço: </span>
                    {item.price}
                  </div>
                  <div>
                    <span>Quantidade: </span>
                    {item.amount}
                  </div>
                  <div>
                    <span>Tamanho:</span>{' '}
                    <span className={Size}>{item.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {cart.length > 0 && (
        <div>
          <div className={ToCheckout} style={{ marginBottom: 20 }}>
            <div>Total: {total.toFixed(2)} Reais</div>
            <button
              onClick={() => {
                localStorage.total = total;
                history.push('/checkout');
              }}>
              Fechar compra
            </button>
          </div>
          <button style={{ marginBottom: 20 }} onClick={handleEmptyCart}>
            Esvaziar carrinho
          </button>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <Link to="/">Retornar para a loja</Link>
      </div>
    </div>
  );
}
