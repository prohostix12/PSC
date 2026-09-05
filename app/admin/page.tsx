"use client";

import { useState } from "react";
import AdminNavbar, { type AdminView } from "../components/AdminNavbar";
import HeroUpdateForm from "../components/HeroUpdateForm";
import EnquiriesTable from "../components/EnquiriesTable";
import ProgramsTable from "../components/ProgramsTable";
import ReviewsTable from "../components/ReviewsTable";
import FaqTable from "../components/FaqTable";
import EventsTable from "../components/EventsTable";
import DirectorsPanel from "../components/DirectorsPanel";
import ContactsPanel from "../components/ContactsPanel";
import SkillCreatorsPanel from "../components/SkillCreatorsPanel";
import SuccessStoriesPanel from "../components/SuccessStoriesPanel";
import SuccessVideosPanel from "../components/SuccessVideosPanel";
import NotificationsPanel from "../components/NotificationsPanel";
import CertificationsPanel from "../components/CertificationsPanel";
import BlogsTable from "../components/BlogsTable";
import CareerPanel from "../components/CareerPanel";
import styles from "./page.module.css";

export default function AdminPanel() {
  const [view, setView] = useState<AdminView>("hero");

  return (
    <div className={styles.page}>
      <AdminNavbar active={view} onSelect={setView} />

      <main className={styles.content}>
        {view === "hero" && <HeroUpdateForm />}
        {view === "enquiries" && <EnquiriesTable />}
        {view === "programs" && <ProgramsTable />}
        {view === "reviews" && <ReviewsTable />}
        {view === "faq" && <FaqTable />}
        {view === "events" && <EventsTable />}
        {view === "directors" && <DirectorsPanel />}
        {view === "contacts" && <ContactsPanel />}
        {view === "skillCreators" && <SkillCreatorsPanel />}
        {view === "successStories" && <SuccessStoriesPanel />}
        {view === "successVideos" && <SuccessVideosPanel />}
        {view === "notifications" && <NotificationsPanel />}
        {view === "certifications" && <CertificationsPanel />}
        {view === "blogs" && <BlogsTable />}
        {view === "career" && <CareerPanel />}
      </main>
    </div>
  );
}
