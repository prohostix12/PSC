"use client";

import { useState } from "react";
import styles from "./CourseCurriculum.module.css";

const tabs = ["Overview", "Curriculum", "Benefits"] as const;

const details = [
  { label: "Duration: 4 months" },
  { label: "Type: Offline / Online" },
  { label: "Intake: 30" },
];

const includes = [
  "Certificate of completion",
  "Live projects & real campaigns",
  "1:1 mentorship from industry experts",
  "AI-integrated tools & workflows",
  "Dedicated placement assistance",
  "Lifetime access to course resources",
  "Active learner community access",
];

const faqs = [
  {
    question: "Do I need prior marketing experience?",
    answer:
      "No. The course starts from the fundamentals with Life Lab sessions before moving into advanced digital marketing skills.",
  },
  {
    question: "Is the certificate industry recognized?",
    answer:
      "Yes, you receive a globally recognized certificate on completing the program along with a project portfolio.",
  },
  {
    question: "Will I get placement support?",
    answer:
      "Yes, dedicated placement assistance is included so you can confidently step into your first digital marketing role.",
  },
];

const modules = [
  {
    title: "Module 1: Life Lab & Digital Foundation",
    content:
      "We start with the mindset and fundamentals. Life Lab sessions help you understand the digital economy, career opportunities, and how to think like a successful digital marketer. You'll also cover computer basics to ensure you're comfortable with the technology before diving into marketing strategies.",
  },
  {
    title: "Module 2: Understanding Digital Marketing Fundamentals",
    content:
      "Before jumping into tools and tactics, you need to understand the big picture. This module covers what digital marketing really is, how different channels work together, how customers behave online, and how to create strategies that actually work for real businesses.",
  },
  {
    title: "Module 3: Design & Content Creation",
    content:
      "Great marketing needs great content. Learn to create eye-catching graphics, engaging social media posts, and professional marketing materials using Canva and other design tools. We'll also introduce you to AI-powered design tools that make creating stunning visuals faster and easier.",
  },
  {
    title: "Module 4: Content Marketing & Copywriting",
    content:
      "Content is what attracts customers and keeps them engaged. Master the art of writing compelling content for websites, blogs, social media, and ads. Learn storytelling techniques, SEO writing, and how to use AI tools like ChatGPT and Jasper AI to create content that converts.",
  },
  {
    title: "Module 5: Website Development with WordPress",
    content:
      "Every digital marketer needs to understand how websites work. Learn to build professional websites using WordPress—no coding required. Understand how to set up hosting, choose themes, customize layouts, and create landing pages that drive results.",
  },
  {
    title: "Module 6: Search Engine Optimization (SEO)",
    content:
      "This is where the magic happens. Learn how to get websites ranked on Google's first page. Cover keyword research, on-page SEO, technical SEO, link building, and local SEO strategies. Master tools like Google Search Console, SEMrush, and AI-powered SEO tools that give you competitive advantages.",
  },
  {
    title: "Module 7: Search Engine Marketing & Google Ads",
    content:
      "Paid advertising is the fastest way to get results. Master Google Ads from basics to advanced strategies. Learn to create search ads, display ads, shopping ads, and YouTube ads. Understand bidding strategies, quality score, conversion tracking with Google Analytics and Google Tag Manager, and how to maximize ROI on every rupee spent.",
  },
  {
    title: "Module 8: Social Media Marketing",
    content:
      "Social media is where your customers spend their time. Learn to create winning strategies for Facebook, Instagram, LinkedIn, Twitter, and other platforms. Understand organic growth tactics, content calendars, community management, and how to run successful paid campaigns on Facebook Ads Manager.",
  },
  {
    title: "Module 9: Email Marketing & Marketing Automation",
    content:
      "Among all marketing methods, email marketing still gives the best results for the money you spend. Learn to build email lists, create effective email campaigns, write compelling subject lines and copy, and use automation tools to nurture leads and drive sales while you sleep.",
  },
  {
    title: "Module 10: Video Marketing & Editing",
    content:
      "Video content is taking over the internet. Learn video marketing strategies for YouTube, Instagram Reels, and Facebook. Master video editing tools and AI-powered video creation tools that help you produce professional content quickly.",
  },
  {
    title: "Module 11: AI Tools for Digital Marketing",
    content:
      "This is what sets our course apart. Learn to leverage cutting-edge AI tools that are transforming digital marketing:",
    list: [
      "ChatGPT + AIPRM Plugin: Create content, write ad copy, generate ideas",
      "Google Gemini: Research, analysis, and content creation",
      "Jasper AI: Professional marketing copy and campaigns",
      "AI Video Tools: Create professional videos without expensive equipment",
      "Cloud AI Solutions: Automation and advanced marketing workflows",
    ],
  },
  {
    title: "Module 12: Analytics & Performance Tracking",
    content:
      "Data drives decisions. Master Google Analytics 4, Google Tag Manager, and other analytics tools. Learn to track website traffic, understand user behavior, measure campaign performance, and create reports that show real business impact.",
  },
];

const careerRoles = [
  {
    role: "SEO Specialist / SEO Executive",
    description:
      "Help businesses rank on Google and drive organic traffic. Our SEO training in Kerala prepares you thoroughly for this high-demand role. SEO specialists are in huge demand with starting salaries ranging from ₹15,000 to ₹30,000 per month for freshers, and our SEO course in Kerala ensures you're industry-ready from day one.",
  },
  {
    role: "Social Media Manager",
    description:
      "Manage social media accounts for brands, create content strategies, run campaigns, and build online communities. One of the most creative roles in digital marketing.",
  },
  {
    role: "Google Ads Specialist / PPC Executive",
    description:
      "Manage paid advertising campaigns for businesses. Companies pay well for people who can generate results through Google Ads and Facebook Ads.",
  },
  {
    role: "Content Marketing Specialist",
    description:
      "Create content strategies, write blogs, manage content calendars, and help brands tell their stories online. Perfect for people who love writing and creativity.",
  },
  {
    role: "Digital Marketing Executive",
    description:
      "Handle multiple aspects of digital marketing for a company—a great starting point that gives you exposure to everything before specializing.",
  },
  {
    role: "Freelance Digital Marketer",
    description:
      "Work independently with multiple clients, set your own rates, work from anywhere, and build your own business. Many of our students earn ₹50,000+ per month freelancing.",
  },
  {
    role: "Start Your Own Digital Marketing Agency",
    description:
      "Once you master the skills and build some experience, start your own agency and serve clients. Scale up your business and build a team.",
  },
];

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="#2451e0"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7.25" stroke="#2451e0" strokeWidth="1.5" />
      <path
        d="M5 8.2L7 10.2L11.2 5.8"
        stroke="#2451e0"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <circle cx="13" cy="13" r="12" stroke="#ffffff" strokeWidth="1.5" />
      <path d="M10.5 8.5L18 13L10.5 17.5V8.5Z" fill="#ffffff" />
    </svg>
  );
}

function OverviewContent() {
  return (
    <div className={styles.overview}>
      <p>
        <strong>Best digital marketing institute in Malappuram</strong>,{" "}
        <strong>Skillage Academy</strong>, is widely recognized for
        delivering future focused training through{" "}
        <strong>
          India&apos;s First Gamified AI-Integrated Digital Marketing
          Institute
        </strong>{" "}
        model. Designed to meet modern industry demands, the academy equips
        learners with practical expertise, strategic thinking and AI-powered
        skills required to succeed in today&apos;s competitive digital
        economy.
      </p>

      <p>
        As businesses rapidly shift toward online platforms, the need for
        highly skilled marketers continues to grow. Skillage Academy
        addresses this demand by offering an industry aligned{" "}
        <strong>Best Digital Marketing Institute in Malappuram</strong>{" "}
        emphasizes real-world application over theoretical learning. Whether
        you are a student starting your career, a professional planning a
        switch, or an entrepreneur aiming to scale your brand, the program
        prepares you for measurable success.
      </p>

      <p>
        Strategically located in Malappuram, Skillage has earned a strong
        reputation as the trusted{" "}
        <strong>best digital marketing institute in Malappuram</strong> by
        consistently producing job-ready professionals. The curriculum
        covers high demand specializations, including{" "}
        <strong>SEO training in Malappuram</strong>, social media marketing,
        Google Ads, performance marketing, branding, analytics, content
        strategy, and marketing automation.
      </p>

      <p>
        What sets Skillage apart is its AI-integrated learning environment.
        Students are trained to leverage advanced tools such as ChatGPT and
        intelligent marketing platforms to improve campaign efficiency,
        enhance creativity, and make data driven decisions capabilities that
        leading employers actively look for.
      </p>

      <p>
        The program is structured to deliver maximum career impact within
        just four months. Through live projects, real campaign exposure,
        globally recognized certifications, and expert mentorship, learners
        build a strong portfolio that reflects both skill and experience.
        Dedicated placement support further ensures that students
        confidently step into the professional world.
      </p>

      <p>
        For individuals searching for the{" "}
        <strong>best digital marketing course in Kerala</strong> or a
        reliable{" "}
        <strong>best digital marketing institute in Malappuram</strong>,
        Skillage Academy provides a premium educational experience rooted in
        innovation, practical learning, and career growth. The mission is
        clear: transform ambitious learners into confident digital
        professionals ready to thrive in a rapidly evolving marketplace.
      </p>

      <p>
        If your goal is to secure a high-growth career in digital marketing,
        master AI-driven strategies, and gain skills that remain relevant
        for years to come, Skillage Academy is the place where your
        transformation begins.
      </p>
    </div>
  );
}

function BenefitsContent() {
  return (
    <div className={styles.benefits}>
      <p>
        The digital marketing field is bursting with opportunities. After
        completing our digital marketing course in Kerala, you can pursue
        various exciting career paths. Students from our digital marketing
        institute in Malappuram have successfully launched careers across
        multiple domains:
      </p>

      <div className={styles.roleList}>
        {careerRoles.map((item) => (
          <div key={item.role} className={styles.roleItem}>
            <h4 className={styles.roleTitle}>{item.role}</h4>
            <p className={styles.roleDescription}>{item.description}</p>
          </div>
        ))}
      </div>

      <p>
        The average starting salary for digital marketing professionals in
        Kerala ranges from ₹15,000 to ₹35,000 per month, depending on skills
        and location. With 1–2 years of experience, this can quickly grow to
        ₹40,000-₹80,000 per month. Freelancers and agency owners often earn
        much more. As one of the best digital marketing institutes in Kerala
        with proven placement records, Skillage Academy has helped countless
        students achieve these career milestones and beyond.
      </p>
    </div>
  );
}

function CurriculumContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.curriculum}>
      <h3 className={styles.curriculumHeading}>Complete Course Module</h3>

      <div className={styles.accordion}>
        {modules.map((module, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={module.title} className={styles.accordionItem}>
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{module.title}</span>
                <span className={styles.accordionIcon}>
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className={styles.accordionContent}>
                  <p>{module.content}</p>
                  {module.list && (
                    <ul className={styles.accordionList}>
                      {module.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CourseCurriculum() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
    "Overview"
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>What you will learn?</h2>

      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.tabActive : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.panel}>
            {activeTab === "Overview" && <OverviewContent />}
            {activeTab === "Curriculum" && <CurriculumContent />}
            {activeTab === "Benefits" && <BenefitsContent />}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.videoCard}>
            <span className={styles.playButton}>
              <PlayIcon />
            </span>
          </div>

          <div className={styles.detailsCard}>
            {details.map((detail) => (
              <div key={detail.label} className={styles.detailRow}>
                <ArrowIcon />
                <span>{detail.label}</span>
              </div>
            ))}

            <a href="#" className={styles.consultButton}>
              Book a Free Consultation
            </a>
            <a href="#" className={styles.brochureButton}>
              Download Brochure
            </a>
          </div>

          <div className={styles.includesCard}>
            <h4 className={styles.sidebarHeading}>This Course Includes</h4>
            <ul className={styles.includesList}>
              {includes.map((item) => (
                <li key={item} className={styles.includesItem}>
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.faqCard}>
            <h4 className={styles.sidebarHeading}>Quick Questions</h4>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <div key={faq.question} className={styles.faqItem}>
                  <p className={styles.faqQuestion}>{faq.question}</p>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
