import { getLatestDateFormatted } from '@/utils/getAvailableDates'
import { redirect } from 'next/navigation'

const Home = async () => {
  const dateString = getLatestDateFormatted()
  redirect(`/${dateString}`)
}

export default Home
