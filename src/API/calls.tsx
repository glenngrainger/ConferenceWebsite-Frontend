import Organisation from "../models/Organisation";
import { APIGet, APIPost } from "./API";

export const getOrganisationCall = async (accessToken: string) => {
  var resp = await APIGet("Organisation", accessToken);
  return (await resp.data) as Organisation[];
};

export const addOrganisationCall = async (
  data: object,
  accessToken: string
) => {
  var resp = await APIPost("Organisation", data, accessToken);
  return (await resp.data) as Organisation;
};
