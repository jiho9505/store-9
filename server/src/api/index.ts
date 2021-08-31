import fetch from 'node-fetch';

const api = {
  requestJson: (url, options) => {
    return fetch(url, options).then((res) => res.json());
  },
  requestText: (url, options) => {
    return fetch(url, options).then((res) => res.text());
  },
};

export { api };
