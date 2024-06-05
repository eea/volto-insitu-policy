import installMainSearch from './config';

const extra = {
  text_fields: ['title^4', 'subject^1.5', 'description^1.5'],
  score_mode: 'sum',
};

const applyConfig = (config) => {
  config.settings.searchlib = [installMainSearch].reduce(
    (acc, cur) => cur(acc),
    config.settings.searchlib,
  );

  config.settings.searchlib.searchui.insituSearch.extraQueryParams = extra;

  // console.log(config.settings.searchlib);

  return config;
};
export default applyConfig;
