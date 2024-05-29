import React from 'react';

// Custom sorting function to remove special characters before sorting
export const removeSpecialCharsSortingFn = (rowA, rowB, columnId) => {
  const getCleanedValue = (row) =>
    row.original[columnId].replace(/[^\w\s]/gi, '');
  const a = getCleanedValue(rowA);
  const b = getCleanedValue(rowB);
  return a.localeCompare(b);
};

export const fnMembersList = (row) => {
  return JSON.stringify(row['members']);
};

export const fnName = (row) => {
  return JSON.stringify(row['name']);
};

export const ProviderNameCell = ({ cell }) => {
  const name = JSON.parse(cell.getValue());
  return <a href={name.link}>{name.title}</a>;
};

export const LinkCell = ({ cell }) => {
  return <a href={cell.getValue()}>{cell.getValue()}</a>;
};

export const ListCell = ({ cell }) => {
  return (
    <>
      {cell
        .getValue()
        .split('|||')
        .map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <br />
          </React.Fragment>
        ))}
    </>
  );
};

export const LinksList = ({ cell }) => {
  return (
    <>
      {JSON.parse(cell.getValue()).map((item, index) => (
        <React.Fragment key={index}>
          <a href={item.link}>{item.name}</a>
          <br />
        </React.Fragment>
      ))}
    </>
  );
};
