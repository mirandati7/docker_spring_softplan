declare var require: any;
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/softplan/',
  version: require('../../package.json').version  
};
