import AxiosInstance from './config';

export const loginApi = async ({ address, signature, signData, type }: any) => {
  const response = await AxiosInstance.post('/auth/login', {
    address,
    signature,
    signData,
    type,
  });
  const { data } = response;
  return data;
};

export const getPro5 = async () => {
  const response = await AxiosInstance.get('/auth/profile');
  const { data } = response;
  return data;
};

export const joinGame = async ({ mapId }: any) => {
  const response = await AxiosInstance.post('/game/join-game', {
    mapId,
  });
  const { data } = response;
  return data;
};

export const checkEligible = async () => {
  const response = await AxiosInstance.get('/game/check-eligible');
  const { data } = response;
  return data;
};
