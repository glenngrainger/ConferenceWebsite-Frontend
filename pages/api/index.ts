import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { APIDelete, APIGet, APIPost, APIPut } from "../../src/API/API";

const BASE_URL = "https://localhost:7219/api";

export default withApiAuthRequired(async function handle(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const {
      body,
      query: { id, name },
      method,
    } = req;
    const requestUrl = req.headers["requesturl"];

    if (!requestUrl) {
      res.status(400).end("No url provided");
    }

    let resp = undefined;
    switch (method) {
      case "GET":
        resp = await APIGet(BASE_URL, requestUrl as string, accessToken, true);
        res.status(resp.status).json(await resp.data);
        break;
      case "POST":
        resp = await APIPost(
          BASE_URL,
          requestUrl as string,
          body,
          accessToken,
          true
        );
        res.status(resp.status).json(await resp.data);
        break;
      case "PUT":
        resp = await APIPut(
          BASE_URL,
          requestUrl as string,
          body,
          accessToken,
          true
        );
        res.status(resp.status).json(await resp.data);
        break;
      case "DELETE":
        resp = await APIDelete(
          BASE_URL,
          requestUrl as string,
          accessToken || "",
          true
        );
        res.status(resp.status).json(await resp.data);
        break;
      default:
        res.status(500).end("Not found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json(error?.response?.data);
  }
});
