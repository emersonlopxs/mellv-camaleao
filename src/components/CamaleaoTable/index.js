import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CamaleaoTableFull({
  products,
  setActive,
  deleteProduct,
}) {
  const [state, setState] = useState({
    columns: [
      { title: 'Nome', field: 'name' },
      { title: 'Id', field: 'id' },
      { title: 'Descrição', field: 'description' },
      { title: 'Preço', field: 'price', type: 'numeric' },
      // { title: 'Imagem', field: 'imagem' },
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      // },
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
      title="Produtos"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: EditIcon,
          tooltip: 'Editar Produto',
          onClick: (event, product) => {
            localStorage.setItem('ProductEdit', JSON.stringify(product));
            setActive(2);
          },
        },
        {
          icon: DeleteIcon,
          tooltip: 'Apagar Produto',
          onClick: (event, product) => {
            deleteProduct(
              window.confirm(`Deseja deletar o produto ${product.name}`),
              product.id
            );
          },
        },
      ]}
    />
  );
}
