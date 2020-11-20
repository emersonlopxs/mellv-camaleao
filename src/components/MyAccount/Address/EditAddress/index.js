import React, { useEffect, useState } from 'react';
import {
  Title,
  StyledForm,
  StyledInput,
  SubmitButton,
} from './styles.module.scss';
import api from '../../../../api';
import { store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';
import { Loader } from '../../../../Camaleao';
function EditAddress({ setActive, setSectionName, match }) {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    setSectionName('Endereços');
    setActive(3);
    async function getAddress() {
      try {
        await api
          .get(`address/${match.params.id}`, {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => setAddress(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    getAddress();
  }, [match.params.id, setActive, setSectionName]);

  const history = useHistory();

  function _handleChange(e) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      cep: address.cep,
      street: address.street,
      district: address.district,
      number: address.number,
      complement: address.complement,
    };
    try {
      await api
        .put(`/address/update/${address.id}`, data, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then(() => {
          store.addNotification({
            title: 'Sucesso',
            message: 'Endereço alterado com succeso.',
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
          history.push('/my-account/address');
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (address.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <h3 className={Title}>Editar endereço de entrega</h3>
      <form className={StyledForm} onSubmit={handleSubmit}>
        <div>
          <label>
            CEP <span>*</span>
          </label>
          <input
            value={address.cep}
            name="cep"
            required
            maxLength={10}
            type="string"
            onChange={(e) => _handleChange(e)}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Rua <span>*</span>
          </label>
          <input
            value={address.street}
            name="street"
            required
            maxLength={100}
            type="text"
            onChange={(e) => _handleChange(e)}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Bairro <span>*</span>
          </label>
          <input
            value={address.district}
            name="district"
            required
            maxLength={100}
            type="text"
            onChange={(e) => _handleChange(e)}
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Número <span>*</span>
          </label>
          <input
            value={address.number}
            name="number"
            required
            type="number"
            onChange={(e) => _handleChange(e)}
            className={StyledInput}
          />
        </div>
        <div>
          <label>Complemento (opicional)</label>
          <input
            value={address.complement}
            name="complement"
            type="text"
            maxLength={510}
            onChange={(e) => _handleChange(e)}
            className={StyledInput}
          />
        </div>
        <button type="submit" className={SubmitButton}>
          Salvar Endereços
        </button>
      </form>
    </>
  );
}

export default EditAddress;
