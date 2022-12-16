import ClientAPI, { ApiError } from "./client";

const Client = new ClientAPI();
const DEFAULT_SERVER_ERROR_MESSAGE = "Something went wrong, please try again.";

export { Client, ApiError, DEFAULT_SERVER_ERROR_MESSAGE };
