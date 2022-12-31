import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getOrganisationCall } from "../../../src/API/ssrCalls";

export default withApiAuthRequired(async function handle(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const {
      query: { id, name },
      method,
    } = req;

    switch (method) {
      case "GET":
        const resp = await getOrganisationCall(accessToken || "");
        res.status(resp.status).json(await resp.data);
        break;
      case "POST":
        break;
      default:
        res.status(500).end("Error accessing endpoint");
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
});
