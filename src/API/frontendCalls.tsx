import Conference from "../models/Conference";
import Organisation from "../models/Organisation";
import { APIDelete, APIGet, APIPost, APIPut } from "./API";

const BASE_URL = "/api";

// Organisation
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

export const deleteOrganisationCall = async (id: string) => {
  await APIDelete(BASE_URL, `Organisation/${id}`);
  return id;
};

// Conference
export const getConferencesCall = async (organisationId: string) => {
  var resp = await APIGet(BASE_URL, `Conferences/${organisationId}`);
  return (await resp.data) as Conference[];
};

export const addConferenceCall = async (data: object) => {
  var resp = await APIPost(BASE_URL, "Conference", data);
  return (await resp.data) as Conference;
};

export const updateConferenceCall = async (id: string, data: object) => {
  var resp = await APIPut(BASE_URL, `Conference/${id}`, data);
  return (await resp.data) as Conference;
};

export const deleteConferenceCall = async (id: string) => {
  await APIDelete(BASE_URL, `Conference/${id}`);
  return id;
};
