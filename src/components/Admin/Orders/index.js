import React, { useState, useEffect } from 'react';
import { store } from 'react-notifications-component';
import MaterialTable from 'material-table';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

import api from '../../../api';
import { StyleAdmin } from '../styles.module.scss';
import Add from '../AddProduct';
import Edit from '../EditProduct';

export default function Orders({ match }) {
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    async function getProducts() {
      try {
        await api.get('/orders').then((response) => {
          setOrders(response.data);
          console.log('products -> ', response.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [active]);

  async function deleteProduct(confirm, id) {
    if (confirm) {
      try {
        api.delete(`/products/delete/${id}`).then((response) => {
          // alert('Produto deletado');
          store.addNotification({
            title: 'Produto Apagado!',
            message: 'O produto foi apagado com successo!',
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
          setOrders(orders.filter((item) => item.id !== id));
        });
      } catch (error) {
        console.log(error);
        store.addNotification({
          title: 'Ooops',
          message: 'Houve um erro ao apagar o produto',
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
            deleteProduct={deleteProduct}
            orders={orders}
          />
        </div>
      )}
      {active === 1 && <Add setActive={setActive} />}
      {active === 2 && <Edit setActive={setActive} />}
    </div>
  );
}

function CamaleaoTable({ orders, setActive, deleteProduct }) {
  const [state, setState] = useState({
    columns: [
      { title: '# Pedido', field: 'id' },
      { title: 'Data', field: 'created_at' },
      { title: 'Status', field: 'status' },
      { title: 'Total', field: 'total_price' },
      { title: 'Nome', field: 'name' },
      { title: 'CPF', field: 'cpf' },
      { title: 'Nota', field: 'note' },
      { title: 'Rua', field: 'street' },
      { title: 'Estado', field: 'district' },
      { title: 'Complemento', field: 'complement' },
    ],
    data: orders,
  });

  useEffect(() => {
    setState((oldState) => ({ ...oldState, data: orders }));
    console.log('table!');
  }, [orders]);

  return (
    <MaterialTable
      width="100%"
      title="Produtos"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowUpdate: (newData, oldData) => {
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
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'Sem dados...',
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
    />
  );
}
