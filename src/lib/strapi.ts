/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error qs module has no types
import qs from 'qs'
// import { userRevalidate } from "./userRevalidate";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_ENDPOINT || 'http://localhost:1337'
const authToken = process.env.STRAPI_AUTH_TOKEN

/**
 * Function to create public data without authentication (for public submissions)
 * @param model model name as like strapi model name `tutor_hubs`, `applications`...
 * @param data data object to create data
 * @returns {data, error, message}
 * @example
 * const { data, error, message } = await createPublic("tutor_hubs", { fullName: "John", email: "john@example.com", ... });
 */
export const createPublic = async (
   model: string,
   data: any
) => {
   try {
      console.log('Submitting to Strapi:', {
         url: `${apiUrl}/api/${model}`,
         method: 'POST',
         data,
      })

      const response = await fetch(`${apiUrl}/api/${model}`, {
         method: 'POST',
         body: JSON.stringify({ data }),
         headers: {
            'Content-Type': 'application/json',
         },
         credentials: 'include',
         referrerPolicy: 'no-referrer-when-downgrade',
      })

      const contentType = response.headers.get('content-type')
      let resData: any

      // Try to parse as JSON only if content-type is application/json
      if (contentType?.includes('application/json')) {
         resData = await response.json()
      } else {
         // If not JSON, get text response
         const text = await response.text()
         resData = { error: { message: text } }
      }

      if (!response.ok) {
         const errorMessage = resData?.error?.message || resData?.message || `HTTP ${response.status}: ${response.statusText}`
         console.error('Strapi Error Response:', { status: response.status, data: resData })
         throw new Error(errorMessage)
      }

      return {
         message: 'Successfully Created',
         data: resData?.data,
         error: null,
      }
   } catch (error: any) {
      console.error('Create Public Error:', error)
      return {
         data: null,
         error: error?.message || 'Failed to create',
      }
   }
}

/**
 * Function to create data
 * @param model model name as like strapi model name `pages`, `messages`...
 * @param data data object to create data
 * @param userToken
 * @param revalidatePath path string for revalidate data after update or delete (https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
 * @param revalidateType page | layout
 * @returns {data, error, message}
 * @example
 * const { data, error, message } = await create("messages", { ...data }, "/dashboard/messages", "page");
 */
export const create = async (
   model: string,
   data: any,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   // Use userToken if provided, otherwise fall back to server token
   const token = userToken || process.env.STRAPI_AUTH_TOKEN

   if (!token) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(`${apiUrl}/api/${model}`, {
         method: 'POST',
         body: JSON.stringify(data),
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
         cache: 'no-cache',
      })

      const resData = await response?.json()

      if (!response.ok) {
         throw new Error(resData?.error?.message || 'Failed to create')
      }
      // if (revalidatePath && revalidateType) {
      //    userRevalidate(revalidatePath, revalidateType);
      // }

      return {
         message: 'Successfully Created',
         data: resData?.data,
         error: null,
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || 'Failed to create',
      }
   }
}

/**
 * Function to get data by id
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param id  id of the data
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param userToken
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await findOne("pages", 1, { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const findOne = async (
   model: string,
   id: string | number,
   query: any = {},
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
      indices: false,
   })

   const authToken = process.env.STRAPI_AUTH_TOKEN

   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(
         `${apiUrl}/api/${model}/${id}?${queryString}`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               ...{
                  ...(authToken || userToken
                     ? {
                          Authorization: `Bearer ${authToken || userToken}`,
                       }
                     : {}),
               },
            },
            ...{
               ...(revalidate ? {} : { cache }),
               ...(revalidate
                  ? {
                       next: {
                          revalidate: revalidate,
                       },
                    }
                  : {}),
            },
         }
      )

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const data = await response.json()
      return { data, error: null }
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`)
      return {
         data: null,
         error: error.message || 'An error occurred during data fetch',
      }
   }
}

/**
 * Function to get data by documentId (for Strapi v5)
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param documentId  documentId of the data
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param userToken
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 */
export const findOneByDocumentId = async (
   model: string,
   id: string | number,
   query: any = {},
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
      indices: false,
   })

   const apiUrl = process.env.STRAPI_ENDPOINT

   const authToken = process.env.STRAPI_AUTH_TOKEN
   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(
         `${apiUrl}/api/${model}/${id}?${queryString}`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${authToken}`,
            },
            ...{
               ...(revalidate ? {} : { cache }),
               ...(revalidate
                  ? {
                       next: {
                          revalidate: revalidate,
                       },
                    }
                  : {}),
            },
         }
      )

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const data = await response.json()
      return { data, error: null }
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`)
      return {
         data: null,
         error: error.message || 'An error occurred during data fetch',
      }
   }
}

/**
 * Function to get data
 * @param model  model name as like strapi model name `pages`, `messages`...
 * @param query  query object to filter data
 * @param cache  cache type `force-cache`, `no-cache`, `no-store`
 * @param userToken
 * @param revalidate  revalidate time in seconds
 * @returns  {data, error}
 * @example
 * const { data, error } = await find("pages", { filters: { slug: { $eq: "home" } } }, "force-cache", 60);
 */
export const find = async (
   model: string,
   query: any = {},
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
      indices: false,
   })

   if (!authToken) {
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(`${apiUrl}/api/${model}/?${queryString}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            ...{
               ...(userToken
                  ? { Authorization: `Bearer ${userToken}` }
                  : {
                       Authorization: `Bearer ${authToken}`,
                    }),
            },
         },
         ...{
            ...(revalidate ? {} : { cache }),
            ...(revalidate
               ? {
                    next: {
                       revalidate: revalidate,
                    },
                 }
               : {}),
         },
      })

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const data = await response.json()

      return { data, error: null }
   } catch (error: any) {
      // console.error(`Error during API call: ${error.message}`)
      return {
         data: null,
         error: error.message || 'An error occurred during data fetch',
      }
   }
}

/**
 * Function to delete data
 * @param model
 * @param id
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const deleteOne = async (
   model: string,
   documentId: string,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(`${apiUrl}/api/${model}/${documentId}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${authToken}`,
         },
      })

      const resData = await response?.json()

      if (!response.ok) {
         throw new Error(resData?.error?.message || 'Failed to delete')
      }
      // if (revalidatePath && revalidateType) {
      //    userRevalidate(revalidatePath, revalidateType);
      // }
      return {
         message: 'Successfully Deleted',
         data: resData?.data,
         error: null,
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || 'Failed to delete',
      }
   }
}

/**
 * Function to delete data by documentId (for Strapi v5)
 * @param model
 * @param documentId
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const deleteByDocumentId = async (
   model: string,
   documentId: string | number,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   const authToken = process.env.STRAPI_AUTH_TOKEN
   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }
   try {
      const response = await fetch(`${apiUrl}/api/${model}/${documentId}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${authToken}`,
         },
      })

      // For Strapi v5, successful delete returns 204 with no body
      if (response.status === 204) {
         return {
            message: 'Successfully Deleted',
            data: null,
            error: null,
         }
      }

      // If not 204, there might be an error, try to parse response
      const resData = await response.json().catch(() => ({}))

      return {
         data: null,
         error:
            resData?.error?.message ||
            `Delete failed with status ${response.status}`,
      }
   } catch (error: any) {
      console.error('Delete error:', error)
      return {
         data: null,
         error: error?.message || 'Failed to delete',
      }
   }
}

/**
 * Function to update data
 * @param model
 * @param id
 * @param updatedData
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const updateOne = async (
   model: string,
   id: number,
   updatedData: any,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   const authToken = process.env.STRAPI_AUTH_TOKEN
   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(`${apiUrl}/api/${model}/${id}`, {
         method: 'PUT',
         body: JSON.stringify({ data: updatedData }),
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
         },
         cache: 'no-store',
      })

      const resData = await response?.json()

      if (!response.ok) {
         throw new Error(resData?.error?.message || 'Failed to update')
      }
      // if (revalidatePath && revalidateType) {
      //    userRevalidate(revalidatePath, revalidateType);
      // }

      return {
         message: 'Successfully Updated',
         data: resData?.data ?? resData,
         error: null,
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || 'Failed to update',
      }
   }
}

/**
 * Function to update data by documentId (for Strapi v5)
 * @param model
 * @param documentId
 * @param updatedData
 * @param userToken
 * @param revalidatePath path string
 * @param revalidateType page | layout
 * @returns {message,data, error}
 */
export const updateByDocumentId = async (
   model: string,
   documentId: string | number,
   updatedData: any,
   userToken?: string,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   const authToken = process.env.STRAPI_AUTH_TOKEN
   if (!authToken) {
      console.error(`Error: Missing authentication token for ${model}`)
      return { data: null, error: 'Authentication token is required' }
   }
   try {
      const response = await fetch(`${apiUrl}/api/${model}/${documentId}`, {
         method: 'PUT',
         body: JSON.stringify({ data: updatedData }),
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
         },
      })

      const resData = await response?.json()

      if (!response.ok) {
         throw new Error(resData?.error?.message || 'Failed to update')
      }
      // if (revalidatePath && revalidateType) {
      //    userRevalidate(revalidatePath, revalidateType);
      // }

      return {
         message: 'Successfully Updated',
         data: resData?.data ?? resData,
         error: null,
      }
   } catch (error: any) {
      return {
         data: null,
         error: error?.message || 'Failed to update',
      }
   }
}

/**
 * Strapi dynamic fetch function for GET, POST, PUT, DELETE, PATCH method with revalidate option for Next.js
 * @param method GET | POST | PUT | DELETE | PATCH default GET
 * @param model model name as like strapi model name `pages`, `messages`...
 * @param body body data mainly for POST, PUT, PATCH method
 * @param query query string as object {key: value} for filtering data
 * @param cache force-cache | no-cache | no-store default force-cache (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
 * @param revalidate revalidate time in seconds (https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)
 * @param id id for single data fetch like findOne method default null
 * @param revalidatePath path string for revalidate data after update or delete (https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
 * @param revalidateType page | layout
 * @example
 * // GET method example
 * const { data, error } = await strapiFetch("GET", "pages", {}, { slug: "home" });
 * // POST method example
 * const { data, error } = await strapiFetch("POST", "messages", { ...data }, {}, "no-store");
 * // PUT method example
 * const { data, error } = await strapiFetch("PUT", "messages", { ...data }, {}, "no-store", null, 1, null, null);
 * // DELETE method example
 * const { data, error } = await strapiFetch("DELETE", "messages", {}, {}, "no-store", null, 1, "/dashboard/messages", "page");
 * // PATCH method example
 * const { data, error } = await strapiFetch("PATCH", "messages", { ...data }, {}, "no-store", null, 1, "/dashboard/messages", "page");
 * @returns {data, error}
 */
export const strapiFetch = async (
   method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
   model: string,
   body: object | null,
   query?: object,
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   revalidate?: number | null,
   id?: number | null,
   revalidatePath?: string,
   revalidateType?: 'page' | 'layout'
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
      indices: false,
   })

   try {
      const response = await fetch(
         `${apiUrl}/api/${model}/${id ? id : ''}?${queryString}`,
         {
            method,
            body: JSON.stringify(body),
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
            },
            ...{
               ...(revalidate ? {} : { cache }),
               ...(revalidate
                  ? {
                       next: {
                          revalidate: revalidate,
                       },
                    }
                  : {}),
            },
         }
      )

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const data = await response.json()
      // if (revalidatePath && revalidateType) {
      //    userRevalidate(revalidatePath, revalidateType);
      // }
      return { data, error: null }
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`)
      return {
         data: null,
         error: error.message || 'An error occurred during data fetch',
      }
   }
}

/**
 * Get all projects with populated relations
 * @param cache cache type
 * @param revalidate revalidate time in seconds
 * @returns {data, error}
 */
export const getProjects = async (
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   revalidate?: number
) => {
   const PROJECTS_API = 'projects'

   return await find(
      PROJECTS_API,
      {
         populate: {
            client: {
               fields: ['name', 'email', 'avatar', 'rating'],
            },
            category: {
               fields: ['name', 'description'],
            },
            skills: {
               fields: ['name'],
            },
            technologies: {
               fields: ['name'],
            },
            bounties: {
               fields: ['title', 'amount', 'bountyStatus'],
            },
         },
         filters: {},
         sort: ['createdAt:desc'],
      },
      cache,
      undefined,
      revalidate
   )
}

// FIXME: Need to delete this functions
/**
 * Get a single project by ID with populated relations
 * @param id project ID
 * @param cache cache type
 * @param revalidate revalidate time in seconds
 * @returns {data, error}
 */
export const getProjectById = async (
   id: number,
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   revalidate?: number
) => {
   const PROJECT_API = 'projects'

   return await findOne(
      PROJECT_API,
      id,
      {
         populate: {
            client: {
               fields: ['name', 'email', 'avatar', 'rating', 'company'],
            },
            category: {
               fields: ['name', 'description'],
            },
            skills: {
               fields: ['name', 'description'],
            },
            technologies: {
               fields: ['name', 'description'],
            },
            bounties: {
               populate: {
                  skills: {
                     fields: ['name'],
                  },
                  proposals: {
                     fields: ['id', 'proposalStatus'],
                  },
               },
            },
            proposals: {
               populate: {
                  developer: {
                     fields: ['name', 'email', 'avatar', 'rating'],
                  },
               },
            },
         },
      },
      cache,
      undefined,
      revalidate
   )
}

// FIXME: Need to delete this functions
/**
 * Get all roles from the Users & Permissions plugin
 * @param cache cache type
 * @param revalidate revalidate time in seconds
 * @returns {data, error}
 */
export const getRoles = async (
   model: string,
   query: any = {},
   cache: 'force-cache' | 'no-cache' | 'no-store' = 'force-cache',
   userToken?: string,
   revalidate?: number
) => {
   const queryString = qs.stringify(query, {
      arrayFormat: 'indices',
      encode: false,
      indices: false,
   })
   const authToken = process.env.STRAPI_AUTH_TOKEN
   if (!authToken) {
      return { data: null, error: 'Authentication token is required' }
   }

   try {
      const response = await fetch(`${apiUrl}/${model}/?${queryString}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            ...{
               ...(userToken
                  ? { Authorization: `Bearer ${userToken}` }
                  : {
                       Authorization: `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
                    }),
            },
         },
         ...{
            ...(revalidate ? {} : { cache }),
            ...(revalidate
               ? {
                    next: {
                       revalidate: revalidate,
                    },
                 }
               : {}),
         },
      })

      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const data = await response.json()

      return { data, error: null }
   } catch (error: any) {
      console.error(`Error during API call: ${error.message}`)
      return {
         data: null,
         error: error.message || 'An error occurred during data fetch',
      }
   }
}

interface StrapiRole {
   id: number
   name: string
   description?: string
   type: string
   createdAt: string
   updatedAt: string
}

interface StrapiUser {
   id: number
   username: string
   email: string
   provider: string
   confirmed: boolean
   blocked: boolean
   createdAt: string
   updatedAt: string
   role?: StrapiRole
   profile?: StrapiProfile
}

interface StrapiMedia {
   id: number
   name: string
   alternativeText?: string
   caption?: string
   width?: number
   height?: number
   formats?: any
   hash: string
   ext: string
   mime: string
   size: number
   url: string
   previewUrl?: string
   provider: string
   provider_metadata?: any
   createdAt: string
   updatedAt: string
}

interface StrapiProfile {
   id: number
   bio?: string
   avatar?: StrapiMedia
   cover?: StrapiMedia
   location?: string
   website?: string
   twitter?: string
   github?: string
   linkedin?: string
   createdAt: string
   updatedAt: string
   user?: StrapiUser
}

interface StrapiResponse<T> {
   data: T
   meta?: any
}

interface StrapiApiResponse<T> {
   success: boolean
   data?: T
   error?: string
}
// FIXME: Need to delete this functions
class StrapiAPI {
   private baseUrl: string
   private apiToken: string

   constructor() {
      this.baseUrl = process.env.STRAPI_ENDPOINT || 'http://localhost:1337'
      this.apiToken = process.env.STRAPI_AUTH_TOKEN || ''
   }

   private async request<T>(
      endpoint: string,
      options: RequestInit = {}
   ): Promise<StrapiApiResponse<T>> {
      try {
         const response = await fetch(`${this.baseUrl}/api${endpoint}`, {
            ...options,
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${this.apiToken}`,
               ...options.headers,
            },
         })

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
         }

         const data = await response.json()
         return { success: true, data }
      } catch (error) {
         console.error('Strapi API Error:', error)
         return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
         }
      }
   }

   // User Profile Methods
   async getUserByAuth0Sub(
      auth0Sub: string
   ): Promise<StrapiApiResponse<StrapiUser>> {
      const response = await this.request<StrapiUser>(
         `/user-profiles/auth0/${encodeURIComponent(auth0Sub)}/with-server`
      )

      return response
   }

   async createOrUpdateUser(userData: {
      auth0_sub: string
      username: string
      email: string
      [key: string]: any
   }): Promise<StrapiApiResponse<StrapiUser>> {
      return this.request<StrapiUser>('/user-profiles/create-or-update', {
         method: 'POST',
         body: JSON.stringify(userData),
      })
   }

   async updateUserOnboarding(
      auth0Sub: string,
      onboardingData: any
   ): Promise<StrapiApiResponse<StrapiUser>> {
      return this.request<StrapiUser>(
         `/user-profiles/auth0/${encodeURIComponent(auth0Sub)}/onboarding`,
         {
            method: 'PUT',
            body: JSON.stringify(onboardingData),
         }
      )
   }

   // Server Management Methods
   async getUserServer(auth0Sub: string): Promise<StrapiApiResponse<any>> {
      return this.request<any>(
         `/user-servers/auth0/${encodeURIComponent(auth0Sub)}`
      )
   }

   async assignServerToUser(
      auth0Sub: string,
      serverData: {
         server_specs?: any
      }
   ): Promise<StrapiApiResponse<any>> {
      return this.request<any>(
         `/user-servers/assign/${encodeURIComponent(auth0Sub)}`,
         {
            method: 'POST',
            body: JSON.stringify(serverData),
         }
      )
   }

   async updateServerStatus(
      serverId: number,
      status: string
   ): Promise<StrapiApiResponse<any>> {
      return this.request<any>(`/user-servers/${serverId}/status`, {
         method: 'PUT',
         body: JSON.stringify({ server_status: status }),
      })
   }
}

export const strapiAPI = new StrapiAPI()
export type { StrapiUser, StrapiApiResponse }
