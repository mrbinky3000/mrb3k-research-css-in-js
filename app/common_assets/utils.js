export default {
  pluralize: (count, word) => (count === 1 ? word : `${word}s`),

  store: (namespace, data) => {
    // set storage and return new storage value
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    // get storage or set to blank array
    const store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
  },
};
