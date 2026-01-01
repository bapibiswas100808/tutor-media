import { createPublic, find } from "@/lib/strapi";

export interface ApplicationData {
  rate: number;
  schedule: string;
  proposal: string;
  tuition_job: number; // Job ID
  tutor_hubs?: number[]; // Optional: tutor profile IDs if available
}

export interface Application extends ApplicationData {
  _id: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/**
 * Submit a new application for a tuition job
 * Creates a new application record linking tutor to job
 */
export async function submitApplication(data: ApplicationData) {
  try {
    const response = await createPublic("applications", {
      ...data,
      publishedAt: new Date().toISOString(),
    });

    if (response.error) {
      throw new Error(response.error);
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit application",
    };
  }
}

/**
 * Get all applications for a specific tuition job
 */
export async function getJobApplications(jobId: number) {
  try {
    const response = await find("applications", {
      filters: {
        tuition_job: {
          id: {
            $eq: jobId,
          },
        },
      },
      pagination: {
        pageSize: 100,
      },
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to fetch applications");
    }

    return {
      success: true,
      data: response.data || [],
    };
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch applications",
      data: [],
    };
  }
}

/**
 * Get applications for a specific tutor
 */
export async function getTutorApplications(tutorId: number) {
  try {
    const response = await find("applications", {
      filters: {
        tutor_hubs: {
          id: {
            $eq: tutorId,
          },
        },
      },
      pagination: {
        pageSize: 100,
      },
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to fetch applications");
    }

    return {
      success: true,
      data: response.data || [],
    };
  } catch (error) {
    console.error("Error fetching tutor applications:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch applications",
      data: [],
    };
  }
}

/**
 * Get a specific application by ID
 */
export async function getApplicationById(applicationId: number) {
  try {
    const response = await find(
      `applications/${applicationId}`,
      {}
    );

    if (response.error) {
      throw new Error(response.error.message || "Failed to fetch application");
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching application:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch application",
    };
  }
}

/**
 * Get application count for a job
 */
export async function getApplicationCount(jobId: number) {
  try {
    const response = await find("applications", {
      filters: {
        tuition_job: {
          id: {
            $eq: jobId,
          },
        },
      },
      pagination: {
        pageSize: 1,
      },
    });

    if (response.error) {
      throw new Error(response.error.message || "Failed to count applications");
    }

    // Specify the type for response.data if possible, otherwise use unknown[]
    return {
      success: true,
      count: (Array.isArray(response.data) ? response.data.length : 0),
    };
  } catch (error) {
    console.error("Error counting applications:", error);
    return {
      success: false,
      count: 0,
    };
  }
}
