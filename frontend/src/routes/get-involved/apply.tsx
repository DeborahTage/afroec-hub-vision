import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import {
    submitAmbassadorApplication,
    submitInternshipApplication,
    submitPartnerInquiry,
    submitVolunteerApplication,
    uploadCvDocument,
} from "@/lib/api";
import { formatApiError } from "@/lib/form-mappers";
import type {
    AmbassadorApplicationData,
    InternshipApplicationData,
    PartnerInquiryData,
    PartnerType,
    VolunteerApplicationData,
    VolunteerRole,
    Availability,
    Gender,
} from "@/types/api";

type ApplyType = "partner" | "ambassador" | "volunteer" | "internship";

const APPLY_TYPES: ApplyType[] = ["partner", "ambassador", "volunteer", "internship"];

function parseApplyType(raw: unknown): ApplyType {
    if (typeof raw === "string" && APPLY_TYPES.includes(raw as ApplyType)) {
        return raw as ApplyType;
    }
    return "ambassador";
}

export const Route = createFileRoute("/get-involved/apply")({
    validateSearch: (search: Record<string, unknown>) => ({
        type: parseApplyType(search.type),
    }),
    component: ApplyPage,
    head: () => ({
        meta: [
            { title: "Apply Now | Afroec Hub" },
            {
                name: "description",
                content:
                    "Apply as a partner, founding ambassador, volunteer, or intern with Afroec Hub.",
            },
        ],
    }),
});

const inputClass =
    "rounded-xl border border-border px-4 py-3 text-[14px] text-black focus:outline-none focus:border-accent hover:border-black/35 transition-colors bg-white";
const labelClass = "text-[13px] font-bold text-black mb-2";

const PARTNERSHIP_INTERESTS = [
    "Cohorts Sponsorship",
    "Hiring Graduates",
    "Guest Masterclasses",
    "Technical Collaboration",
    "Equipment Donation",
    "Curriculum Co-design",
];

const ORG_TYPES: { value: PartnerType; label: string }[] = [
    { value: "CORPORATE", label: "Corporate" },
    { value: "GOVERNMENT", label: "Government" },
    { value: "NGO", label: "NGO / Non-profit" },
    { value: "INTERNATIONAL", label: "International Org" },
    { value: "ACADEMIC", label: "Academic Institution" },
    { value: "OTHER", label: "Other" },
];

const TECH_SKILLS = [
    "Programming",
    "Cybersecurity",
    "UI/UX Design",
    "Hardware / IoT",
    "Data / Analytics",
    "Content Creation",
    "Public Speaking",
    "Event Organizing",
];

const SUPPORT_NEEDED = [
    "Mentorship",
    "Training Materials",
    "Branding Kit",
    "Event Support",
    "Funding",
    "Technical Training",
];

const VOLUNTEER_ROLES: { value: VolunteerRole; label: string }[] = [
    { value: "TRAINER_SOFTWARE", label: "Software Trainer" },
    { value: "TRAINER_CYBER", label: "Cybersecurity Trainer" },
    { value: "TRAINER_HARDWARE", label: "Hardware Trainer" },
    { value: "TRAINER_DIGITAL", label: "Digital Literacy Trainer" },
    { value: "MENTOR", label: "Mentor" },
    { value: "WEB_DEV", label: "Web Development" },
    { value: "GRAPHIC_DESIGN", label: "Graphic Design" },
    { value: "MARKETING", label: "Marketing" },
    { value: "CONTENT_CREATOR", label: "Content Creator" },
    { value: "SOCIAL_MEDIA", label: "Social Media" },
    { value: "PROGRAMS_LEAD", label: "Programs Lead" },
    { value: "FUNDRAISING", label: "Fundraising" },
    { value: "OPERATIONS", label: "Operations" },
    { value: "OTHER", label: "Other" },
];

const AVAILABILITY_OPTS: { value: Availability; label: string }[] = [
    { value: "FULL_TIME", label: "Full time" },
    { value: "PART_TIME", label: "Part time" },
    { value: "WEEKENDS", label: "Weekends" },
    { value: "EVENINGS", label: "Evenings" },
    { value: "FLEXIBLE", label: "Flexible" },
];

const INTERN_DEPARTMENTS: { value: InternshipApplicationData["department"]; label: string }[] = [
    { value: "SOFTWARE_DEVELOPMENT", label: "Software Development" },
    { value: "CYBERSECURITY", label: "Cybersecurity" },
    { value: "PRODUCT_MANAGEMENT", label: "Product Management" },
    { value: "MARKETING", label: "Marketing" },
    { value: "OPERATIONS", label: "Operations" },
    { value: "EDUCATION", label: "Education" },
    { value: "RESEARCH", label: "Research" },
];

const INTERN_DURATIONS: { value: InternshipApplicationData["duration"]; label: string }[] = [
    { value: "THREE_MONTHS", label: "3 months" },
    { value: "SIX_MONTHS", label: "6 months" },
    { value: "ONE_YEAR", label: "1 year" },
];

const INTERN_SKILLS = [
    "JavaScript / TypeScript",
    "Python",
    "Java",
    "React",
    "Cybersecurity Tools",
    "UI/UX",
    "Content Writing",
    "Project Management",
    "Data Analysis",
];

const GENDERS: { value: Gender; label: string }[] = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
];

const CV_ACCEPT = ".pdf,.doc,.docx";
const MAX_CV_SIZE = 5 * 1024 * 1024;

function validateCvFile(file: File) {
    if (file.size > MAX_CV_SIZE) {
        throw new Error("CV document must be 5 MB or smaller.");
    }
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !["pdf", "doc", "docx"].includes(extension)) {
        throw new Error("CV document must be a PDF, DOC, or DOCX file.");
    }
}

const TAB_META: Record<ApplyType, { label: string; title: string; subtitle: string }> = {
    partner: {
        label: "Partner",
        title: "Partner Inquiry",
        subtitle: "Tell us how your organization wants to collaborate with Afroec Hub.",
    },
    ambassador: {
        label: "Ambassador",
        title: "Founding Ambassador Application",
        subtitle: "Apply to build an Afroec Tech Club on your campus and lead peer outreach.",
    },
    volunteer: {
        label: "Volunteer",
        title: "Volunteer Application",
        subtitle: "Share your skills as a trainer, mentor, or program supporter.",
    },
    internship: {
        label: "Internship",
        title: "Internship Application",
        subtitle: "Apply for a structured internship across engineering, product, and ops teams.",
    },
};

function toggleItem(list: string[], value: string) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function CheckboxGroup({
    label,
    options,
    selected,
    onChange,
    required,
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (next: string[]) => void;
    required?: boolean;
}) {
    return (
        <fieldset className="flex flex-col">
            <legend className={`${labelClass} block`}>
                {label}
                {required ? " *" : ""}
            </legend>
            <div className="grid sm:grid-cols-2 gap-2">
                {options.map((opt) => (
                    <label
                        key={opt}
                        className="flex items-center gap-2 text-[13px] text-black cursor-pointer rounded-lg border border-border px-3 py-2 hover:border-black/30"
                    >
                        <input
                            type="checkbox"
                            checked={selected.includes(opt)}
                            onChange={() => onChange(toggleItem(selected, opt))}
                            className="accent-accent"
                        />
                        {opt}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

function ApplyPage() {
    const search = Route.useSearch();
    const navigate = useNavigate({ from: "/get-involved/apply" });
    const [activeTab, setActiveTab] = useState<ApplyType>(search.type ?? "ambassador");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [applicationId, setApplicationId] = useState("");
    const [submitterName, setSubmitterName] = useState("");

    useEffect(() => {
        const fromWindow =
            typeof window !== "undefined"
                ? parseApplyType(new URLSearchParams(window.location.search).get("type"))
                : "ambassador";
        setActiveTab(search.type || fromWindow);
        setSubmitted(false);
        setErrorMsg("");
        setApplicationId("");
    }, [search.type]);

    const switchTab = (type: ApplyType) => {
        setActiveTab(type);
        setErrorMsg("");
        setSubmitted(false);
        void navigate({ search: { type } });
    };

    const [partner, setPartner] = useState<PartnerInquiryData>({
        organizationName: "",
        contactPerson: "",
        email: "",
        phone: "",
        organizationType: "CORPORATE",
        partnershipInterest: [],
        message: "",
    });

    const [ambassador, setAmbassador] = useState<AmbassadorApplicationData>({
        fullName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "FEMALE",
        city: "Addis Ababa",
        institutionName: "",
        institutionType: "UNIVERSITY",
        gradeLevel: "",
        fieldOfStudy: "",
        motivationLetter: "",
        leadershipExperience: "",
        techSkills: [],
        hoursPerWeek: 5,
        proposedClubName: "",
        estimatedMembers: 20,
        supportNeeded: [],
        cvUrl: "",
        recommendationLetterUrl: "",
        portfolioUrl: "",
        commitHours: false,
        commitClub: false,
        commitBootcamp: false,
        agreeConduct: false,
    });

    const [volunteer, setVolunteer] = useState<VolunteerApplicationData>({
        fullName: "",
        email: "",
        phone: "",
        city: "Addis Ababa",
        primaryRole: "TRAINER_SOFTWARE",
        availability: "PART_TIME",
        hoursPerWeek: 5,
        professionalBackground: "",
        motivation: "",
        portfolioLink: "",
    });

    const [internship, setInternship] = useState<InternshipApplicationData>({
        fullName: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        institution: "",
        fieldOfStudy: "",
        yearOfStudy: "",
        graduationDate: "",
        department: "SOFTWARE_DEVELOPMENT",
        duration: "THREE_MONTHS",
        startDate: "",
        fullTime: true,
        skills: [],
        experience: "",
        projectLinks: "",
        githubUrl: "",
        motivationAfroec: "",
        learningGoals: "",
        cvUrl: "",
        coverLetterUrl: "",
        transcriptUrl: "",
        agreeUnpaid: false,
        agreeDuration: false,
        agreePolicies: false,
    });
    const [ambassadorCv, setAmbassadorCv] = useState<File | null>(null);
    const [internshipCv, setInternshipCv] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);
        try {
            let result: { applicationId: string };
            if (activeTab === "partner") {
                if (partner.partnershipInterest.length === 0) {
                    throw new Error("Select at least one partnership interest.");
                }
                result = await submitPartnerInquiry({
                    ...partner,
                    organizationName: partner.organizationName.trim(),
                    contactPerson: partner.contactPerson.trim(),
                    email: partner.email.trim(),
                    phone: partner.phone?.trim() || undefined,
                    message: partner.message.trim(),
                });
                setSubmitterName(partner.contactPerson);
            } else if (activeTab === "ambassador") {
                if (!ambassador.commitHours || !ambassador.commitClub || !ambassador.commitBootcamp || !ambassador.agreeConduct) {
                    throw new Error("Please accept all required commitments.");
                }
                let cvUrl: string | undefined;
                if (ambassadorCv) {
                    validateCvFile(ambassadorCv);
                    cvUrl = (await uploadCvDocument(ambassadorCv)).url;
                }
                result = await submitAmbassadorApplication({
                    ...ambassador,
                    fullName: ambassador.fullName.trim(),
                    email: ambassador.email.trim(),
                    phone: ambassador.phone.trim(),
                    city: ambassador.city.trim(),
                    institutionName: ambassador.institutionName.trim(),
                    gradeLevel: ambassador.gradeLevel.trim(),
                    fieldOfStudy: ambassador.fieldOfStudy?.trim() || undefined,
                    motivationLetter: ambassador.motivationLetter.trim(),
                    leadershipExperience: ambassador.leadershipExperience?.trim() || undefined,
                    proposedClubName: ambassador.proposedClubName.trim(),
                    cvUrl,
                    recommendationLetterUrl: ambassador.recommendationLetterUrl?.trim() || undefined,
                    portfolioUrl: ambassador.portfolioUrl?.trim() || undefined,
                    hoursPerWeek: Number(ambassador.hoursPerWeek),
                    estimatedMembers: Number(ambassador.estimatedMembers),
                });
                setSubmitterName(ambassador.fullName);
            } else if (activeTab === "volunteer") {
                result = await submitVolunteerApplication({
                    ...volunteer,
                    fullName: volunteer.fullName.trim(),
                    email: volunteer.email.trim(),
                    phone: volunteer.phone.trim(),
                    city: volunteer.city.trim(),
                    professionalBackground: volunteer.professionalBackground.trim(),
                    motivation: volunteer.motivation.trim(),
                    portfolioLink: volunteer.portfolioLink?.trim() || undefined,
                    hoursPerWeek: volunteer.hoursPerWeek ? Number(volunteer.hoursPerWeek) : undefined,
                });
                setSubmitterName(volunteer.fullName);
            } else {
                if (!internship.agreeUnpaid || !internship.agreeDuration || !internship.agreePolicies) {
                    throw new Error("Please accept all internship agreements.");
                }
                if (!internshipCv) {
                    throw new Error("Please upload your CV document.");
                }
                validateCvFile(internshipCv);
                const cvUrl = (await uploadCvDocument(internshipCv)).url;
                result = await submitInternshipApplication({
                    ...internship,
                    fullName: internship.fullName.trim(),
                    email: internship.email.trim(),
                    phone: internship.phone.trim(),
                    linkedinUrl: internship.linkedinUrl?.trim() || undefined,
                    institution: internship.institution.trim(),
                    fieldOfStudy: internship.fieldOfStudy.trim(),
                    yearOfStudy: internship.yearOfStudy.trim(),
                    graduationDate: internship.graduationDate,
                    startDate: internship.startDate,
                    experience: internship.experience?.trim() || undefined,
                    projectLinks: internship.projectLinks?.trim() || undefined,
                    githubUrl: internship.githubUrl?.trim() || undefined,
                    motivationAfroec: internship.motivationAfroec.trim(),
                    learningGoals: internship.learningGoals.trim(),
                    cvUrl,
                    coverLetterUrl: internship.coverLetterUrl?.trim() || undefined,
                    transcriptUrl: internship.transcriptUrl?.trim() || undefined,
                });
                setSubmitterName(internship.fullName);
            }
            setApplicationId(result.applicationId);
            setSubmitted(true);
        } catch (err) {
            setErrorMsg(formatApiError(err));
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-bg-cream text-foreground flex flex-col">
                <Navbar />
                <main className="flex-1 container-page py-24 flex items-center justify-center">
                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 max-w-lg text-center shadow-lg w-full">
                        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-6 animate-bounce">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="font-display font-bold text-[28px] md:text-[32px] text-black">
                            Application Received!
                        </h1>
                        <p className="mt-4 text-[15px] text-text-secondary leading-relaxed">
                            Thank you{submitterName ? `, ${submitterName}` : ""}. Your{" "}
                            <strong className="text-black">{TAB_META[activeTab].label.toLowerCase()}</strong>{" "}
                            application has been submitted.
                        </p>
                        {applicationId && (
                            <div className="my-8 bg-bg-cream border border-border rounded-xl p-4">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                                    Application ID
                                </div>
                                <div className="font-display text-[22px] font-bold text-black mt-1 tracking-wider">
                                    {applicationId}
                                </div>
                            </div>
                        )}
                        <div className="mt-8 flex justify-center gap-3">
                            <Link to="/" className="btn-pill bg-black text-white hover:bg-neutral-800 text-[14px]">
                                Return to Home
                            </Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setSubmitted(false);
                                    setApplicationId("");
                                }}
                                className="btn-pill border border-border bg-white text-black text-[14px]"
                            >
                                Submit Another
                            </button>
                        </div>
                    </Reveal>
                </main>
                <Footer />
            </div>
        );
    }

    const meta = TAB_META[activeTab];

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <Breadcrumbs />
            <main className="flex-1 py-12 bg-bg-cream">
                <div className="container-page max-w-3xl">
                    <Reveal>
                        <Link
                            to="/get-involved"
                            className="inline-flex items-center gap-1 text-[13px] text-text-secondary hover:text-black mb-6"
                        >
                            <ArrowLeft size={14} /> Back to Get Involved
                        </Link>
                    </Reveal>

                    <SectionHeader
                        eyebrow="GET INVOLVED"
                        title="Apply to Join Afroec Hub"
                        subtitle="Choose a path below and submit your application in one place."
                        align="left"
                        className="mb-8"
                    />

                    <Reveal className="mb-6 flex flex-wrap gap-2">
                        {APPLY_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => switchTab(type)}
                                className={`btn-pill text-[13px] font-semibold border transition-colors ${
                                    activeTab === type
                                        ? "bg-accent text-black border-accent"
                                        : "bg-white text-text-secondary border-border hover:border-black/40 hover:text-black"
                                }`}
                            >
                                {TAB_META[type].label}
                            </button>
                        ))}
                    </Reveal>

                    <Reveal className="bg-white border border-border rounded-[24px] p-8 md:p-12 shadow-sm">
                        <h1 className="font-display font-bold text-[28px] md:text-[36px] text-black mb-2">
                            {meta.title}
                        </h1>
                        <p className="text-[14px] text-text-secondary mb-8">{meta.subtitle}</p>

                        {errorMsg && (
                            <div
                                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[14px] font-medium"
                                role="alert"
                            >
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === "partner" && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="organizationName" className={labelClass}>
                                                Organization Name *
                                            </label>
                                            <input
                                                id="organizationName"
                                                required
                                                className={inputClass}
                                                value={partner.organizationName}
                                                onChange={(e) =>
                                                    setPartner({ ...partner, organizationName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="contactPerson" className={labelClass}>
                                                Contact Person *
                                            </label>
                                            <input
                                                id="contactPerson"
                                                required
                                                className={inputClass}
                                                value={partner.contactPerson}
                                                onChange={(e) =>
                                                    setPartner({ ...partner, contactPerson: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="partnerEmail" className={labelClass}>
                                                Email *
                                            </label>
                                            <input
                                                id="partnerEmail"
                                                type="email"
                                                required
                                                className={inputClass}
                                                value={partner.email}
                                                onChange={(e) => setPartner({ ...partner, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="partnerPhone" className={labelClass}>
                                                Phone
                                            </label>
                                            <input
                                                id="partnerPhone"
                                                type="tel"
                                                className={inputClass}
                                                value={partner.phone || ""}
                                                onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="organizationType" className={labelClass}>
                                            Organization Type *
                                        </label>
                                        <select
                                            id="organizationType"
                                            className={inputClass}
                                            value={partner.organizationType}
                                            onChange={(e) =>
                                                setPartner({
                                                    ...partner,
                                                    organizationType: e.target.value as PartnerType,
                                                })
                                            }
                                        >
                                            {ORG_TYPES.map((o) => (
                                                <option key={o.value} value={o.value}>
                                                    {o.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <CheckboxGroup
                                        label="Partnership Interest"
                                        options={PARTNERSHIP_INTERESTS}
                                        selected={partner.partnershipInterest}
                                        onChange={(partnershipInterest) =>
                                            setPartner({ ...partner, partnershipInterest })
                                        }
                                        required
                                    />
                                    <div className="flex flex-col">
                                        <label htmlFor="partnerMessage" className={labelClass}>
                                            Message *
                                        </label>
                                        <textarea
                                            id="partnerMessage"
                                            required
                                            rows={4}
                                            className={`${inputClass} resize-y`}
                                            value={partner.message}
                                            onChange={(e) => setPartner({ ...partner, message: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

                            {activeTab === "ambassador" && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambFullName" className={labelClass}>
                                                Full Name *
                                            </label>
                                            <input
                                                id="ambFullName"
                                                required
                                                className={inputClass}
                                                value={ambassador.fullName}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, fullName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambEmail" className={labelClass}>
                                                Email *
                                            </label>
                                            <input
                                                id="ambEmail"
                                                type="email"
                                                required
                                                className={inputClass}
                                                value={ambassador.email}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambPhone" className={labelClass}>
                                                Phone *
                                            </label>
                                            <input
                                                id="ambPhone"
                                                type="tel"
                                                required
                                                className={inputClass}
                                                value={ambassador.phone}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, phone: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambDob" className={labelClass}>
                                                Date of Birth *
                                            </label>
                                            <input
                                                id="ambDob"
                                                type="date"
                                                required
                                                className={inputClass}
                                                value={ambassador.dateOfBirth}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, dateOfBirth: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambGender" className={labelClass}>
                                                Gender *
                                            </label>
                                            <select
                                                id="ambGender"
                                                className={inputClass}
                                                value={ambassador.gender}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        gender: e.target.value as Gender,
                                                    })
                                                }
                                            >
                                                {GENDERS.map((g) => (
                                                    <option key={g.value} value={g.value}>
                                                        {g.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambCity" className={labelClass}>
                                                City *
                                            </label>
                                            <input
                                                id="ambCity"
                                                required
                                                className={inputClass}
                                                value={ambassador.city}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, city: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambInstitution" className={labelClass}>
                                                Institution Name *
                                            </label>
                                            <input
                                                id="ambInstitution"
                                                required
                                                className={inputClass}
                                                value={ambassador.institutionName}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        institutionName: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambInstType" className={labelClass}>
                                                Institution Type *
                                            </label>
                                            <select
                                                id="ambInstType"
                                                className={inputClass}
                                                value={ambassador.institutionType}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        institutionType: e.target
                                                            .value as AmbassadorApplicationData["institutionType"],
                                                    })
                                                }
                                            >
                                                <option value="HIGH_SCHOOL">High School</option>
                                                <option value="UNIVERSITY">University</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambGrade" className={labelClass}>
                                                Grade / Year *
                                            </label>
                                            <input
                                                id="ambGrade"
                                                required
                                                className={inputClass}
                                                value={ambassador.gradeLevel}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, gradeLevel: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambField" className={labelClass}>
                                                Field of Study
                                            </label>
                                            <input
                                                id="ambField"
                                                className={inputClass}
                                                value={ambassador.fieldOfStudy || ""}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, fieldOfStudy: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="ambMotivation" className={labelClass}>
                                            Motivation Letter *
                                        </label>
                                        <textarea
                                            id="ambMotivation"
                                            required
                                            rows={4}
                                            className={`${inputClass} resize-y`}
                                            value={ambassador.motivationLetter}
                                            onChange={(e) =>
                                                setAmbassador({ ...ambassador, motivationLetter: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="ambLeadership" className={labelClass}>
                                            Leadership Experience
                                        </label>
                                        <textarea
                                            id="ambLeadership"
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={ambassador.leadershipExperience || ""}
                                            onChange={(e) =>
                                                setAmbassador({
                                                    ...ambassador,
                                                    leadershipExperience: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <CheckboxGroup
                                        label="Tech / Leadership Skills"
                                        options={TECH_SKILLS}
                                        selected={ambassador.techSkills || []}
                                        onChange={(techSkills) => setAmbassador({ ...ambassador, techSkills })}
                                    />
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambHours" className={labelClass}>
                                                Hours / Week *
                                            </label>
                                            <input
                                                id="ambHours"
                                                type="number"
                                                min={1}
                                                max={40}
                                                required
                                                className={inputClass}
                                                value={ambassador.hoursPerWeek}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        hoursPerWeek: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambClub" className={labelClass}>
                                                Proposed Club Name *
                                            </label>
                                            <input
                                                id="ambClub"
                                                required
                                                className={inputClass}
                                                value={ambassador.proposedClubName}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        proposedClubName: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambMembers" className={labelClass}>
                                                Estimated Members *
                                            </label>
                                            <input
                                                id="ambMembers"
                                                type="number"
                                                min={1}
                                                required
                                                className={inputClass}
                                                value={ambassador.estimatedMembers}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        estimatedMembers: Number(e.target.value),
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <CheckboxGroup
                                        label="Support Needed"
                                        options={SUPPORT_NEEDED}
                                        selected={ambassador.supportNeeded || []}
                                        onChange={(supportNeeded) =>
                                            setAmbassador({ ...ambassador, supportNeeded })
                                        }
                                    />
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="ambCv" className={labelClass}>
                                                CV Document (Optional)
                                            </label>
                                            <input
                                                id="ambCv"
                                                type="file"
                                                accept={CV_ACCEPT}
                                                className={inputClass}
                                                onChange={(e) => setAmbassadorCv(e.target.files?.[0] || null)}
                                            />
                                            <span className="mt-1 text-[11px] text-text-muted">PDF, DOC, or DOCX · max 5 MB</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambRec" className={labelClass}>
                                                Recommendation Letter URL (Optional)
                                            </label>
                                            <input
                                                id="ambRec"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://"
                                                value={ambassador.recommendationLetterUrl || ""}
                                                onChange={(e) =>
                                                    setAmbassador({
                                                        ...ambassador,
                                                        recommendationLetterUrl: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="ambPortfolio" className={labelClass}>
                                                Portfolio URL (Optional)
                                            </label>
                                            <input
                                                id="ambPortfolio"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://"
                                                value={ambassador.portfolioUrl || ""}
                                                onChange={(e) =>
                                                    setAmbassador({ ...ambassador, portfolioUrl: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3 border border-border rounded-xl p-4 bg-bg-cream">
                                        {(
                                            [
                                                ["commitHours", "I can commit the stated hours per week"],
                                                ["commitClub", "I will launch or lead a campus tech club"],
                                                ["commitBootcamp", "I will attend ambassador onboarding / bootcamp"],
                                                ["agreeConduct", "I agree to the code of conduct"],
                                            ] as const
                                        ).map(([key, text]) => (
                                            <label key={key} className="flex items-start gap-2 text-[13px] text-black cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    className="mt-0.5 accent-accent"
                                                    checked={ambassador[key]}
                                                    onChange={(e) =>
                                                        setAmbassador({ ...ambassador, [key]: e.target.checked })
                                                    }
                                                />
                                                {text} *
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}

                            {activeTab === "volunteer" && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="volName" className={labelClass}>
                                                Full Name *
                                            </label>
                                            <input
                                                id="volName"
                                                required
                                                className={inputClass}
                                                value={volunteer.fullName}
                                                onChange={(e) =>
                                                    setVolunteer({ ...volunteer, fullName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="volEmail" className={labelClass}>
                                                Email *
                                            </label>
                                            <input
                                                id="volEmail"
                                                type="email"
                                                required
                                                className={inputClass}
                                                value={volunteer.email}
                                                onChange={(e) =>
                                                    setVolunteer({ ...volunteer, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="volPhone" className={labelClass}>
                                                Phone *
                                            </label>
                                            <input
                                                id="volPhone"
                                                type="tel"
                                                required
                                                className={inputClass}
                                                value={volunteer.phone}
                                                onChange={(e) =>
                                                    setVolunteer({ ...volunteer, phone: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="volCity" className={labelClass}>
                                                City *
                                            </label>
                                            <input
                                                id="volCity"
                                                required
                                                className={inputClass}
                                                value={volunteer.city}
                                                onChange={(e) =>
                                                    setVolunteer({ ...volunteer, city: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="volRole" className={labelClass}>
                                                Primary Role *
                                            </label>
                                            <select
                                                id="volRole"
                                                className={inputClass}
                                                value={volunteer.primaryRole}
                                                onChange={(e) =>
                                                    setVolunteer({
                                                        ...volunteer,
                                                        primaryRole: e.target.value as VolunteerRole,
                                                    })
                                                }
                                            >
                                                {VOLUNTEER_ROLES.map((r) => (
                                                    <option key={r.value} value={r.value}>
                                                        {r.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="volAvail" className={labelClass}>
                                                Availability *
                                            </label>
                                            <select
                                                id="volAvail"
                                                className={inputClass}
                                                value={volunteer.availability}
                                                onChange={(e) =>
                                                    setVolunteer({
                                                        ...volunteer,
                                                        availability: e.target.value as Availability,
                                                    })
                                                }
                                            >
                                                {AVAILABILITY_OPTS.map((a) => (
                                                    <option key={a.value} value={a.value}>
                                                        {a.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="volHours" className={labelClass}>
                                                Hours / Week
                                            </label>
                                            <input
                                                id="volHours"
                                                type="number"
                                                min={1}
                                                max={40}
                                                className={inputClass}
                                                value={volunteer.hoursPerWeek ?? ""}
                                                onChange={(e) =>
                                                    setVolunteer({
                                                        ...volunteer,
                                                        hoursPerWeek: e.target.value
                                                            ? Number(e.target.value)
                                                            : undefined,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="volPortfolio" className={labelClass}>
                                            Portfolio / LinkedIn URL
                                        </label>
                                        <input
                                            id="volPortfolio"
                                            type="url"
                                            className={inputClass}
                                            placeholder="https://"
                                            value={volunteer.portfolioLink || ""}
                                            onChange={(e) =>
                                                setVolunteer({ ...volunteer, portfolioLink: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="volBg" className={labelClass}>
                                            Professional Background *
                                        </label>
                                        <textarea
                                            id="volBg"
                                            required
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={volunteer.professionalBackground}
                                            onChange={(e) =>
                                                setVolunteer({
                                                    ...volunteer,
                                                    professionalBackground: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="volMotivation" className={labelClass}>
                                            Motivation *
                                        </label>
                                        <textarea
                                            id="volMotivation"
                                            required
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={volunteer.motivation}
                                            onChange={(e) =>
                                                setVolunteer({ ...volunteer, motivation: e.target.value })
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            {activeTab === "internship" && (
                                <>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intName" className={labelClass}>
                                                Full Name *
                                            </label>
                                            <input
                                                id="intName"
                                                required
                                                className={inputClass}
                                                value={internship.fullName}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, fullName: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intEmail" className={labelClass}>
                                                Email *
                                            </label>
                                            <input
                                                id="intEmail"
                                                type="email"
                                                required
                                                className={inputClass}
                                                value={internship.email}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, email: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intPhone" className={labelClass}>
                                                Phone *
                                            </label>
                                            <input
                                                id="intPhone"
                                                type="tel"
                                                required
                                                className={inputClass}
                                                value={internship.phone}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, phone: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intLinkedin" className={labelClass}>
                                                LinkedIn URL
                                            </label>
                                            <input
                                                id="intLinkedin"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://"
                                                value={internship.linkedinUrl || ""}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, linkedinUrl: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intInstitution" className={labelClass}>
                                                Institution *
                                            </label>
                                            <input
                                                id="intInstitution"
                                                required
                                                className={inputClass}
                                                value={internship.institution}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, institution: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intField" className={labelClass}>
                                                Field of Study *
                                            </label>
                                            <input
                                                id="intField"
                                                required
                                                className={inputClass}
                                                value={internship.fieldOfStudy}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, fieldOfStudy: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intYear" className={labelClass}>
                                                Year of Study *
                                            </label>
                                            <input
                                                id="intYear"
                                                required
                                                className={inputClass}
                                                placeholder="e.g. 3rd Year"
                                                value={internship.yearOfStudy}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, yearOfStudy: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intGrad" className={labelClass}>
                                                Graduation Date *
                                            </label>
                                            <input
                                                id="intGrad"
                                                type="date"
                                                required
                                                className={inputClass}
                                                value={internship.graduationDate}
                                                onChange={(e) =>
                                                    setInternship({
                                                        ...internship,
                                                        graduationDate: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intDept" className={labelClass}>
                                                Department *
                                            </label>
                                            <select
                                                id="intDept"
                                                className={inputClass}
                                                value={internship.department}
                                                onChange={(e) =>
                                                    setInternship({
                                                        ...internship,
                                                        department: e.target
                                                            .value as InternshipApplicationData["department"],
                                                    })
                                                }
                                            >
                                                {INTERN_DEPARTMENTS.map((d) => (
                                                    <option key={d.value} value={d.value}>
                                                        {d.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intDuration" className={labelClass}>
                                                Duration *
                                            </label>
                                            <select
                                                id="intDuration"
                                                className={inputClass}
                                                value={internship.duration}
                                                onChange={(e) =>
                                                    setInternship({
                                                        ...internship,
                                                        duration: e.target
                                                            .value as InternshipApplicationData["duration"],
                                                    })
                                                }
                                            >
                                                {INTERN_DURATIONS.map((d) => (
                                                    <option key={d.value} value={d.value}>
                                                        {d.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intStart" className={labelClass}>
                                                Start Date *
                                            </label>
                                            <input
                                                id="intStart"
                                                type="date"
                                                required
                                                className={inputClass}
                                                value={internship.startDate}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, startDate: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <label className="flex items-center gap-2 text-[13px] text-black cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="accent-accent"
                                            checked={internship.fullTime}
                                            onChange={(e) =>
                                                setInternship({ ...internship, fullTime: e.target.checked })
                                            }
                                        />
                                        I can commit full-time during the internship
                                    </label>
                                    <CheckboxGroup
                                        label="Skills"
                                        options={INTERN_SKILLS}
                                        selected={internship.skills || []}
                                        onChange={(skills) => setInternship({ ...internship, skills })}
                                    />
                                    <div className="flex flex-col">
                                        <label htmlFor="intExperience" className={labelClass}>
                                            Relevant Experience
                                        </label>
                                        <textarea
                                            id="intExperience"
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={internship.experience || ""}
                                            onChange={(e) =>
                                                setInternship({ ...internship, experience: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intProjects" className={labelClass}>
                                                Project Links
                                            </label>
                                            <input
                                                id="intProjects"
                                                className={inputClass}
                                                placeholder="Portfolio, Behance, etc."
                                                value={internship.projectLinks || ""}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, projectLinks: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intGithub" className={labelClass}>
                                                GitHub URL
                                            </label>
                                            <input
                                                id="intGithub"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://github.com/..."
                                                value={internship.githubUrl || ""}
                                                onChange={(e) =>
                                                    setInternship({ ...internship, githubUrl: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="intMotivation" className={labelClass}>
                                            Why Afroec Hub? *
                                        </label>
                                        <textarea
                                            id="intMotivation"
                                            required
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={internship.motivationAfroec}
                                            onChange={(e) =>
                                                setInternship({
                                                    ...internship,
                                                    motivationAfroec: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="intGoals" className={labelClass}>
                                            Learning Goals *
                                        </label>
                                        <textarea
                                            id="intGoals"
                                            required
                                            rows={3}
                                            className={`${inputClass} resize-y`}
                                            value={internship.learningGoals}
                                            onChange={(e) =>
                                                setInternship({ ...internship, learningGoals: e.target.value })
                                            }
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col">
                                            <label htmlFor="intCv" className={labelClass}>
                                                Upload CV Document *
                                            </label>
                                            <input
                                                id="intCv"
                                                type="file"
                                                accept={CV_ACCEPT}
                                                required
                                                className={inputClass}
                                                onChange={(e) => setInternshipCv(e.target.files?.[0] || null)}
                                            />
                                            <span className="mt-1 text-[11px] text-text-muted">PDF, DOC, or DOCX · max 5 MB</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intCover" className={labelClass}>
                                                Cover Letter URL
                                            </label>
                                            <input
                                                id="intCover"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://"
                                                value={internship.coverLetterUrl || ""}
                                                onChange={(e) =>
                                                    setInternship({
                                                        ...internship,
                                                        coverLetterUrl: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="intTranscript" className={labelClass}>
                                                Transcript URL
                                            </label>
                                            <input
                                                id="intTranscript"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://"
                                                value={internship.transcriptUrl || ""}
                                                onChange={(e) =>
                                                    setInternship({
                                                        ...internship,
                                                        transcriptUrl: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3 border border-border rounded-xl p-4 bg-bg-cream">
                                        {(
                                            [
                                                ["agreeUnpaid", "I understand this internship may be unpaid"],
                                                ["agreeDuration", "I can commit to the selected duration"],
                                                ["agreePolicies", "I agree to Afroec Hub policies and code of conduct"],
                                            ] as const
                                        ).map(([key, text]) => (
                                            <label key={key} className="flex items-start gap-2 text-[13px] text-black cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    required
                                                    className="mt-0.5 accent-accent"
                                                    checked={internship[key]}
                                                    onChange={(e) =>
                                                        setInternship({ ...internship, [key]: e.target.checked })
                                                    }
                                                />
                                                {text} *
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-pill bg-accent text-black hover:bg-accent-hover text-center font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        `Submit ${meta.label} Application`
                                    )}
                                </button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}
