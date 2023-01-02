import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

export const APIGet = async (
  URL: string,
  route: string,
  token?: string,
  isSSR?: boolean
) => {
  if (isSSR) axios.defaults.httpsAgent = httpsAgent;
  return axios.get(`${URL}/${route}`, defaultConfig(token));
};

export const APIPost = async (
  URL: string,
  route: string,
  data: object,
  token?: string,
  isSSR?: boolean
) => {
  if (isSSR) axios.defaults.httpsAgent = httpsAgent;
  return axios.post(`${URL}/${route}`, data, defaultConfig(token));
};

export const APIPut = async (
  URL: string,
  route: string,
  data: object,
  token?: string,
  isSSR?: boolean
) => {
  if (isSSR) axios.defaults.httpsAgent = httpsAgent;
  return axios.put(`${URL}/${route}`, data, defaultConfig(token));
};

export const APIDelete = async (
  URL: string,
  route: string,
  token?: string,
  isSSR?: boolean
) => {
  if (isSSR) axios.defaults.httpsAgent = httpsAgent;
  return axios.delete(`${URL}/${route}`, defaultConfig(token));
};

const defaultConfig = function (accessToken?: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};
