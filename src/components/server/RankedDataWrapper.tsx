import DataRangeDisplay from "@/components/client/DataRangeDisplay"
import type { SortedData } from "@/types/TopData"

type RankedDataWrapperType = {
  date: string,
  dataPromise: Promise<SortedData>
}

const RankedDataWrapper = async ({ date, dataPromise }: RankedDataWrapperType) => {
  const data = await dataPromise
  return (
    <DataRangeDisplay date={date} data={data} />
  )
}

export default RankedDataWrapper
