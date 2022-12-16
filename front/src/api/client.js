class ClientAPI {
  baseUrl = process.env.REACT_APP_API_ENDPOINT;
  token = "";

  getToken() {
    return this.token;
  }
  setToken(token) {
    this.token = token;
  }

  signInUser(body) {
    return this.fetch("/auth/login", {
      method: "POST",
      body,
      contentType: "application/x-www-form-urlencoded",
    });
  }

  getUserOnSignIn(body) {
    return this.fetch("/auth/user", {
      method: "GET",
      body,
      contentType: "application/x-www-form-urlencoded",
    });
  }

  getAllOrders() {
    return this.fetch("/orders", {
      method: "GET",
    });
  }

  getNewOrders() {
    return this.fetch("/orders/new", {
      method: "GET",
    });
  }

  getOrderDetail(id) {
    return this.fetch(`/orders/${id}`, {
      method: "GET",
    });
  }

  getAllKits() {
    return this.fetch(`/kits`, {
      method: "GET",
    });
  }

  constructHeadersFromOptions(options) {
    const headers = {};

    let contentType;

    if (options.contentType) {
      contentType = options.contentType;
    } else if (
      !options.contentType &&
      options.method !== "GET" &&
      options.method !== "DELETE" &&
      !(options.body instanceof FormData)
    ) {
      contentType = "application/json";
    }

    if (contentType) {
      headers["Content-Type"] = contentType;
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    console.log(this.getToken());
    console.log(headers["Authorization"]);

    return headers;
  }

  async fetch(url, options) {
    const fetchOpts = {
      method: options.method ? options.method : "GET",
    };

    if (
      options.body &&
      options.contentType === "application/x-www-form-urlencoded"
    ) {
      var formBody = [];
      for (var property in options.body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(options.body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      fetchOpts.body = formBody;
    } else if (options.body) {
      fetchOpts.body =
        options.body instanceof FormData
          ? options.body
          : JSON.stringify(options.body);
    }

    fetchOpts.headers = this.constructHeadersFromOptions(options);

    /*
      TODO
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    */
    const requestUrl = `http://localhost:9000${url}`;
    const response = await fetch(requestUrl, fetchOpts);

    if (response.status === 204) {
      return Promise.resolve(true);
    }

    const contentType = response.headers.get("content-type");
    if (contentType !== "application/json") {
      return response;
    }

    const responseBody = await response.json();

    if (!responseBody.success || !response.ok) {
      throw new ApiError(responseBody);
    }

    return responseBody;
  }
}

class ApiError extends Error {
  constructor(response, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.response = response;
    this.label = response.label;
    this.message = response.message;
  }
}

export default ClientAPI;
export { ApiError };
