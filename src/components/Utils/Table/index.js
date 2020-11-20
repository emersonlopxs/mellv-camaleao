import React, { useState, useEffect } from 'react';
import { Container } from './styles.module.scss';
import MaterialTable from 'material-table';

export default function Table({ rows, columnsName, title }) {
  const [state, setState] = useState({
    columns: columnsName,
    data: rows,
  });
  useEffect(() => {
    setState((oldState) => ({ ...oldState, data: rows }));
  }, [rows]);

  return (
    <>
      <MaterialTable
        // options={{
        //   grouping: true,
        // }}
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
        width="100%"
        title={title}
        options={{
          search: true,
          rowStyle: {
            backgroundColor: '#EEE',
          },
        }}
        columns={state.columns}
        data={state.data}
        detailPanel={[
          {
            tooltip: 'Detalhes',
            // icon: EditIcon,
            // render: (rows) => <Detail data={rows} />,
            render: (rows) => <></>,
          },
        ]}
      />
    </>
  );
}

export function Detail({ data }) {
  return (
    <>
      <div className={Container}>
        <p>
          <span>Bairro:</span>
          {data.district}
        </p>
        <p>
          <span>Rua:</span>
          {data.street}
        </p>
        <p>
          <span>Número:</span>
          {data.number}
        </p>
        <p>
          <span>Complemento:</span>
          {data.complement}
        </p>
      </div>
      {data.details.forEach((element) => {
        return (
          <>
            <p>teste</p>
          </>
        );
      })}
    </>
  );
}

// complement: null
// cupon_id: null
// details: (2) [{…}, {…}]
// district: "Delfino Magalhães 2"
// id: 38
// note: null
// number: 222
// status: 0
// street: "rua nova juramento 2"
// tableData: {id: 0, showDetailPanel: ƒ}
// total_price: "349.50"
