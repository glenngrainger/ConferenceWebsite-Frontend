import { APIGet, APIPost, APIPut } from "./API";

const BASE_URL = "https://localhost:7219/api";

export const getOrganisationsCall = async (accessToken: string) => {
  return await APIGet(BASE_URL, "Organisation", accessToken, true);
};

export const addOrganisationCall = async (
  data: object,
  accessToken: string
) => {
  return await APIPost(BASE_URL, "Organisation", data, accessToken, true);
};

export const updateOrganisationCall = async (
  id: string,
  data: object,
  accessToken: string
) => {
  return await APIPut(BASE_URL, `Organisation/${id}`, data, accessToken, true);
};
