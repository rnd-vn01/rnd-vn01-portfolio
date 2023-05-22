import axios, { AxiosError, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true
});

apiClient.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);
export default apiClient;
