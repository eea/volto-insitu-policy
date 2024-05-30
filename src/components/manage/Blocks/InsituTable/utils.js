import React from 'react';

export const removeSpecialCharsSortingFn = (rowA, rowB, columnId) => {
  const getCleanedValue = (row) => {
    const value = JSON.parse(row.getValue(columnId)).title; // Parse the JSON and get the title
    return value.replace(/[^\w\s]/gi, ''); // Remove special characters
  };
  const a = getCleanedValue(rowA);
  const b = getCleanedValue(rowB);
  return a.localeCompare(b);
};

// export const fnMembersList = (row) => {
//   return JSON.stringify(row['members']);
// };

export const fnName = (row) => {
  return JSON.stringify(row['name']);
};

export const ProviderNameCell = ({ cell }) => {
  const name = JSON.parse(cell.getValue());
  return (
    <a className="provider-name-link" href={name.link}>
      {name.title}
    </a>
  );
};

export const LinkCell = ({ cell }) => {
  return <a href={cell.getValue()}>{cell.getValue()}</a>;
};

export const ListCellMembers = ({ cell }) => {
  const items = JSON.parse(cell.getValue());
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <a href={item.link} className="member-link">
            {item.name}
            {items.length > 1 && index < items.length - 1 ? '; ' : ''}
            <br />
          </a>
        </React.Fragment>
      ))}
    </>
  );
};

export const ListCell = ({ cell }) => {
  const items = cell.getValue().split('|||');
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span>
            {item}
            {items.length > 1 && index < items.length - 1 ? ', ' : ''}
          </span>
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
