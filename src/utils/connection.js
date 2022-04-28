const axios = require("axios").default;

/**
 *
 * @param {String} url request url
 * @param {Object} data  data for request
 * @returns
 */
export const postRequest = (url, data) => {
  return new Promise((res, rej) => {
    axios
      .post(url, data)
      .then((response) => {
        res(response && response.data && response.data.data);
      })
      .catch(rej);
  });
};
