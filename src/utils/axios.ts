import axios, { AxiosError } from "axios";
import { getToken } from "@/helpers/local-storage";

axios.defaults.timeout = 90000; // 90s
// axios.defaults.baseURL =
//   process.env.API_SERVER_URL || 'https://api.revpayment.io';

axios.defaults.baseURL = "http://localhost:3001/api/user";
const token = getToken();
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common["Content-Type"] = `application/json`;
const apiErrorMessage = (error: AxiosError) => {
  if (typeof error === "string") {
    return error;
  }

  const response: any = error && error.response;

  const isArrayBuffer =
    response?.request?.responseType === "arraybuffer" &&
    response?.data?.toString() === "[object ArrayBuffer]";

  if (isArrayBuffer) {
    try {
      response.data = JSON.parse(Buffer.from(response.data).toString("utf8"));
    } catch (error) {
      // ignore JSON parse error
    }
  }

  try {
    if (response && typeof response === "object") {
      const message =
        (response.data &&
          (response.data?.message ||
            response.data?.errorMessage ||
            response.data?.errors?.message ||
            response.data?.errors)) ||
        response.data ||
        response;
      return message || "Oops something went wrong.";
    }

    return typeof response === "string" ? response : error?.message;
  } catch (error: any) {
    return error?.message;
  }
};
export const errorHandler = (error: AxiosError): void =>
  // toastError(apiErrorMessage(error));
  console.log("error", apiErrorMessage(error));

export default axios;
