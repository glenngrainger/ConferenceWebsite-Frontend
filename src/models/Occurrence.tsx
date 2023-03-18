export interface Occurrence {
  id?: string;
  dateTime: Date;
  duration: number;
  adminMeetingLink: string;
  attendeeMeetingLink: string;
  adminEmbeddedUrl: string;
  attendeeEmbeddedUrl: string;
  meetingId: string;
  conferenceId: string;
}
