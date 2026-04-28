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
 * Final Logic:
 * - Premium → fixed 10%
 * - Remaining 90% → data based
 */
export function calculateProfileCompletion(tutor: Tutor | null): number {
  if (!tutor) return 0;

  let total = 0;
  let completed = 0;

  // ================= BASIC =================
  const basic = tutor.basicInfo;
  if (basic) {
    const fields = [
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
    const r = countFilled(fields);
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
    const fields = [
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
    const r = countFilled(fields);
    total += r.total;
    completed += r.completed;
  }

  // ================= DOCUMENT =================
  const docs = tutor.documentsInfo;
  if (docs) {
    const fields = [
      docs.nidFront,
      docs.nidBack,
      docs.universityId,
      docs.sscCertificate,
      docs.hscCertificate,
    ];
    const r = countFilled(fields);
    total += r.total;
    completed += r.completed;
  }

  if (total === 0) return tutor.isPremium ? 10 : 0;

  const dataPercentage = Math.round((completed / total) * 90);

  // ⭐ FINAL
  if (tutor.isPremium) {
    return 10 + dataPercentage;
  }

  return dataPercentage;
}

/**
 * Visibility
 */
export function isTutorProfileVisible(tutor: Tutor): boolean {
  if (!tutor.isApproved) return false;

  const completion = calculateProfileCompletion(tutor);
  return completion >= 80;
}