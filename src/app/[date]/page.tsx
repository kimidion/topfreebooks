import DataRangeDisplay from "@/clientComponents/DataRangeDisplay"
import DateSelect from "@/clientComponents/DateSelect"
import { getAllDataByDate } from "@/lib/sheets"
import type { SortedData } from "@/types/TopData"
import { getAvailableDates } from "@/utils/getAvailableDates"
import { Suspense } from "react"

type PageType = {
  params: {
    date: string
  }
}

const Page = async ({ params: { date } }: PageType) => {
  const getData: Promise<SortedData> = getAllDataByDate(date)
  const data = await getData
  return (
    <>
        <DateSelect date={date} />
        <Suspense fallback={<h1>Loading...</h1>}>
          <DataRangeDisplay date={date} data={data} />
        </Suspense>
    </>
  )
}

export const generateStaticParams = () => {
  const dates = getAvailableDates()
  return dates.map((d) => ({
    date: d.formatted,
  }));
}

export default Page
