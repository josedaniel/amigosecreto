/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const __ = {

  qs(node) {
    return document.querySelector(node);
  },

  qsa(node) {
    return document.querySelectorAll(node);
  },

  async post(path, payload) {
    this.qs('.loading').classList.add('active');
    const _base_path = '/';
    const headers = {
      'Content-Type': 'application/json'
    };
    const token = localStorage.xibilla_token;
    if (token) {
      headers['x-token-auth'] = token;
    }
    const response = await fetch(`${_base_path}${path}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers
    });
    this.qs('.loading').classList.remove('active');
    return response.json();
  },

  async get(path) {
    this.qs('.loading').classList.add('active');
    const _base_path = '/';
    const response = await fetch(`${_base_path}${path}`, {
      method: 'get',
    });
    this.qs('.loading').classList.remove('active');
    return response.json();
  },

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },

  html(container, content) {
    document.querySelector(container).innerHTML = content;
  },

  number(a) {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export default __;
