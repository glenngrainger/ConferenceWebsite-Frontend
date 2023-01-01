import Organisation from "../models/Organisation";
import { APIGet, APIPost, APIPut } from "./API";

const BASE_URL = "/api";

export const getOrganisationsCall = async () => {
  var resp = await APIGet(BASE_URL, "Organisation");
  return (await resp.data) as Organisation[];
};

export const addOrganisationCall = async (data: object) => {
  var resp = await APIPost(BASE_URL, "Organisation", data);
  return (await resp.data) as Organisation;
};

export const updateOrganisationCall = async (id: string, data: object) => {
  var resp = await APIPut(BASE_URL, `Organisation/${id}`, data);
  return (await resp.data) as Organisation;
};
