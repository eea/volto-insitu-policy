export function getTodayWithTime() {
  const d = new Date();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  const output = [
    d.getFullYear(),
    '-',
    month < 10 ? '0' : '',
    month,
    '-',
    day < 10 ? '0' : '',
    day,
    'T',
    hour < 10 ? '0' : '',
    hour,
    ':',
    minute < 10 ? '0' : '',
    minute,
    ':',
    second < 10 ? '0' : '',
    second,
    'Z',
  ].join('');
  return output;
}

export function getClientProxyAddress() {
  const url = new URL(window.location);
  url.pathname = '';
  url.search = '';
  return url.toString();
}

export const getSearchThumbUrl = () => (result, config) => {
  let image = `https://www.eea.europa.eu/portal_depiction/term/image_preview`;

  if (result.about?.raw?.indexOf('://demo-insitu-p6.eea.europa.eu') !== -1) {
    if (result.image_preview) {
      image = result.image_preview.raw;
    }
    if (result.insitu_preview_image) {
      image = result.insitu_preview_image.raw;
    }
  }

  return image;
};
