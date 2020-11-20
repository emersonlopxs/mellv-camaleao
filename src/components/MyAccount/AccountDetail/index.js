import React, { useEffect, useState } from 'react';
import {
  StyledForm,
  StyledInput,
  SubmitButton,
  InputGroup,
} from './styles.module.scss';
import api from '../../../api';
import { Loader } from '../../../Camaleao';
import { store } from 'react-notifications-component';
// import { useHistory } from 'react-router-dom';

function AccountDetail({ setSectionName, setActive }) {
  const [values, setValues] = useState({
    name: '',
    surname: '',
    displayname: '',
    email: '',
    phone: '',
  });
  useEffect(() => {
    setSectionName('Detalhes da Conta');
    setActive(4);
    async function getMyAccount() {
      try {
        api
          .get('/clients/profile', {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => {
            setValues(response.data[0]);
          });
      } catch (error) {
        console.log('Error ->', error);
      }
    }
    getMyAccount();
  }, [setSectionName, setActive]);

  // const history = useHistory();

  function _handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  if (values.name === '') {
    return <Loader />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name: values.name,
      surname: values.surname,
      displayname: values.displayname,
      email: values.email,
      phone: values.phone,
    };
    try {
      await api
        .put('/clients/update', data, {
          headers: {
            cli_id: values.id,
          },
        })
        .then(() => {
          store.addNotification({
            title: 'Sucesso',
            message: 'Perfil alterado com sucesso.',
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
      console.log(error);
    }
  }

  return (
    <>
      <form className={StyledForm} onSubmit={handleSubmit}>
        <div className={InputGroup}>
          <div>
            <label>
              Nome <span>*</span>
            </label>
            <input
              value={values.name}
              name="name"
              type="text"
              onChange={(e) => _handleChange(e)}
              required
              maxLength={30}
              className={StyledInput}
            />
          </div>
          <div>
            <label>
              Sobrenome <span>*</span>
            </label>
            <input
              value={values.surname}
              name="surname"
              type="text"
              maxLength={30}
              onChange={(e) => _handleChange(e)}
              required
              className={StyledInput}
            />
          </div>
        </div>
        <div>
          <label>
            Nome de exibição <span>*</span>
          </label>
          <input
            value={values.displayname}
            name="displayname"
            type="text"
            maxLength={30}
            onChange={(e) => _handleChange(e)}
            required
            className={StyledInput}
          />
          <p>
            Será assim que seu nome será exibido na seção da conta e nos
            comentários
          </p>
        </div>
        <div>
          <label>
            Endereço de e-mail <span>*</span>
          </label>
          <input
            value={values.email}
            name="email"
            type="text"
            onChange={(e) => _handleChange(e)}
            required
            className={StyledInput}
          />
        </div>
        <div>
          <label>
            Celular <span>*</span>
          </label>
          <input
            value={values.phone}
            name="phone"
            type="text"
            onChange={(e) => _handleChange(e)}
            required
            className={StyledInput}
          />
        </div>
        <button type="submit" className={SubmitButton}>
          Salvar Alterações
        </button>
      </form>
    </>
  );
}

export default AccountDetail;
