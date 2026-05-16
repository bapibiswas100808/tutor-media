export interface BkashPayment {
  _id?: string;
  studentId?: string;
  tutorId?: string;
  trxId?: string;
  transactionId?: string;
  plan?: string;
  amount?: number | string;
  sender?: string;
  status?: string;
  createdAt?: string;
  method?: string;
}

export interface TuitionJob {
  _id: string;
  id: number;
  name?: string;
  title?: string;
  phone?: string;
  email?: string;
  gender?: string;
  division?: string;
  district?: string;
  location?: string;
  preferredArea?: string;
  budget?: string;
  mode?: string;
  subject?: string;
  subjects?: string[];
  class?: string;
  medium?: string;
  description?: string;
  jobId?: string | number;
  salary?: string | number;
  tutorDescription?: string;
  locationDescription?: string;
  isVerified?: boolean;
  isApproved?: boolean;
  isPremium?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
}

export type EditableJob = {
  phone?: string;
  class?: string;
  medium?: string;
  studentGender?: "male" | "female";
  tutorGender?: "male" | "female";
  salary?: string;
  days?: string;
  duration?: string;
  division?: string;
  district?: string;
  location?: string;
  preferredArea?: string;
  tutorDescription?: string;
  locationDescription?: string;
  subjects?: string[];
};

export type EditableField = {
  label: string;
  key: keyof EditableJob;
  type?: "textarea";
};

export const editableJobFields = [
  { label: "Phone", key: "phone" },
  { label: "Class", key: "class" },
  { label: "Medium", key: "medium" },
  { label: "Student Gender", key: "studentGender" },
  { label: "Tutor Gender", key: "tutorGender" },
  { label: "Salary", key: "salary" },
  { label: "Days", key: "days" },
  { label: "Duration", key: "duration" },
  { label: "Division", key: "division" },
  { label: "District", key: "district" },
  { label: "Location", key: "location" },
  { label: "Preferred Area", key: "preferredArea" },
  { label: "Tutor Description", key: "tutorDescription", type: "textarea" },
  {
    label: "Location Description",
    key: "locationDescription",
    type: "textarea",
  },
  { label: "Subjects", key: "subjects" },
] satisfies readonly EditableField[];
