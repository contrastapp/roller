import request from 'axios';


export default {
  fetchTokens(endpoint) {
    return request({
      method: 'GET',
      url: endpoint,
      responseType: 'json',
    });
  },

};
