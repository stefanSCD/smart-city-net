import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5009/api'
});


export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const reportProblem = (data) => API.post('/problem', data);
export const getProblems = () => API.get('/problem');