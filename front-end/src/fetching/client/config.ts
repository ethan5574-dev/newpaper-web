import axios from 'axios';

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'ngrok-skip-browser-warning': 'true',
  },
});

let interceptorId: number | null = null;
export const setInterceptorToken = (token?: string) => {
  // clear interceptors by id
  if (interceptorId !== null) {
    AxiosInstance.interceptors.request.eject(interceptorId);
  }
  // add new interceptor
  interceptorId = AxiosInstance.interceptors.request.use(
    async (config) => {
      config.headers!['Authorization'] = 'Bearer ' + token;
      return config;
    },
    async (error) => {
      const { response, config } = error;
      if (response) {
        return Promise.reject(response.data);
      } else return Promise.reject(error);
    }
  );
};

export default AxiosInstance;
