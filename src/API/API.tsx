import axios from "axios";
import Organisation from "../models/Organisation";

const BASE_URL = "https://localhost:7219/api";

export const APIGet = async (route: string, token?: string) => {
  return axios.get(`${BASE_URL}/${route}`, defaultConfig(token));
};

export const APIPost = async (route: string, data: object, token?: string) => {
  return axios.post(`${BASE_URL}/${route}`, data, defaultConfig(token));
};

const defaultConfig = function (accessToken?: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};
