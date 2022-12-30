import axios from "axios";
import Organisation from "../models/Organisation";

const BASE_URL = "https://localhost:7219/api";

export const APIGet = async (route: string, token?: string) => {
  const resp = await axios.get(`${BASE_URL}/${route}`, defaultConfig(token));
  const data = await resp.data;
  return data as Organisation[];
};

const defaultConfig = function (accessToken?: string) {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};
