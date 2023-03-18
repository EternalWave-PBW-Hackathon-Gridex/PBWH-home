import axios from "axios";

async function request(requestInfo, method = "get") {
  let { url, headers, params, body } = requestInfo;

  if (!url) {
    throw Error("axios request error: url is empty");
  }

  let config = {
    url,
    method,
    params,
    data: body,
    headers
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
        } else if (error.request) {
          reject(error.request);
        } else {
          reject(error.message);
        }
      });
  });
}

const GET = ({ url, headers, params, body }) => {
  return request({ url, headers, params, body });
};

const POST = ({ url, headers, params, body }) => {
  return request({ url, headers, params, body }, "post");
};

const PUT = ({ url, headers, params, body }) => {
  return request({ url, headers, params, body }, "put");
};

const DELETE = ({ url, headers, params, body }) => {
  return request({ url, headers, params, body }, "delete");
};

export { GET, POST, PUT, DELETE };
