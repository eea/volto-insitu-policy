function DataProviderListWidget(props) {
  const { value } = props;
  return (
    <ul>
      {value.map((item, index) => (
        <li key={index}>
          <a href="https://insitu.copernicus.eu/">{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default DataProviderListWidget;
