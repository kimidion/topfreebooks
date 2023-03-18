'use client'
import { useRouter } from "next/navigation"

type DateSelectType = {
    date: string,
    dateList: Array<string>
}

const DateSelect = ({ date, dateList }: DateSelectType) => {
    const router = useRouter();
    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(`/${e.currentTarget.value}`)
      }
    return (
        <select onChange={handleDateChange} defaultValue={date}>
          {dateList.map((dateOption) => {
            return (
              <option key={dateOption} value={dateOption}>
                {dateOption}
              </option>
            )
          })}
        </select>
    )
}
  
export default DateSelect
