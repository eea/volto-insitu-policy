function DataProviderListWidget(props) {
  const { value } = props;

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

  return (
    <div className="data-providers">
      <h4>Data providers</h4>
      <ul>
        {value.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataProviderListWidget;
