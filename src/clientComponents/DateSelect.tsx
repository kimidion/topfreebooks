'use client'
import { getAvailableDates } from "@/utils/getAvailableDates"
import { useRouter } from "next/navigation"

type DateSelectType = {
    date: string,
}

const DateSelect = ({ date }: DateSelectType) => {
    const dateList = getAvailableDates()
    const router = useRouter();
    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      router.push(`/${e.currentTarget.value}`)
    }
    return (
        <select onChange={handleDateChange} defaultValue={date}>
          {dateList.map((dateOption) => {
            return (
              <option key={dateOption.formatted} value={dateOption.formatted}>
                {dateOption.date.toLocaleDateString()}
              </option>
            )
          })}
        </select>
    )
}
  
export default DateSelect
