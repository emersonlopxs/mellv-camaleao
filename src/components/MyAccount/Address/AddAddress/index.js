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
function AddAddress({ setActive, setSectionName }) {
  useEffect(() => {
    setSectionName('Endereços');
    setActive(3);
  }, [setActive, setSectionName]);

  const history = useHistory();

  const [values, setValues] = useState({
    cep: '',
    street: '',
    district: '',
    number: '',
    complement: '',
  });

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      cep: values.cep,
      street: values.street,
      district: values.district,
      number: values.number,
      complement: values.complement,
    };
    console.log(data);

    try {
      await api
        .post('/address/create', data, {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        })
        .then(() => {
          store.addNotification({
            title: 'Sucesso',
            message: 'Endereço cadastrado com succeso.',
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

  return (
    <>
      <h3 className={Title}>Endereço de entrega</h3>
      <form className={StyledForm} onSubmit={handleSubmit}>
        <div>
          <label>
            CEP <span>*</span>
          </label>
          <input
            value={values.cep}
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
            value={values.street}
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
            value={values.district}
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
            value={values.number}
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
            value={values.complement}
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

export default AddAddress;
