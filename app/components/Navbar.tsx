"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-psc" },
  { label: "Events", href: "#" },
  { label: "Success Stories", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact us", href: "#" },
];

const courseCategories = [
  {
    label: "Online Courses",
    courses: [
      {
        label: "AI Integrated Digital Marketing",
        href: "/courses/ai-integrated-digital-marketing",
      },
      { label: "Business Administration & Hospital Management", href: "#" },
    ],
  },
  {
    label: "Offline Courses",
    courses: [
      {
        label: "AI Integrated Digital Marketing",
        href: "/courses/ai-integrated-digital-marketing",
      },
      { label: "Business Administration & Hospital Management", href: "#" },
      {
        label: "Professional Diploma in AI integrated Accounting & Taxation",
        href: "#",
      },
    ],
  },
];

function ChevronDown() {
  return (
    <svg
      className={styles.chevron}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L5 5L9 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
      <path
        d="M1.5 1L6.5 6L1.5 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoursesDropdown() {
  return (
    <ul className={styles.dropdown}>
      {courseCategories.map((category) => (
        <li key={category.label} className={styles.dropdownItem}>
          <span>{category.label}</span>
          <ChevronRight />

          <ul className={styles.submenu}>
            {category.courses.map((course) => (
              <li key={course.label}>
                <a href={course.href} className={styles.submenuLink}>
                  {course.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => href !== "#" && pathname === href;
  const linkClass = (href: string) =>
    `${styles.navLink} ${isActive(href) ? styles.navLinkActive : ""}`;

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          <Image
            src="/logo-main.png"
            alt="Professional Skill Campus"
            width={142}
            height={48}
            priority
          />
        </a>

        <nav className={styles.nav}>
          <a href="/" className={linkClass("/")}>
            Home
          </a>
          <a href="/about-psc" className={linkClass("/about-psc")}>
            About
          </a>

          <div className={styles.navItem}>
            <a
              href="#"
              className={`${styles.navLink} ${
                pathname.startsWith("/courses") ? styles.navLinkActive : ""
              }`}
            >
              Courses
              <ChevronDown />
            </a>
            <CoursesDropdown />
          </div>

          <a href="#" className={styles.navLink}>
            Events
          </a>
          <a href="#" className={styles.navLink}>
            Success Stories
          </a>
          <a href="#" className={styles.navLink}>
            Blogs
          </a>
          <a href="#" className={styles.navLink}>
            Contact us
          </a>
        </nav>

        <a href="#" className={styles.cta}>
          Get an Admission
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span
            className={`${styles.bar} ${isOpen ? styles.barTopOpen : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isOpen ? styles.barMidOpen : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isOpen ? styles.barBottomOpen : ""}`}
          ></span>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.mobileNavLink} ${
                isActive(link.href) ? styles.mobileNavLinkActive : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <span className={styles.mobileNavLink}>Courses</span>
          <div className={styles.mobileCourses}>
            {courseCategories.map((category) => (
              <div key={category.label} className={styles.mobileCourseGroup}>
                <p className={styles.mobileCourseCategory}>
                  {category.label}
                </p>
                {category.courses.map((course) => (
                  <a
                    key={course.label}
                    href={course.href}
                    className={styles.mobileCourseLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {course.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </nav>
        <a href="#" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
          Get an Admission
        </a>
      </div>
    </header>
  );
}
