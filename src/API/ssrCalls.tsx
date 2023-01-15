import { APIDelete, APIGet, APIPost, APIPut } from "./API";

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

export const deleteOrganisationCall = async (
  id: string,
  accessToken: string
) => {
  return await APIDelete(BASE_URL, `Organisation/${id}`, accessToken, true);
};

export const getConferencesCall = async (
  organisationId: string,
  accessToken: string
) => {
  return await APIGet(
    BASE_URL,
    `Conference/${organisationId}`,
    accessToken,
    true
  );
};

export const addConferenceCall = async (data: object, accessToken: string) => {
  return await APIPost(BASE_URL, "Conference", data, accessToken, true);
};

export const updateConferenceCall = async (
  id: string,
  data: object,
  accessToken: string
) => {
  return await APIPut(BASE_URL, `Conference/${id}`, data, accessToken, true);
};

export const deleteConferenceCall = async (id: string, accessToken: string) => {
  return await APIDelete(BASE_URL, `Conference/${id}`, accessToken, true);
};
