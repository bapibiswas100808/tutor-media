// import { Tutor } from "@/components/tutors/TutorCard";

import { Tutor } from "@/data/tutorsList";

/**
 * Calculate tutor profile completion percentage
 *
 * Logic:
 * - Base: 0%
 * - Full information filled: 80%
 * - Full information + isPremium: 100%
 *
 * Full information includes:
 * - fullName, email, phone
 * - city, location
 * - qualification, experience, bio
 * - education (at least one entry)
 * - availability (days and mode)
 * - basicInfo with image
 */
export function calculateProfileCompletion(tutor: Tutor): number {
  if (!tutor) return 0;

  let completionScore = 0;
  const maxScore = 9; // Total points possible

  // Check basic info
  if (tutor.fullName) completionScore++;
  if (tutor.email) completionScore++;
  if (tutor.phone) completionScore++;

  // Check location info
  if (tutor.location) completionScore++;

  // Check professional info
  if (tutor.qualification) completionScore++;
  if (tutor.experience) completionScore++;
  if (tutor.personalInfo.overview) completionScore++;

  // Check education
  if (tutor.education) completionScore++;

  // Check availability
  if (
    tutor.basicInfo.days &&
    tutor.basicInfo.days.length > 0 &&
    tutor.basicInfo.mode
  ) {
    completionScore++;
  }

  // Check basic info with image
  if (tutor.basicInfo?.image) completionScore++;

  // Calculate percentage: max 80% without premium
  let percentage = (completionScore / maxScore) * 80;

  // If isPremium, add 20% to reach 100%
  if (tutor.isPremium) {
    percentage = 100;
  }

  return Math.round(percentage);
}

/**
 * Check if tutor profile is visible in tutor hub
 * Requires: isApproved && profileCompletion > 80%
 */
export function isTutorProfileVisible(tutor: Tutor): boolean {
  if (!tutor.isApproved) return false;
  const completion = calculateProfileCompletion(tutor);
  return completion > 80;
}
