"use client";

import { useState } from "react";
import AdminNavbar, { type AdminView } from "./AdminNavbar";
import HeroUpdateForm from "./HeroUpdateForm";
import EnquiriesTable from "./EnquiriesTable";
import ProgramsTable from "./ProgramsTable";
import ReviewsTable from "./ReviewsTable";
import FaqTable from "./FaqTable";
import EventsTable from "./EventsTable";
import DirectorsPanel from "./DirectorsPanel";
import ContactsPanel from "./ContactsPanel";
import SkillCreatorsPanel from "./SkillCreatorsPanel";
import SuccessStoriesPanel from "./SuccessStoriesPanel";
import SuccessVideosPanel from "./SuccessVideosPanel";
import NotificationsPanel from "./NotificationsPanel";
import CertificationsPanel from "./CertificationsPanel";
import BlogsTable from "./BlogsTable";
import CareerPanel from "./CareerPanel";
import AdminOverview from "./AdminOverview";
import AdminSettings from "./AdminSettings";
import styles from "../admin/page.module.css";

export default function AdminDashboard() {
  const [view, setView] = useState<AdminView>("dashboard");

  return (
    <div className={styles.page}>
      <AdminNavbar active={view} onSelect={setView} />
      <main className={styles.content}>
        {view === "dashboard" && <AdminOverview onSelect={setView} />}
        {view === "settings" && <AdminSettings />}
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
