import { type Contact } from './schema'

const BASE_URL = import.meta.env.VITE_API_URL

export type ApiOptions = {
  page?: number
  pageSize?: number
  filter?: string
  type?: string[]
  tags?: string[]
}

export const getContacts = async (options: ApiOptions = {}) => {
  const { page = 1, pageSize = 10, filter, type, tags } = options

  const params = new URLSearchParams()
  params.append('page', String(page))
  params.append('pageSize', String(pageSize))
  if (filter) {
    params.append('filter', filter)
  }
  if (type && type.length > 0) {
    type.forEach((t) => params.append('type', t))
  }
  if (tags && tags.length > 0) {
    tags.forEach((t) => params.append('tags', t))
  }

  const response = await fetch(`${BASE_URL}/contacts?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch contacts')
  }
  const result: { data: Contact[]; pageCount: number } = await response.json()
  return result
}
