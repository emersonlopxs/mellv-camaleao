import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import MaterialTable from 'material-table';

import api from '../../../api';
import { StyleAdmin } from '../styles.module.scss';
import Add from '../AddProduct';
import Edit from '../EditProduct';

export default function Products({ match }) {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    async function getProducts() {
      try {
        await api.get('/clients').then((response) => {
          setProducts(response.data);
          console.log('products -> ', response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [active]);

  async function handleUpdateClient(data, oldData) {
    try {
      console.log('handleupdateclient -> ', data, oldData);
      const response = await api.put('/clients/update', data, {
        headers: {
          cli_id: oldData.id,
        },
      });
      store.addNotification({
        title: 'Cliente atualizado!',
        message: 'O cliente foi atualizado com successo!',
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
      console.log('response -> ', response);
    } catch (error) {
      store.addNotification({
        title: 'Erro ao atualizar Cliente !',
        message: 'Houve um erro ao atualizar o Cliente!',
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
    }
  }

  async function handleCreateClient(data) {
    try {
      console.log('handle Create client -> ', data);
      const newData = {
        ...data,
        password: '123',
      };
      const response = await api.post('/clients/signUp', newData);
      store.addNotification({
        title: 'Cliente criado!',
        message: 'O cliente foi criado com successo!',
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
      console.log('response -> ', response);
    } catch (error) {
      console.log(error);
      store.addNotification({
        title: 'Erro ao criar o cliente',
        message: 'Houve um erro ao criar o Cliente!',
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

  async function deleteClient(id) {
    if (true) {
      try {
        api
          .delete(`/clients/delete`, {
            headers: {
              cli_id: id,
            },
          })
          .then((response) => {
            // alert('Produto deletado');
            store.addNotification({
              title: 'Cliente Apagado!',
              message: 'O Cliente foi apagado com successo!',
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
            console.log(response);
            setProducts(products.filter((item) => item.id !== id));
          });
      } catch (error) {
        console.log(error);
        store.addNotification({
          title: 'Ooops',
          message: 'Houve um erro ao apagar o Cliente',
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
  }

  return (
    <div className={StyleAdmin}>
      {active === 0 && (
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <CamaleaoTable
            setActive={setActive}
            deleteClient={deleteClient}
            products={products}
            handleCreateClient={handleCreateClient}
            handleUpdateClient={handleUpdateClient}
          />
        </div>
      )}
      {active === 1 && <Add setActive={setActive} />}
      {active === 2 && <Edit setActive={setActive} />}
    </div>
  );
}

function CamaleaoTable({
  products,
  setActive,
  deleteClient,
  handleCreateClient,
  handleUpdateClient,
}) {
  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Sobrenome', field: 'surname' },
      { title: 'Nome a mostra', field: 'displayname' },
      { title: 'Email', field: 'email' },
      { title: 'Telefone', field: 'phone' },
      { title: 'Banido', field: 'ban' },
      // { title: 'Criado em', field: 'created_at' },
      // { title: 'Id', field: 'id' },
    ],
    data: products,
  });

  useEffect(() => {
    setState((oldState) => ({ ...oldState, data: products }));
    console.log('table!');
  }, [products]);

  return (
    <MaterialTable
      localization={{
        body: {
          emptyDataSourceMessage: "Sem dados...",
          addTooltip: 'Adcionar',
          deleteTooltip: 'Apagar',
          editTooltip: 'Editar',
          filterRow: {
            filterTooltip: 'Filtrar',
          },
          editRow: {
            deleteText: 'Deseja realmente apagar essa linha?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Salvar',
          },
        },
        // grouping: {
        //   placeholder: "Tirer l'entête ...",
        //   groupedBy: 'Grouper par:',
        // },
        header: {
          actions: 'Ações',
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} de {count}',
          labelRowsSelect: 'linhas',
          labelRowsPerPage: 'linhas por pagina:',
          firstAriaLabel: 'Primeira pagina',
          firstTooltip: 'Primeira pagina',
          previousAriaLabel: 'Pagina anterior',
          previousTooltip: 'Pagina anterior',
          nextAriaLabel: 'Proxima pagina',
          nextTooltip: 'Proxima pagina',
          lastAriaLabel: 'Ultima pagina',
          lastTooltip: 'Ultima pagina',
        },
        toolbar: {
          // addRemoveColumns: 'Ajouter ou supprimer des colonnes',
          // nRowsSelected: '{0} ligne(s) sélectionée(s)',
          // showColumnsTitle: 'Voir les colonnes',
          // showColumnsAriaLabel: 'Voir les colonnes',
          // exportTitle: 'Exporter',
          // exportAriaLabel: 'Exporter',
          // exportName: 'Exporter en CSV',
          searchTooltip: 'Pesquisar',
          searchPlaceholder: 'Pesquisar',
        },
      }}
      width="100%"
      title="Clientes"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) => {
          handleCreateClient(newData);

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          });
        },
        onRowUpdate: (newData, oldData) => {
          handleUpdateClient(newData, oldData);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          });
        },
        onRowDelete: (oldData) => {
          console.log('oldData -> ', oldData);
          deleteClient(oldData.id);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          });
        },
      }}
      // actions={[
      //   {
      //     icon: EditIcon,
      //     tooltip: 'Editar Produto',
      //     onClick: (event, product) => {
      //       localStorage.setItem('ProductEdit', JSON.stringify(product));
      //       setActive(2);
      //     },
      //   },
      //   {
      //     icon: DeleteIcon,
      //     tooltip: 'Apagar Produto',
      //     onClick: (event, product) => {
      //       deleteProduct(
      //         window.confirm(`Deseja deletar o produto ${product.name}`),
      //         product.id
      //       );
      //     },
      //   },
      // ]}
    />
  );
}
