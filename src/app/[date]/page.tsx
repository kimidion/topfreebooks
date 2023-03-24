import type { Metadata } from 'next'
import DateSelect from "@/components/client/DateSelect"
import { getAllDataByDate } from "@/lib/sheets"
import type { SortedData } from "@/types/TopData"
import { getAvailableDates } from "@/utils/getAvailableDates"
import { Suspense } from "react"
import RankedDataWrapper from '@/components/server/RankedDataWrapper'

type PageType = {
  params: {
    date: string
  }
}

const Page = async ({ params: { date } }: PageType) => {
  const getData: Promise<SortedData> = getAllDataByDate(date)
  return (
    <>
        <DateSelect date={date} />
        <Suspense fallback={<h1>Loading...</h1>}>
          {/* @ts-expect-error suspensed promise */}
          <RankedDataWrapper date={date} dataPromise={getData} />
        </Suspense>
    </>
  )
}

export async function generateMetadata({ params: { date } }: PageType): Promise<Metadata> {
  const dateSplit = date.split('-')
  const dateObj = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]))
  return { title: `Top Free Books for ${dateObj.toLocaleDateString()}` }
}

export const generateStaticParams = () => {
  const dates = getAvailableDates()
  return dates.map((d) => ({
    date: d.formatted,
  }));
}

export default Page
