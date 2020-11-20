import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Item,
  Images,
  Image,
  Options,
  // PayPal,
  Info,
  InputGroup,
  Avaliation,
  InpoutGroup,
  CheckboxGroup,
  HorizontalShowcase,
  Description,
  FormContainer,
  Coments,
  Stars,
  Section,
  Sizes,
} from './styles.module.scss';
import Segment from '../Segment';
// import PayPalLogo from '../../assets/images/PayPal.svg';
import api from '../../api';
import RelatedProducts from '../RelatedProducts';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { Loader } from '../../Camaleao';

function Product({ match }) {
  const history = useHistory();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [reloadRating, setReloadRating] = useState(false);
  const [product, setProduct] = useState({});
  const [bigImage, setBigImage] = useState();
  const [loading, setLoading] = useState(true);

  const [sizes, setSizes] = useState({});
  const [size, setSize] = useState('m');
  const [limitAmount, setLimitAmount] = useState(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`products/${match.params.id}`);
        console.log('product -> ', response);
        setProduct(response.data[0]);
        setBigImage(response.data[0].images[0]);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProduct();
  }, [match.params.id]);

  useEffect(() => {
    async function getRelatedProducts() {
      try {
        const response = await api.get('/products');
        setRelatedProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getRelatedProducts();
  }, []);

  useEffect(() => {
    if (product.sizes) {
      console.log('product change -> ', JSON.parse(product.sizes[0]));

      const sizes = JSON.parse(product.sizes[0]);

      setSizes(sizes);

      console.log('sizes -> ', Object.keys(sizes));

      setLimitAmount(sizes['m']);
    }
  }, [product]);

  useEffect(() => {
    setLimitAmount(sizes[size]);
  }, [size, sizes]);

  useEffect(() => {
    async function getRatings() {
      try {
        const response = await api.get('/rating/' + match.params.id);
        console.log('response rating -> ', response);
        setRatings(response.data);
        setReloadRating(false);
      } catch (error) {
        console.log(error);
      }
    }
    getRatings();
  }, [match.params.id, reloadRating]);

  const [purchase, setPurchase] = useState({
    amount: 1,
    avaliation: '',
    stars: 0,
    name: '',
    email: '',
    saveData: false,
    size: '',
  });

  async function handleSubmitRating(event) {
    // alert('enviar');
    event.preventDefault();

    const { stars, avaliation } = purchase;

    try {
      const response = await api.post(
        `/rating/create/${match.params.id}`,
        {
          stars,
          description: avaliation,
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      );

      console.log('response -> ', response);

      setPurchase({
        amount: 1,
        avaliation: '',
        stars: 0,
        name: '',
        email: '',
        saveData: false,
        size: '',
      });

      store.addNotification({
        title: 'Avaliação salva!',
        message: 'Sua avaliação foi salva!',
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

      setReloadRating(true);
    } catch (error) {
      console.log('error -> ', error);
    }
  }

  function zoomIn() {}

  function handleAddToCart() {
    const allCart = JSON.parse(localStorage.cart ? localStorage.cart : '[]');

    console.log('all data -> ', allCart);

    const data = [
      ...allCart,
      {
        productId: product.id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        amount,
        size,
      },
    ];

    const localCart = JSON.stringify(data);

    localStorage.cart = localCart;

    console.log('data -> ', data);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={Container}>
        <Segment name={product.name} />
        <div className={Section}>
          <div className={Item}>
            <div className={Images}>
              {product.images.map((item) => (
                <img
                  key={product.images.indexOf(item)}
                  src={item}
                  alt="Imagem do produto"
                  onClick={() => setBigImage(item)}
                />
              ))}
            </div>
            <div className={Image} onMouseOver={zoomIn}>
              <img src={bigImage} alt="Imagem do produto" />
            </div>
          </div>

          <div className={Options}>
            <h1>{product.name}</h1>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(product.price)}
            </p>
            <select
              className={Sizes}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setAmount(1);
              }}>
              <option value="">Selecione um tamanho</option>

              {Object.keys(sizes).map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>

            {Number(limitAmount) === 0 ? (
              <div>sem estoque</div>
            ) : (
              Number(limitAmount) < Number(amount) && (
                <div>
                  quantidade indisponivel, apenas {limitAmount} unidades em
                  estoque
                </div>
              )
            )}
            <div className={InputGroup}>
              <input
                type="number"
                name="amount"
                min="1"
                max={sizes[size]}
                value={amount}
                onChange={(event) => {
                  console.log(limitAmount, amount);
                  setAmount(event.target.value);
                }}
                disabled={limitAmount === 0}
              />
              {Number(limitAmount) >= Number(amount) && (
                <button
                  onClick={() => {
                    handleAddToCart();
                    history.push('/cart');
                  }}>
                  Adicionar ao carrinho
                </button>
              )}
            </div>
            {/* <div className={PayPal}>
              <button>
                <img src={PayPalLogo} alt="PayPal Logo" />
                <p>Compara agora</p>
              </button>
            </div> */}
            <div className={Info}>
              {/* <p>REF: 00000003</p> */}
              {/* <p>Categoria</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className={Description}>
        <h2>Descrição</h2>
        <p>{product.description}</p>
      </div>

      <div className={Avaliation}>
        <div className={Coments}>
          <h2>Avaliaçôes</h2>
          {ratings.length > 0 ? (
            ratings.map((item, index) => (
              <div key={index}>
                <div>
                  <BsFillPersonFill size={32} />
                  <p>{item.displayname}</p>
                </div>
                <p>{item.description}</p>
              </div>
            ))
          ) : (
            <div>Sem avaliações</div>
          )}
        </div>
        <form className={FormContainer} onSubmit={handleSubmitRating}>
          <p>
            O seu endereço de e-mail não será publicado. Campos obrigatórios são
            marcados com <strong>*</strong>
          </p>
          <div className={Stars}>
            Sua avaliação
            <div>
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 1 ||
                    purchase.stars === 2 ||
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 1 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 2 ||
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 2 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 3 ||
                    purchase.stars === 4 ||
                    purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 3 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${
                    purchase.stars === 4 || purchase.stars === 5
                      ? '#000'
                      : ' #757780'
                  }`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 4 })}
              />
              <AiFillStar
                size={20}
                style={{
                  color: `${purchase.stars === 5 ? '#000' : ' #757780'}`,
                }}
                onClick={() => setPurchase({ ...purchase, stars: 5 })}
              />
            </div>
          </div>
          <p>
            Sua avaliação sobre o produto <strong>*</strong>
          </p>
          <textarea
            type="text"
            onChange={(e) =>
              setPurchase({ ...purchase, avaliation: e.target.value })
            }
            value={purchase.avaliation}
          />
          <div className={InpoutGroup}>
            <div>
              <label>
                Nome<strong>*</strong>
              </label>
              <input
                type="text"
                onChange={(e) =>
                  setPurchase({ ...purchase, name: e.target.value })
                }
                value={purchase.name}
              />
            </div>
            <div>
              <label>
                E-mail<strong>*</strong>
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setPurchase({ ...purchase, email: e.target.value })
                }
                value={purchase.email}
              />
            </div>
          </div>
          <div className={CheckboxGroup}>
            <input
              type="checkbox"
              checked={purchase.saveData}
              onChange={(e) =>
                setPurchase({ ...purchase, saveData: !purchase.saveData })
              }
            />
            <p>
              Salvar meus dados neste navegador para a próxima vez que eu
              comentar.
            </p>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className={HorizontalShowcase}>
        {relatedProducts.map((item) => (
          <RelatedProducts
            key={item.id}
            // to={() => handleitem(item)}
            primaryImage={item.images[0]}
            secundaryImage={item.images[1]}
            title={item.name}
            price={item.price}
            styleBtn2={{ background: 'green' }}
            nameBtn1={'Ver Produto'}
            // nameBtn2={'Compra Rápida'}
            // pp={JSON.parse(product.sizes).pp}
            // p={JSON.parse(product.sizes).p}
            // m={JSON.parse(product.sizes).m}
            // g={JSON.parse(product.sizes).g}
            // gg={JSON.parse(product.sizes).gg}
            // clickBtn1={() => handleProduct(product)}
            // clickBtn2={() => {
            //   console.log('Compra Rápida');
            // }}
          />
        ))}
      </div>
    </>
  );
}
export default Product;
