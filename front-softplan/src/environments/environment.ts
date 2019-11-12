declare var require: any;
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:8080/',
  version: require('../../package.json').version
};
