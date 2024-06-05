import React from 'react';
import { useSelector } from 'react-redux';
import DataProvidersTable from './DataTable';

const View = (props) => {
  const content = useSelector((state) => state.content);
  const data_providers_table =
    content.data?.['@components']?.data_providers_table;
  const { data } = props;
  const is_network = data.network;

  return data_providers_table ? (
    <DataProvidersTable
      is_network={is_network}
      dataProvider={data_providers_table}
    />
  ) : (
    'Please enable interface data_providers'
  );
};

export default View;
