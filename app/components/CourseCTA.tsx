"use client";

import { useState } from "react";
import AdmissionModal from "./AdmissionModal";
import SketchFrame from "./SketchFrame";
import styles from "./CourseCTA.module.css";

type Props = {
  programName?: string;
  category?: string;
};

export default function CourseCTA({ programName = "", category = "" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        <SketchFrame rx={24} className={styles.sketch} />

        <h2 className={styles.heading}>Join the Next Batch Now</h2>
        <p className={styles.subtext}>
          Don&apos;t miss out—limited seats available for our upcoming
          session.
        </p>
        <button type="button" className={styles.button} onClick={() => setOpen(true)}>
          Join Now
        </button>
      </div>
      <AdmissionModal
        open={open}
        onClose={() => setOpen(false)}
        title="Get Your Admission"
        source="Course Page - Join the Next Batch Now"
        defaultPreference={programName ? `${category} - ${programName}` : ""}
      />
    </section>
  );
}
