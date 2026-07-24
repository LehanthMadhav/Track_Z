export type OpportunityType =
  | "Hackathon"
  | "Internship"
  | "Competition"
  | "Webinar"
  | "Workshop"
  | "Conference"
  | "Job"
  | "Scholarship"
  | "Other";

export type OpportunityMode = "Online" | "Offline" | "Hybrid";

export type OpportunityStatus = "Saved" | "Applied" | "Registered";

export interface ManualOpportunityFormData {
  title: string;
  organization: string;
  type?: OpportunityType;
  officialUrl: string;
  registrationStartDate: string;
  registrationDeadline: string;
  hasApplied: boolean;
  appliedDate: string;
  eventStartDate: string;
  eventEndDate: string;
  eventTime: string;
  mode?: OpportunityMode;
  location: string;
  eventLink: string;
  emailTracking: boolean;
  status: OpportunityStatus;
  notes: string;
}
