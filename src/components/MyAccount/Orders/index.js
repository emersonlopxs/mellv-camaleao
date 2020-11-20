import React, { useEffect, useState } from 'react';
// import Table from '../../Utils/Table';
import api from '../../../api';

import { useHistory } from 'react-router-dom';

import { Container, Card, Details } from './styles.module.scss';

function Orders({ setSectionName, setActive }) {
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setSectionName('Pedidos');
    setActive(2);
    async function getMyOrders() {
      try {
        const response = await api.get('/order', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMyOrders();
  }, [setSectionName, setActive]);
  // const columns = [
  //   { title: '# Pedido', field: 'id' },
  //   { title: 'Status', field: 'status' },
  //   { title: 'Data', field: 'created_at' },
  //   { title: 'Nota', field: 'note' },
  //   { title: 'Preço', field: 'total_price' },
  // ];

  console.log(orders);

  return (
    <>
      {/* <Table title="Pedidos" rows={orders} columnsName={columns} /> */}

      <section className={Container}>
        <div>
          {orders.map((item, index) => (
            <div className={Card} key={index}>
              <div>Numero do Pedido: {item.id}</div>
              <div>Total: {item.total_price}</div>
              <div>Nota: {item.note}</div>
              <div>Endereço: {item.street}</div>
              <div className={Details}>
                Detalhes:{' '}
                {item.details.map((el, index) => (
                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => history.push('/product/' + el.product.id)}
                    key={index}>
                    <div>Quantidade: {el.amount}</div>
                    <div>
                      Tamanho:{' '}
                      <span style={{ textTransform: 'uppercase' }}>
                        {el.size}
                      </span>
                    </div>
                    <div>Produto: {el.product.name}</div>
                    <img src={el.product.images[0]} alt="" srcset="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Orders;
