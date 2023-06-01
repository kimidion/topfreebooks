'use client'
import { earliestDate, latestDate, getDateFromFormatted, formatDate } from "@/utils/getAvailableDates"
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DateSelectType = {
    date: string,
    disabled?: boolean
}

const DateSelect = ({ date, disabled }: DateSelectType) => {
    const router = useRouter();
    const thisDate = getDateFromFormatted(date)
    const setSelected = (selected: Date | undefined) => {
      if (!selected)
        return null
      const datePath = formatDate(selected)
      router.push(`./${datePath}`)
    }
    return (
        <div className="w-full flex items-end">
          <div className="grow"></div>
          <Popover as="div" className="relative inline-block text-left">
            <Popover.Button disabled={disabled} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              Change Date
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Popover.Button>
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-100 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="">
                <DayPicker
                  mode="single"
                  selected={thisDate}
                  onSelect={setSelected}
                  fromDate={earliestDate}
                  toDate={latestDate}
                />
              </div>
            </Popover.Panel>
          </Popover>
        </div>
    )
}
  
export default DateSelect
