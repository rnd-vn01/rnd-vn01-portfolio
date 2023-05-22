import axios, { AxiosError, AxiosResponse } from 'axios';
import { 
  getAccessToken, 
  refreshAccessToken 
} from 'src/helpers/getAccessToken';

const apiClientJWT = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'content-type': 'application/json',
    // 'Authorization': 'Bearer ' + getAccessToken()
  },
  withCredentials: true
});

apiClientJWT.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken;

  return config;
});

apiClientJWT.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res;
  },
  async (err: AxiosError) => {
    const status = err.response.status;
    const message = (err.response.data as any).messages?.[0].message;

    if (status === 401) {
      let newToken = await refreshAccessToken();     
      err.config.headers['Authorization'] = 'Bearer ' + newToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
      return apiClientJWT(err.config);
    }

    return Promise.reject(err);
  }
);

axios.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;

export default apiClientJWT;
