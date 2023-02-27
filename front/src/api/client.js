class ClientAPI {
  baseUrl = process.env.REACT_APP_API_ENDPOINT;
  token = "";

  getToken() {
    return this.token;
  }
  setToken(token) {
    this.token = token;
  }

  //Auth
  signInUser(body) {
    return this.fetch("/auth/login", {
      method: "POST",
      body,
      contentType: "application/x-www-form-urlencoded",
    });
  }

  getUserOnSignIn(body) {
    return this.fetch("/auth/user", {
      method: "POST",
      body,
    });
  }

  //Orders
  getAllOrders() {
    return this.fetch("/orders", {
      method: "GET",
    });
  }

  getOrdersForStatus(status_id) {
    return this.fetch(`/orders/status/${status_id}`, {
      method: "GET",
    });
  }

  getOrderDetail(id) {
    return this.fetch(`/orders/${id}`, {
      method: "GET",
    });
  }

  deleteOrder(id) {
    return this.fetch(`/orders/${id}`, {
      method: "DELETE",
    });
  }

  getOrderAuditHistory(id) {
    return this.fetch(`/orders/${id}/history`, {
      method: "GET",
    });
  }

  createNewOrder(body) {
    return this.fetch(`/orders/new`, {
      method: "POST",
      body,
    });
  }

  updateOrder(order_id, body) {
    return this.fetch(`/orders/${order_id}`, {
      method: "PATCH",
      body,
    });
  }

  getOrderQueue(order_id) {
    return this.fetch(`/orders/kit/${order_id}/queue`, {
      method: "GET",
    });
  }

  //Kits
  getAllKits() {
    return this.fetch(`/kits`, {
      method: "GET",
    });
  }

  getAllProductLines() {
    return this.fetch(`/kits/product_lines`, {
      method: "GET",
    });
  }

  getKitsByProductLine(product_line_name) {
    return this.fetch(`/kits/product_lines/${product_line_name}`, {
      method: "GET",
    });
  }

  createKit(body) {
    return this.fetch(`/kits/new`, {
      method: "POST",
      body,
    });
  }

  // Users

  getAllUsers() {
    return this.fetch(`/users`, {
      method: "GET",
    });
  }

  getUserById(id) {
    return this.fetch(`/users/${id}`, {
      method: "GET",
    });
  }

  updateUser(id, body) {
    return this.fetch(`/users/${id}`, {
      method: "PATCH",
      body,
    });
  }

  createUser(body) {
    return this.fetch(`/users/new`, {
      method: "POST",
      body,
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

    // const requestUrl = `http://localhost:9000${url}`;
    let finalUrl = url;

    if (this.baseUrl.length) {
      finalUrl = this.baseUrl + url;
    }
    const response = await fetch(finalUrl, fetchOpts);

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
