import React, { useEffect, useState } from 'react';
import { Container } from './styles.module.scss';
import { useHistory } from 'react-router-dom';
import api from '../../../api';

function Panel({ setSectionName, setActive }) {
  const [myData, setMyData] = useState([]);
  useEffect(() => {
    setSectionName('Minha Conta');
    setActive(1);
    getMyAccount();
  }, [setSectionName, setActive]);
  async function getMyAccount() {
    try {
      api
        .get('clients/profile', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setMyData(response.data);
        });
    } catch (error) {
      console.log('Error ->', error);
    }
  }

  const history = useHistory();
  function handleLogout() {
    localStorage.clear();
    history.push('/auth');
  }
  return (
    <>
      {myData.map((user, index) => (
        <div className={Container} key={index}>
          <div>
            Olá, <strong>{user.displayname}</strong> (não é{' '}
            <strong>{user.displayname}</strong> ?{' '}
            <button onClick={handleLogout}>Sair</button>)
          </div>
          <div>
            A partir do painel de controle de sua conta, você pode ver suas{' '}
            <button onClick={() => history.push('/my-account/orders')}>
              compras recentes
            </button>
            , gerenciar seus{' '}
            <button onClick={() => history.push('/my-account/address')}>
              endereços de entrega
            </button>
            , e{' '}
            <button onClick={() => history.push('/my-account/account-detail')}>
              editar sua senha e detalhes da conta
            </button>
            .
          </div>
        </div>
      ))}
    </>
  );
}

export default Panel;
