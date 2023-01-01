import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { updateOrganisationCall } from "../../../src/API/ssrCalls";

export default withApiAuthRequired(async function handle(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const {
      body,
      query: { organisationId },
      method,
    } = req;

    let resp = undefined;
    switch (method) {
      case "PUT":
        resp = await updateOrganisationCall(
          organisationId as string,
          body,
          accessToken || ""
        );
        res.status(resp.status).json(await resp.data);
        break;
      //   case "DELETE":
      //     resp = await addOrganisationCall(body, accessToken || "");
      //     console.log(resp.data);
      //     res.status(resp.status).json(await resp.data);
      //     break;
      default:
        res.status(500).end("Not found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).json(error?.response?.data);
  }
});
