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

  if (!isSSR) {
    return axios.get(URL, ssrConfig(route, token));
  }
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
  if (!isSSR) {
    return axios.post(URL, data, ssrConfig(route, token));
  }
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

  if (!isSSR) {
    return axios.put(URL, data, ssrConfig(route, token));
  }
  return axios.put(`${URL}/${route}`, data, defaultConfig(token));
};

export const APIDelete = async (
  URL: string,
  route: string,
  token?: string,
  isSSR?: boolean
) => {
  if (isSSR) axios.defaults.httpsAgent = httpsAgent;

  if (!isSSR) {
    return axios.delete(URL, ssrConfig(route, token));
  }
  return axios.delete(`${URL}/${route}`, defaultConfig(token));
};

const defaultConfig = function (accessToken?: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

const ssrConfig = function (fetchURL: string, accessToken?: string) {
  return {
    headers: { Authorization: `Bearer ${accessToken}`, RequestUrl: fetchURL },
  };
};
