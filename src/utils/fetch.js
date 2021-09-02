const baseURL = "https://us4b9c5vv0.execute-api.us-east-1.amazonaws.com/prod/";

/**
* @desc main handler for responses API
* @params {Object}
*/
export function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(json => {
    const error = json || new Error(response.statusText);
    return Promise.reject({ error, response });
  });
}

/**
* @desc main constructor for requests API
* @params {String} {Object} {String}
*/
function complexRequest(url, data, method) {
  const postData = {
    method,
    body: JSON.stringify(data),
    headers: {
      "x-api-key": "Ht1ufSLPLF2JDCsZK3SlG78KRsRw1h024A9yGgcW",
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseURL}${url}`, postData).then(handleResponse);
}

/**
* @desc constructor for GET request API
* @params {String}
*/
export const get = url => {
  const postData = {
    method: "GET",
    headers: {
      "x-api-key": "Ht1ufSLPLF2JDCsZK3SlG78KRsRw1h024A9yGgcW",
    },
  };

  return fetch(`${baseURL}${url}`, postData).then(handleResponse);
};

/**
* @desc post request
* @params {String} {Object}
*/
export function post(url, data) {
  return complexRequest(url, data, "POST");
}

/**
* @desc put request
* @params {String} {Object}
*/
export function put(url, data) {
  return complexRequest(url, data, "PUT");
}

/**
* @desc constructor for DELETE request API
* @params {String}
*/
export const del = url => {
  const postData = {
    method: "DELETE",
    headers: {
      "x-api-key": "Ht1ufSLPLF2JDCsZK3SlG78KRsRw1h024A9yGgcW",
    },
  };

  return fetch(`${baseURL}${url}`, postData).then(handleResponse);
};
