"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "/about-psc" },
  { label: "Courses", href: "#", hasDropdown: true },
  { label: "Events", href: "#" },
  { label: "Success Stories", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Contact us", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
              {link.hasDropdown && (
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
              )}
            </a>
          ))}
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
              className={styles.mobileNavLink}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
          Get an Admission
        </a>
      </div>
    </header>
  );
}
