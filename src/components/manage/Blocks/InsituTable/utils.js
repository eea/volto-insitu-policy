import React from 'react';
import { Flag } from 'semantic-ui-react';
import './flags.css';

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

export const fnServices = (row) => {
  let result = '';
  for (const [key, value] of Object.entries(row['services'])) {
    result += key;
    result += '|||';
    for (let val of value) {
      result += '>>>'; // marker in order to set italics for this item
      result += val;
      result += '|||';
    }
  }
  return result;
};

export const ProviderNameCell = (props) => {
  const acronym = props.row?.original?.acronym || '';
  const name = JSON.parse(props.cell.getValue());
  return (
    <a className="provider-name-link" href={name.link}>
      {name.title} <span className="acronym">{acronym}</span>
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

export const ServicesComponentsCell = ({ cell }) => {
  const items = cell.getValue().split('|||');
  if (cell.getValue() === '') {
    return '';
  }

  const processedItems = [];
  let currentCategory = null;

  items.forEach((item) => {
    if (item.startsWith('>>>')) {
      if (currentCategory) {
        currentCategory.children.push(item.slice(3));
      }
    } else {
      if (item.length > 0) {
        currentCategory = { name: item, children: [] };
        processedItems.push(currentCategory);
      }
    }
  });

  return (
    <ul className="services-components-list">
      {processedItems.map((category, index) => (
        <li key={index}>
          {category.name}
          {category.children.length > 0 && (
            <ul>
              {category.children.map((child, childIndex) => (
                <li key={childIndex}>
                  <i>{child}</i>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

const CountryFlag = ({ country }) => {
  const countryAlias = {
    'North Macedonia': 'Macedonia',
    'British Indian Ocean Territory': 'United Kingdom',
    'Bosnia And Herzegovina': 'ba',
    'Moldova, Republic Of': 'Moldova',
    'Russian Federation': 'Russia',
    'Congo, The Democratic Republic Of The': 'Congo',
    'Bolivia, Plurinational State Of': 'bo',
    'Venezuela (Bolivarian Republic of)': 'Venezuela',
    'Tanzania, United Republic of': 'Tanzania',
    'Iran (Islamic Republic of)': 'Iran',
    'Syrian Arab Republic': 'Syria',
    "Lao People's Democratic Republic": 'Laos',
    'Viet Nam': 'Vietnam',
    'Hong Kong Special Administrative Region of China': 'Hong Kong',
    'Macao Special Administrative Region of China': 'Macao',
    'Palestine, State of': 'Palestine',
    'Korea, Republic Of': 'kr',
    "Korea, Democratic People'S Republic Of": 'kp',
    'United States of America': 'United States',
    'United Republic of Tanzania': 'Tanzania',
    Czechia: 'Czech Republic',
    'Ivory Coast': "Côte d'Ivoire",
    'Taiwan, Province Of China': 'tw',
    'Svalbard And Jan Mayen': 'sj',
    Réunion: 're',
    "Côte d'Ivoire": 'ci',
  };

  let countryName = countryAlias[country] || country;

  return (
    <Flag
      name={countryName.toLowerCase()}
      style={{ marginRight: '2px', marginLeft: '4px' }}
    />
  );
};

export const countriesCell = ({ cell }) => {
  const withoutFlag = {
    Antarctica: 'Antarctica',
    'Multiple Countries /Not a specific country': 'Multiple Countries',
    'Republic of Kosovo': 'XK',
  };
  const items = cell.getValue().split('|||');
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            {withoutFlag[item] ? '' : <CountryFlag country={item} />}
            {item}
            {items.length > 1 && index < items.length - 1 ? ',' : ''}
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

export const EUCountries = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
];

export const whiteListCountries = [
  ...EUCountries,
  'Norway',
  'Iceland',
  'United Kingdom',
];
