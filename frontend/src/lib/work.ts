import agricultureErpImg from "@/assets/agriculture_erp.png";
import schoolManagementImg from "@/assets/school_management.png";
import companyPortfolioImg from "@/assets/company_portfolio.png";

export const workProjects = [
  {
    name: "Trust Agro ERP",
    category: "Business system",
    description:
      "An agriculture ERP for Trust Agro, covering farm operations such as inventory, veterinary care, pharmacy, finance, and role-based access.",
    image: agricultureErpImg,
    imageAlt: "Agriculture field representing the Trust Agro ERP system",
  },
  {
    name: "School of Diamond",
    category: "School management",
    description:
      "A school management system for School of Diamond, for enrollment, attendance, grades, timetables, and communication between the school and families.",
    image: schoolManagementImg,
    imageAlt: "School campus representing the School of Diamond management system",
  },
  {
    name: "Company profile websites",
    category: "Web",
    description:
      "Company profile websites for organizations that need a clear public presence — who they are, what they do, and how to reach them.",
    image: companyPortfolioImg,
    imageAlt: "A company website shown on a laptop",
  },
] as const;
