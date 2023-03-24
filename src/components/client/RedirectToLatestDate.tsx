'use client'
import { getLatestDateFormatted } from '@/utils/getAvailableDates'
import { redirect } from 'next/navigation'

const RedirectToLatestDate = () => {
  const dateString = getLatestDateFormatted()
  redirect(`/${dateString}`)
  return null
}

export default RedirectToLatestDate
