import Conference from "./Conference";
import Organisation from "./Organisation";

export interface Meeting {
  organisation: Organisation;
  conference: Conference;
  DateTime: Date;
  duration: Number;
  embeddedUrl: string;
  isHost: boolean;
  displayName: string;
}
