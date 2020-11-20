import React, { useEffect, useState } from 'react';
import {
  Container,
  AddressSection,
  AddressContent,
  AddBtn,
  AddressData,
  GridAddress,
  AddressConteiner,
  Buttons,
} from './styles.module.scss';
import api from '../../../api';
import { Link, useHistory } from 'react-router-dom';
import { MdLibraryAdd, MdDelete, MdModeEdit } from 'react-icons/md';
import { store } from 'react-notifications-component';

function Address({ setSectionName, setActive }) {
  const [myAddress, seMyAddress] = useState([]);
  useEffect(() => {
    setSectionName('Endereços');
    setActive(3);
    async function getAddress() {
      try {
        await api
          .get('/address', {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => seMyAddress(response.data));
      } catch (error) {
        console.log('error ->', error.status);
      }
    }
    getAddress();
  }, [setActive, setSectionName]);

  const history = useHistory();

  async function _handleDelete(option, id) {
    if (option) {
      try {
        await api
          .delete(`/address/delete/${id}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then(() => {
            store.addNotification({
              title: 'Sucesso',
              message: 'Endereço deletado com sucesso.',
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
          });
      } catch (error) {
        console.log('error ->', error.status);
      }
    }
  }

  return (
    <>
      <div className={Container}>
        <p>
          Os endereços a seguir serão usados na página de finalizar pedido como
          endereços padrões, mas é possível modificá-los durante a finalização
          do pedido.
        </p>
        <div className={AddressSection}>
          <div className={AddressContent}>
            <h3>Cadastrar novo endereço</h3>
            <Link to="/my-account/address/add" className={AddBtn}>
              <MdLibraryAdd />
            </Link>
          </div>
          <div>
            {myAddress.length === 0 ? (
              <p>Você não possui endereços cadastrados</p>
            ) : (
              <div className={GridAddress}>
                {myAddress.map((item) => (
                  <div className={AddressData} key={item.id}>
                    <div className={AddressConteiner}>
                      <p>{item.street}</p>
                      <p>{item.district}</p>
                      <p>{item.number}</p>
                      <p>{item.complement}</p>
                      <p>{item.cep}</p>
                    </div>
                    <div className={Buttons}>
                      <button
                        onClick={() =>
                          history.push(`/my-account/address/${item.id}`)
                        }
                      >
                        <MdModeEdit size={22} />
                      </button>
                      <button
                        onClick={() =>
                          _handleDelete(
                            window.confirm(
                              `Deseja deletar o endereço ${item.district}`
                            ),
                            item.id
                          )
                        }
                      >
                        <MdDelete size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Address;
