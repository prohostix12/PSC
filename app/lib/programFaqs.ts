import type { ProgramFaq } from "./programUtils";

const digitalMarketingFaqs: ProgramFaq[] = [
  {
    question: "What is digital marketing?",
    answer: "Digital marketing is the promotion of products, services, or brands through digital channels such as search engines, social media platforms, websites, email, and mobile applications. It encompasses strategies including SEO, social media marketing, content marketing, email marketing, PPC advertising, and analytics."
  },
  {
    question: "Which is the best digital marketing institute in Kerala?",
    answer: "Professional Skill Campus is widely recognized for its AI-integrated curriculum, hands-on live projects, expert mentorship, and consistent placement track record for students across Malappuram and beyond."
  },
  {
    question: "What are the course fees for digital marketing training?",
    answer: "Course fees depend on the mode you choose and any ongoing batch offers. Reach out to our admissions team for the latest fee structure and available installment options."
  },
  {
    question: "How long is the digital marketing course duration?",
    answer: "The AI Integrated Digital Marketing program runs for 4 months, with live projects, real campaign exposure, and expert mentorship."
  },
  {
    question: "Do you provide placement assistance after the course?",
    answer: "Yes. Every student gets dedicated placement support, including resume guidance, interview preparation, and introductions to hiring partners."
  },
  {
    question: "What qualifications are needed to join a digital marketing course?",
    answer: "There is no strict qualification barrier. Students, graduates, career switchers, and working professionals can join, starting from the fundamentals."
  },
  {
    question: "What are the career opportunities after completing this course?",
    answer: "Graduates can pursue roles such as SEO Specialist, Social Media Manager, Google Ads Specialist, Content Marketing Specialist, Digital Marketing Executive, or start freelancing and launch their own agency."
  },
  {
    question: "What is the salary after completing a digital marketing course?",
    answer: "Starting salaries typically range from Rs. 15,000 to Rs. 35,000 per month for freshers in Kerala and grow with experience. Freelancers and agency owners can earn significantly more."
  },
  {
    question: "How does AI integration work in your digital marketing course?",
    answer: "Students get hands-on experience with AI tools for content, ad copy, SEO, video creation, and marketing automation, combined with practical marketing strategy."
  },
  {
    question: "Is the digital marketing course suitable for beginners with no experience?",
    answer: "Absolutely. The program takes complete beginners from the basics through practical training to a job-ready, AI-powered digital marketing skill set."
  }
];

const accountingFaqs: ProgramFaq[] = [
  {
    question: "What is the Accounting Course offered by Professional Skill Campus Malappuram?",
    answer: "It is an offline Professional Diploma in AI Integrated Accounting & Taxation covering accounting principles, income tax and GST filing, GCC VAT, Tally Prime, Zoho Books, Odoo, and Power BI."
  },
  {
    question: "Are the trainers experienced professionals?",
    answer: "Yes. Students learn from experienced accounting professionals through real-world case studies, live projects, and hands-on software practice."
  },
  {
    question: "What makes Professional Skill Campus Malappuram's Accounting Course unique?",
    answer: "The course blends accounting fundamentals with AI-integrated tools and modern analytics such as Power BI for a future-ready skill set."
  },
  {
    question: "Is the course conducted entirely offline?",
    answer: "Yes. The Accounting & Taxation program runs offline over 4 months with direct classroom training and mentorship."
  }
];

const businessFaqs: ProgramFaq[] = [
  {
    question: "What makes Professional Skill Campus Malappuram different from other institutes?",
    answer: "Professional Skill Campus combines business administration and hospital management with experienced faculty, AI-integrated learning, real-time projects, and dedicated placement support."
  },
  {
    question: "Who can join the Business Administration course at Professional Skill Campus Malappuram?",
    answer: "The program is open to students, graduates, career switchers, and working professionals. There is no strict qualification barrier."
  },
  {
    question: "What is the duration of the Best Business Administration courses in Malappuram?",
    answer: "The Business Administration & Hospital Management program runs for 6 months and is available in offline and online formats."
  },
  {
    question: "Does Professional Skill Campus Malappuram offer placement assistance?",
    answer: "Yes. Students receive placement and internship support, expert mentorship, and access to real-time business and hospital projects."
  },
  {
    question: "Is there any soft skill or personal grooming training included?",
    answer: "Yes. Soft skills and personal grooming are core parts of both the Business Administration and Hospital Management tracks."
  }
];

export function getExistingProgramFaqs(name: string): ProgramFaq[] {
  const normalizedName = name.toLowerCase();
  if (normalizedName.includes("digital marketing")) return digitalMarketingFaqs;
  if (normalizedName.includes("accounting") || normalizedName.includes("taxation")) return accountingFaqs;
  if (normalizedName.includes("business administration") || normalizedName.includes("hospital management")) return businessFaqs;
  return [];
}
