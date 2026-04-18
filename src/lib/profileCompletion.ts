import { Education, Tutor } from "@/data/tutorsList";

type EducationEntry = {
  id: string;
  academy: string;
  curriculum?: string;
  group?: string;
  passingYear?: string;
  result?: string;
  instituteType?: string;
  studyType?: string;
  department?: string;
  cgpa?: string;
};

const isFilled = (v?: string | string[]) => {
  if (!v) return false;
  if (Array.isArray(v)) return v.length > 0;
  return v.trim().length > 0;
};

const countFilled = (values: (string | string[] | undefined)[]) => {
  return {
    total: values.length,
    completed: values.filter(isFilled).length,
  };
};

/**
 * Calculate tutor profile completion percentage
 *
 * Logic:
 * - Calculates based on filled fields across basic info, education, personal info, and documents
 * - Premium tutors automatically get 100%
 * - Non-premium tutors capped at 90%
 * - Profile visible to students when >= 80%
 */
export function calculateProfileCompletion(tutor: Tutor | null): number {
  if (!tutor) return 0;

  // ⭐ PREMIUM = ALWAYS 10%
  if (tutor.isPremium) {
    return 10;
  }

  let total = 0;
  let completed = 0;

  // ================= BASIC INFO =================
  const basic = tutor.basicInfo;
  if (basic) {
    const basicFields = [
      basic.expectedSalary,
      basic.currentTuitionStatus,
      basic.daysPerWeek,
      basic.tutoringExperience,
      basic.placeOfLearning,
      basic.preferredMedium,
      basic.preferredClass,
      basic.preferredSubjects,
      basic.preferredTime,
      basic.preferredArea,
      basic.mode,
      basic.days,
      basic.image,
    ];

    const r = countFilled(basicFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= EDUCATION =================
  const hasValidEducation = (list?: EducationEntry[]) =>
    list?.some(
      (e) => isFilled(e.academy) && (isFilled(e.result) || isFilled(e.cgpa)),
    ) ?? false;

  const education = tutor.education;
  if (education) {
    const levels: (keyof Education)[] = ["ssc", "hsc", "grad"];

    total += levels.length;
    completed += levels.filter((lvl) =>
      hasValidEducation(education[lvl]),
    ).length;
  }

  // ================= PERSONAL =================
  const personal = tutor.personalInfo;
  if (personal) {
    const personalFields = [
      personal.fatherName,
      personal.motherName,
      personal.gender,
      personal.dateOfBirth,
      personal.religion,
      personal.nationality,
      personal.additionalNumber,
      personal.address,
      personal.identityType,
      personal.facebookProfile,
      personal.linkedinProfile,
      personal.fatherNumber,
      personal.motherNumber,
      personal.overview,
      personal.emergencyName,
      personal.emergencyRelation,
      personal.emergencyNumber,
      personal.emergencyAddress,
    ];

    const r = countFilled(personalFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= DOCUMENT =================
  const docs = tutor.documentsInfo;
  if (docs) {
    const docFields = [
      docs.nidFront,
      docs.nidBack,
      docs.universityId,
      docs.sscCertificate,
      docs.hscCertificate,
    ];

    const r = countFilled(docFields);
    total += r.total;
    completed += r.completed;
  }

  // ================= FINAL =================
  if (total === 0) return 0;

  const percentage = Math.round((completed / total) * 100);

  // ❌ NON-PREMIUM = max 90%
  return Math.min(percentage, 90);
}

/**
 * Check if tutor profile is visible in tutor hub
 * Requires: isApproved && profileCompletion >= 80%
 */
export function isTutorProfileVisible(tutor: Tutor): boolean {
  if (!tutor.isApproved) return false;
  const completion = calculateProfileCompletion(tutor);
  return completion >= 80;
}
