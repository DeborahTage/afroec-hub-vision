import type {
  ContactFormData,
  ContactSubject,
  EducationLevel,
  PartnerInquiryData,
  PartnerType,
  StudentApplicationData,
  VolunteerApplicationData,
  VolunteerRole,
} from "@/types/api";

export function mapEducationLevel(label: string): EducationLevel {
  switch (label) {
    case "High School Student":
      return "HIGH_SCHOOL";
    case "University Student":
    case "University Graduate":
      return "BACHELORS";
    case "University Non-Tech":
      return "OTHER";
    case "Self-Taught":
    default:
      return "OTHER";
  }
}

export function mapApplyForm(form: {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  track: string;
  background: string;
  motivation: string;
}): StudentApplicationData {
  const base = {
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    city: form.city.trim(),
    educationLevel: mapEducationLevel(form.background),
    motivation: form.motivation.trim(),
    incomeShareAgreement: false,
    canCommitFulltime: true,
    availability: "FULL_TIME" as const,
  };

  switch (form.track) {
    case "Cybersecurity":
      return {
        ...base,
        programType: "ACADEMY",
        academyTrack: "CYBERSECURITY",
      };
    case "Hardware Engineering":
      return {
        ...base,
        programType: "ACADEMY",
        academyTrack: "HARDWARE_ENGINEERING",
      };
    case "Product Hub Mentorship":
      return {
        ...base,
        programType: "PRODUCT_HUB",
      };
    case "Software Engineering":
    default:
      return {
        ...base,
        programType: "ACADEMY",
        academyTrack: "SOFTWARE_ENGINEERING",
      };
  }
}

export function mapPartnerForm(form: {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  partnerStyle: string;
  message: string;
  organizationType?: string;
}): PartnerInquiryData {
  return {
    organizationName: form.orgName.trim(),
    contactPerson: form.contactName.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || undefined,
    organizationType: (form.organizationType as PartnerType) || "CORPORATE",
    partnershipInterest: [form.partnerStyle.trim()],
    message: form.message.trim(),
  };
}

function mapVolunteerRole(expertise: string): VolunteerRole {
  switch (expertise) {
    case "Cybersecurity":
      return "TRAINER_CYBER";
    case "Hardware Labs":
      return "TRAINER_HARDWARE";
    case "UI UX Design":
      return "GRAPHIC_DESIGN";
    case "English Amharic Translations":
      return "CONTENT_CREATOR";
    case "General Admin":
      return "OPERATIONS";
    case "Software Engineering":
    default:
      return "TRAINER_SOFTWARE";
  }
}

function mapVolunteerHours(hours: string): number {
  if (hours.startsWith("10")) return 12;
  if (hours.startsWith("6")) return 8;
  return 5;
}

export function mapVolunteerForm(form: {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  hours: string;
  linkedinUrl: string;
  motivation: string;
  city?: string;
}): VolunteerApplicationData {
  const hours = mapVolunteerHours(form.hours);
  return {
    fullName: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    city: form.city?.trim() || "Addis Ababa",
    primaryRole: mapVolunteerRole(form.expertise),
    availability: hours >= 10 ? "FLEXIBLE" : "PART_TIME",
    hoursPerWeek: hours,
    professionalBackground: form.motivation.trim(),
    motivation: form.motivation.trim(),
    portfolioLink: form.linkedinUrl.trim() || undefined,
  };
}

const CONTACT_SUBJECT_MAP: Record<string, ContactSubject> = {
  "General Inquiry": "GENERAL",
  Admissions: "CAREERS",
  "Corporate Partnership": "PARTNERSHIP",
  "Volunteer Programs": "OTHER",
  "Media Request": "MEDIA",
};

export function mapContactForm(form: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): ContactFormData {
  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone?.trim() || undefined,
    subject: CONTACT_SUBJECT_MAP[form.subject] || "GENERAL",
    message: form.message.trim(),
  };
}

export function formatApiError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}
