const apiUrl = "http://localhost:8000";

export const httpGet = (url) => {
  return fetch(`${apiUrl}/${url}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .catch((error) => {
    console.error(error);
  });
}

export const httpPost = (url, body={}) => {
  return fetch(`${apiUrl}/${url}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .catch((error) => {
    console.error(error);
  });
}

export const httpPut = (url, body={}) => {
  return fetch(`${apiUrl}/${url}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .catch((error) => {
    console.error(error);
  });
}

export const httpDelete = (url) => {
  return fetch(`${apiUrl}/${url}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .catch((error) => {
    console.error(error);
  });
}
