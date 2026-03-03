'use client'
import axios from 'axios'

export const ApplyToJob = async (U_id: string, J_id: string) => {
  try {
    const userResponse = await axios.get(`http://localhost:4000/users/${U_id}`)

    const user = userResponse.data
    const existingApplied: string[] = user.applyJOb ?? []

    const updatedApplied = existingApplied.includes(J_id)
      ? existingApplied
      : [...existingApplied, J_id]

    const updatedUser = {
      ...user,
      applyJOb: updatedApplied,
    }

    const response = await axios.put(
      `http://localhost:4000/users/${U_id}`,
      updatedUser
    )

    if (response) {
      return response.data
    }

    throw new Error('Failed to update applied jobs')
  } catch (error) {
    return error
  }
}