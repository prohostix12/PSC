"use client";

import { useState } from "react";
import { useEffect } from "react";
import type { CourseModule, Program, ProgramDetails } from "../lib/programUtils";
import styles from "./ProgramDetailsEditor.module.css";

type Props = {
  program: Program;
  onBack: () => void;
  onSaved: () => void;
};

const emptyDetails: ProgramDetails = {
  overview: "",
  curriculumHeading: "Complete Course Module",
  curriculumModules: [],
  benefitsHeading: "",
  benefitsPara: "",
  benefitsItems: [],
  intakeCount: "",
  brochureUrl: "",
  courseIncludes: [],
  quickQuestions: [],
  careerOutcomesPara: "",
  careerOutcomesLogos: [],
};

const getDetails = (program: Program): ProgramDetails => ({
  ...emptyDetails,
  ...program.details,
  curriculumModules: program.details?.curriculumModules || [],
  benefitsItems:
    program.details?.benefitsItems?.length
      ? program.details.benefitsItems
      : program.details?.benefitsHeading || program.details?.benefitsPara
      ? [
          {
            heading: program.details.benefitsHeading || "",
            para: program.details.benefitsPara || "",
          },
        ]
      : [],
  courseIncludes: program.details?.courseIncludes || [],
  quickQuestions: program.details?.quickQuestions || [],
  careerOutcomesLogos: program.details?.careerOutcomesLogos || [],
});

export default function ProgramDetailsEditor({ program, onBack, onSaved }: Props) {
  const [details, setDetails] = useState<ProgramDetails>(() => getDetails(program));
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");
  const [careerLogos, setCareerLogos] = useState<string[]>([]);
  const [careerPickerOpen, setCareerPickerOpen] = useState(false);

  useEffect(() => {
    fetch("/api/career")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const titles = Array.isArray(data.logos)
          ? data.logos.map((logo: { title?: unknown }) => String(logo.title || ""))
          : [];
        setCareerLogos(titles);
      })
      .catch(() => setCareerLogos([]));
  }, []);

  const updateDetails = <K extends keyof ProgramDetails>(
    field: K,
    value: ProgramDetails[K]
  ) => setDetails((current) => ({ ...current, [field]: value }));

  const addModule = () => {
    const module: CourseModule = { heading: "", para: "" };
    updateDetails("curriculumModules", [...details.curriculumModules, module]);
  };

  const updateModule = (
    index: number,
    field: keyof CourseModule,
    value: string
  ) => {
    updateDetails(
      "curriculumModules",
      details.curriculumModules.map((module, moduleIndex) =>
        moduleIndex === index ? { ...module, [field]: value } : module
      )
    );
  };

  const removeModule = (index: number) => {
    updateDetails(
      "curriculumModules",
      details.curriculumModules.filter((_, moduleIndex) => moduleIndex !== index)
    );
  };

  const addBenefit = () => {
    updateDetails("benefitsItems", [
      ...details.benefitsItems,
      { heading: "", para: "" },
    ]);
  };

  const updateBenefit = (
    index: number,
    field: "heading" | "para",
    value: string
  ) => {
    updateDetails(
      "benefitsItems",
      details.benefitsItems.map((benefit, benefitIndex) =>
        benefitIndex === index ? { ...benefit, [field]: value } : benefit
      )
    );
  };

  const removeBenefit = (index: number) => {
    updateDetails(
      "benefitsItems",
      details.benefitsItems.filter((_, benefitIndex) => benefitIndex !== index)
    );
  };

  const addInclude = () =>
    updateDetails("courseIncludes", [...details.courseIncludes, ""]);

  const updateInclude = (index: number, value: string) =>
    updateDetails(
      "courseIncludes",
      details.courseIncludes.map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    );

  const removeInclude = (index: number) =>
    updateDetails(
      "courseIncludes",
      details.courseIncludes.filter((_, itemIndex) => itemIndex !== index)
    );

  const addQuestion = () =>
    updateDetails("quickQuestions", [
      ...details.quickQuestions,
      { heading: "", para: "" },
    ]);

  const updateQuestion = (
    index: number,
    field: keyof CourseModule,
    value: string
  ) =>
    updateDetails(
      "quickQuestions",
      details.quickQuestions.map((question, questionIndex) =>
        questionIndex === index ? { ...question, [field]: value } : question
      )
    );

  const removeQuestion = (index: number) =>
    updateDetails(
      "quickQuestions",
      details.quickQuestions.filter((_, questionIndex) => questionIndex !== index)
    );

  const handleBrochureChange = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Brochure must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateDetails("brochureUrl", String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const toggleCareerLogo = (title: string) => {
    updateDetails(
      "careerOutcomesLogos",
      details.careerOutcomesLogos.includes(title)
        ? details.careerOutcomesLogos.filter((item) => item !== title)
        : [...details.careerOutcomesLogos, title]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const response = await fetch(`/api/programs/${program._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: program.category,
          name: program.name,
          duration: program.duration,
          heroPara: program.heroPara || "",
          heroHeading: program.heroHeading || "",
          heroAbout: program.heroAbout || "",
          heroPoints: program.heroPoints || [],
          details,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to save details");
      onSaved();
      onBack();
    } catch (saveError) {
      setStatus("error");
      setError((saveError as Error).message);
    }
  };

  return (
    <section className={styles.section}>
      <button type="button" className={styles.backButton} onClick={onBack}>
        ← Back to Programs
      </button>

      <div className={styles.header}>
        <p className={styles.eyebrow}>Program Details</p>
        <h1 className={styles.heading}>{program.name}</h1>
        <p className={styles.subheading}>
          Build the Overview, Curriculum, and Benefits sections for this program page.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <h2 className={styles.sectionHeading}>What you will learn?</h2>
          <label className={styles.label} htmlFor="program-overview">
            Overview
          </label>
          <textarea
            id="program-overview"
            className={styles.textarea}
            rows={9}
            value={details.overview}
            placeholder="Add the overview content shown in the Overview tab."
            onChange={(event) => updateDetails("overview", event.target.value)}
          />
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Curriculum</h2>
          <label className={styles.label} htmlFor="curriculum-heading">
            Section Heading
          </label>
          <input
            id="curriculum-heading"
            className={styles.input}
            value={details.curriculumHeading}
            placeholder="Complete Course Module"
            onChange={(event) =>
              updateDetails("curriculumHeading", event.target.value)
            }
          />

          <div className={styles.moduleHeader}>
            <h3>Course Modules</h3>
            <button type="button" className={styles.addButton} onClick={addModule}>
              + Add Module
            </button>
          </div>

          {details.curriculumModules.length === 0 && (
            <p className={styles.empty}>No modules added yet.</p>
          )}

          <div className={styles.modules}>
            {details.curriculumModules.map((module, index) => (
              <div className={styles.module} key={`module-${index}`}>
                <div className={styles.moduleTopline}>
                  <strong>Module {index + 1}</strong>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => removeModule(index)}
                  >
                    Delete Module
                  </button>
                </div>
                <label className={styles.label} htmlFor={`module-heading-${index}`}>
                  Module Heading
                </label>
                <input
                  id={`module-heading-${index}`}
                  className={styles.input}
                  value={module.heading}
                  placeholder="Module 1: Life Lab & Digital Foundation"
                  onChange={(event) =>
                    updateModule(index, "heading", event.target.value)
                  }
                />
                <label className={styles.label} htmlFor={`module-para-${index}`}>
                  Module Paragraph
                </label>
                <textarea
                  id={`module-para-${index}`}
                  className={styles.textarea}
                  rows={5}
                  value={module.para}
                  placeholder="Describe what students learn in this module."
                  onChange={(event) => updateModule(index, "para", event.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Benefits</h2>
          <div className={styles.moduleHeader}>
            <h3>Benefit Items</h3>
            <button type="button" className={styles.addButton} onClick={addBenefit}>
              + Add Benefit
            </button>
          </div>

          {details.benefitsItems.length === 0 && (
            <p className={styles.empty}>No benefits added yet.</p>
          )}

          <div className={styles.modules}>
            {details.benefitsItems.map((benefit, index) => (
              <div className={styles.module} key={`benefit-${index}`}>
                <div className={styles.moduleTopline}>
                  <strong>Benefit {index + 1}</strong>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => removeBenefit(index)}
                  >
                    Delete Benefit
                  </button>
                </div>
                <label className={styles.label} htmlFor={`benefit-heading-${index}`}>
                  Benefit Heading
                </label>
                <input
                  id={`benefit-heading-${index}`}
                  className={styles.input}
                  value={benefit.heading}
                  placeholder="SEO Specialist / SEO Executive"
                  onChange={(event) => updateBenefit(index, "heading", event.target.value)}
                />
                <label className={styles.label} htmlFor={`benefit-para-${index}`}>
                  Benefit Paragraph
                </label>
                <textarea
                  id={`benefit-para-${index}`}
                  className={styles.textarea}
                  rows={4}
                  value={benefit.para}
                  placeholder="Describe this benefit or career outcome."
                  onChange={(event) => updateBenefit(index, "para", event.target.value)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Right Sidebar</h2>
          <label className={styles.label} htmlFor="intake-count">
            Intake Count
          </label>
          <input
            id="intake-count"
            className={styles.input}
            type="number"
            min="0"
            value={details.intakeCount}
            placeholder="30"
            onChange={(event) => updateDetails("intakeCount", event.target.value)}
          />

          <label className={styles.label} htmlFor="brochure-upload">
            Upload Brochure
          </label>
          <input
            id="brochure-upload"
            className={styles.input}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(event) => handleBrochureChange(event.target.files?.[0])}
          />
          {details.brochureUrl && (
            <p className={styles.uploaded}>Brochure selected and ready to save.</p>
          )}

          <div className={styles.moduleHeader}>
            <h3>This Course Includes</h3>
            <button type="button" className={styles.addButton} onClick={addInclude}>
              + Add Item
            </button>
          </div>
          <div className={styles.modules}>
            {details.courseIncludes.map((item, index) => (
              <div className={styles.inlineRow} key={`include-${index}`}>
                <input
                  className={styles.input}
                  value={item}
                  placeholder="Certificate of completion"
                  onChange={(event) => updateInclude(index, event.target.value)}
                />
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => removeInclude(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className={styles.moduleHeader}>
            <h3>Quick Questions</h3>
            <button type="button" className={styles.addButton} onClick={addQuestion}>
              + Add Question
            </button>
          </div>
          <div className={styles.modules}>
            {details.quickQuestions.map((question, index) => (
              <div className={styles.module} key={`question-${index}`}>
                <div className={styles.moduleTopline}>
                  <strong>Question {index + 1}</strong>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => removeQuestion(index)}
                  >
                    Delete Question
                  </button>
                </div>
                <label className={styles.label} htmlFor={`question-heading-${index}`}>
                  Question Heading
                </label>
                <input
                  id={`question-heading-${index}`}
                  className={styles.input}
                  value={question.heading}
                  placeholder="Do I need prior experience?"
                  onChange={(event) => updateQuestion(index, "heading", event.target.value)}
                />
                <label className={styles.label} htmlFor={`question-para-${index}`}>
                  Question Paragraph
                </label>
                <textarea
                  id={`question-para-${index}`}
                  className={styles.textarea}
                  rows={3}
                  value={question.para}
                  placeholder="Answer the question here."
                  onChange={(event) => updateQuestion(index, "para", event.target.value)}
                />
              </div>
            ))}
          </div>

        </section>

        <section className={styles.formSection}>
          <h2 className={styles.sectionHeading}>Career Outcomes</h2>
          <label className={styles.label} htmlFor="career-outcomes-para">
            Career Outcomes Paragraph
          </label>
          <textarea
            id="career-outcomes-para"
            className={styles.textarea}
            rows={6}
            value={details.careerOutcomesPara}
            placeholder="Describe the career outcomes students can expect from this program."
            onChange={(event) =>
              updateDetails("careerOutcomesPara", event.target.value)
            }
          />
          <p className={styles.helperText}>
            Choose the career logos to show on this program page.
          </p>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setCareerPickerOpen(true)}
          >
            Add Career Logo
          </button>
          <div className={styles.selectedLogos}>
            {details.careerOutcomesLogos.map((logo) => (
              <div className={styles.selectedLogo} key={logo}>
                <span>{logo}</span>
                <button type="button" className={styles.deleteButton} onClick={() => toggleCareerLogo(logo)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          {careerPickerOpen && (
            <div className={styles.logoPickerOverlay} onClick={() => setCareerPickerOpen(false)}>
              <div className={styles.logoPicker} onClick={(event) => event.stopPropagation()}>
                <div className={styles.moduleTopline}>
                  <h3>Career Logos</h3>
                  <button type="button" className={styles.deleteButton} onClick={() => setCareerPickerOpen(false)}>
                    Close
                  </button>
                </div>
                <div className={styles.logoPickerList}>
                  {careerLogos.map((logo) => {
                    const selected = details.careerOutcomesLogos.includes(logo);
                    return (
                      <button
                        type="button"
                        key={logo}
                        className={`${styles.logoPickerItem} ${selected ? styles.logoPickerItemSelected : ""}`}
                        onClick={() => toggleCareerLogo(logo)}
                      >
                        <span>{logo}</span>
                        <span>{selected ? "Selected" : "Add"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        <button type="submit" className={styles.saveButton} disabled={status === "saving"}>
          {status === "saving" ? "Saving Details..." : "Save Program Details"}
        </button>
        {status === "error" && <p className={styles.error}>{error}</p>}
      </form>
    </section>
  );
}
