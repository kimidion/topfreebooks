import RedirectToLatestDate from '@/components/client/RedirectToLatestDate'
import StatPageLoading from '@/components/loading/StatPageLoading'
import TopFive from '@/components/server/TopFive'
import { getLatestTopFive } from '@/lib/sheets'
import { SortedTopFive } from '@/types/TopData'

const Home = async () => {
  const getData: Promise<SortedTopFive | null> = getLatestTopFive()
  const data = await getData
  return (
    <TopFive data={data} />
  )
}

export default Home
