import DataRangeDisplay from "@/clientComponents/DataRangeDisplay"
import DateSelect from "@/clientComponents/DateSelect"
import { getAllDataByDate } from "@/lib/sheets"

type PageType = {
  params: {
    date: string
  }
}

const Page = async ({ params: { date } }: PageType) => {
  const data = await getAllDataByDate(date)
  return (
    <>
        <DateSelect date={date} dateList={data.dateList} />
        <DataRangeDisplay date={date} data={data} />
    </>
  )
}

export default Page
