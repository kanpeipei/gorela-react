const apiUrl = "http://localhost:8000";

const httpPost = (url, body) => {
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

export default httpPost;