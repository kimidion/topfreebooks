import DataRangeDisplay from "@/clientComponents/DataRangeDisplay"
import { getAllDataByDate } from "@/lib/sheets"
import type { SortedData } from "@/types/TopData"

type RankedDataWrapperType = {
  date: string
}

const RankedDataWrapper = async ({ date }: RankedDataWrapperType) => {
  const getData: Promise<SortedData> = getAllDataByDate(date)
  const data = await getData
  return (
    <DataRangeDisplay date={date} data={data} />
  )
}

export default RankedDataWrapper
