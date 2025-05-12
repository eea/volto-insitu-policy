import { useSelector } from 'react-redux';

function DataProviderListWidget(props) {
  // const { value } = props;
  const content = useSelector((state) => state.content);
  const data_providers = content.data?.['@components']?.data_providers_details;

  /*
  Example of data providers list:
    [{
    "acronym": "AAA",
    "countries": [
      {
        "code": "IT",
        "name": "Italy"
      }
    ],
    "id": 1,
    "is_network": false,
    "link": "https://test.test/1/",
    "members": [],
    "name": "Aaaa AAAaa AAAAA"
  }, ...]
  */

  if (data_providers === undefined) {
    return null;
  }

  return (
    <div className="data-providers">
      {data_providers.map((item, index) => (
        <div key={index}>
          <a href={item.link}>{item.name}</a>
        </div>
      ))}
    </div>
  );
}

export default DataProviderListWidget;
