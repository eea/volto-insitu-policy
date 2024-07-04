import React from 'react';
import { useSelector } from 'react-redux';
import DataProvidersTable from './DataTable';

const View = (props) => {
  const content = useSelector((state) => state.content);
  const data_providers_table =
    content.data?.['@components']?.data_providers_table;
  const { data } = props;

  return data_providers_table ? (
    <DataProvidersTable
      dataProvider={data_providers_table}
      tableType={data.tableType}
    />
  ) : (
    'Please enable interface data_providers'
  );
};

export default View;
