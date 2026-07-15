export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
  timestamp?: string;
}

export interface SubmissionResponse {
  id: number;
  applicationId: string;
  status: string;
  submittedAt: string;
  nextSteps: string;
}

export type ProgramType = "ACADEMY" | "PRODUCT_HUB" | "COMMUNITY";
export type AcademyTrack = "SOFTWARE_ENGINEERING" | "CYBERSECURITY" | "HARDWARE_ENGINEERING";
export type CommunityProgram = "CYBERGUARD" | "SHESEC" | "SCHOOLNET" | "DIGISEC";
export type Gender = "MALE" | "FEMALE" | "NON_BINARY" | "PREFER_NOT_TO_SAY";
export type EducationLevel =
  | "PRIMARY"
  | "HIGH_SCHOOL"
  | "DIPLOMA"
  | "BACHELORS"
  | "MASTERS"
  | "PHD"
  | "OTHER";
export type EmploymentStatus =
  | "EMPLOYED"
  | "UNEMPLOYED"
  | "STUDENT"
  | "SELF_EMPLOYED"
  | "OTHER";
export type Availability = "FULL_TIME" | "PART_TIME" | "WEEKENDS" | "EVENINGS" | "FLEXIBLE";
export type PartnerType =
  | "CORPORATE"
  | "GOVERNMENT"
  | "NGO"
  | "INTERNATIONAL"
  | "ACADEMIC"
  | "OTHER";
export type VolunteerRole =
  | "TRAINER_SOFTWARE"
  | "TRAINER_CYBER"
  | "TRAINER_HARDWARE"
  | "TRAINER_DIGITAL"
  | "MARKETING"
  | "GRAPHIC_DESIGN"
  | "WEB_DEV"
  | "CONTENT_CREATOR"
  | "SOCIAL_MEDIA"
  | "PROGRAMS_LEAD"
  | "FUNDRAISING"
  | "OPERATIONS"
  | "MENTOR"
  | "OTHER";
export type ContactSubject = "GENERAL" | "PARTNERSHIP" | "MEDIA" | "CAREERS" | "FEEDBACK" | "OTHER";

export interface StudentApplicationData {
  fullName: string;
  email: string;
  phone: string;
  telegram?: string;
  city: string;
  dateOfBirth?: string;
  gender?: Gender;
  educationLevel?: EducationLevel;
  employmentStatus?: EmploymentStatus;
  programType: ProgramType;
  academyTrack?: AcademyTrack;
  communityProgram?: CommunityProgram;
  priorExperience?: string;
  motivation: string;
  careerGoals?: string;
  githubPortfolio?: string;
  incomeShareAgreement?: boolean;
  howDidYouHear?: string;
  availability?: Availability;
  preferredStartDate?: string;
  canCommitFulltime?: boolean;
}

export interface PartnerInquiryData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  organizationType: PartnerType;
  partnershipInterest: string[];
  message: string;
}

export interface VolunteerApplicationData {
  fullName: string;
  email: string;
  phone: string;
  telegram?: string;
  city: string;
  primaryRole: VolunteerRole;
  secondaryRole?: VolunteerRole;
  availability: Availability;
  hoursPerWeek?: number;
  startDate?: string;
  commitmentDuration?: string;
  professionalBackground: string;
  motivation: string;
  skills?: string[];
  languages?: string[];
  experienceLevel?: string;
  portfolioLink?: string;
  resumeLink?: string;
  referencesContact?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
}

export interface PublicStats {
  studentsReached: number;
  annualGraduates: number;
  womenInTech: string;
  placementRate: string;
  partnerSchools: number;
  digisecTrucks: number;
  activePartners: number;
  activeVolunteers: number;
}

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

export class ApiError extends Error {
  errors?: Record<string, string>;

  constructor(message: string, errors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}
