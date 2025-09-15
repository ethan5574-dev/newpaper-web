import AxiosInstance from './config';

export const getLeaderboard = async () => {
    const response = await AxiosInstance.get('/event/leaderboard');
    const { data } = response;
    return data;
};

export const submitBountyBug = async (dataForm: any) => {
    const response = await AxiosInstance.post('/event/submit-bounty-bug', dataForm);
    const { data } = response;
    return data;
};

export const checkSubmit = async () => {
    const response = await AxiosInstance.get('/event/submit-limit');
    const { data } = response;
    return data;
};