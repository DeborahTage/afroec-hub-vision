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
export type Gender = "MALE" | "FEMALE";
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

export type EventStatus = "UPCOMING" | "ONGOING" | "PAST" | "CANCELLED";

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  imageUrl?: string;
  registrationLink?: string;
  maxAttendees?: number;
  category?: string;
  status?: EventStatus;
  published?: boolean;
}

export interface AmbassadorApplicationData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: Gender;
  city: string;
  institutionName: string;
  institutionType: "HIGH_SCHOOL" | "UNIVERSITY" | "OTHER";
  gradeLevel: string;
  fieldOfStudy?: string;
  motivationLetter: string;
  leadershipExperience?: string;
  techSkills?: string[];
  hoursPerWeek: number;
  proposedClubName: string;
  estimatedMembers: number;
  supportNeeded?: string[];
  cvUrl?: string;
  recommendationLetterUrl?: string;
  portfolioUrl?: string;
  commitHours: boolean;
  commitClub: boolean;
  commitBootcamp: boolean;
  agreeConduct: boolean;
}

export interface InternshipApplicationData {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  institution: string;
  fieldOfStudy: string;
  yearOfStudy: string;
  graduationDate: string;
  department:
    | "SOFTWARE_DEVELOPMENT"
    | "CYBERSECURITY"
    | "PRODUCT_MANAGEMENT"
    | "MARKETING"
    | "OPERATIONS"
    | "EDUCATION"
    | "RESEARCH";
  duration: "THREE_MONTHS" | "SIX_MONTHS" | "ONE_YEAR";
  startDate: string;
  fullTime: boolean;
  skills?: string[];
  experience?: string;
  projectLinks?: string;
  githubUrl?: string;
  motivationAfroec: string;
  learningGoals: string;
  cvUrl: string;
  coverLetterUrl?: string;
  transcriptUrl?: string;
  agreeUnpaid: boolean;
  agreeDuration: boolean;
  agreePolicies: boolean;
}

export interface EventRegistrationData {
  fullName: string;
  email: string;
  phone?: string;
  institution?: string;
  dietaryRequirements?: string;
}

export class ApiError extends Error {
  errors?: Record<string, string>;

  constructor(message: string, errors?: Record<string, string>) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
  }
}
