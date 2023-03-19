'use client'
import { useEffect, useState } from "react"
import type { SortedData } from "@/types/TopData"
import DataDisplay from "./DataDisplay"

type DataRangeDisplayType = {
    date: string,
    data: SortedData
}
  

const DataRangeDisplay = ({ date, data }: DataRangeDisplayType) => {
    const [range, setRange] = useState(1)
    const [title, setTitle] = useState('')
    const [topShowing, setTopShowing] = useState(10)
    useEffect(() => {
        const dateSplit = date.split("-")
        const dateObj = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]))
        const pastDate = dateObj
        let dateStr = dateObj.toLocaleDateString()
        switch(range) {
            case 7: {
                pastDate.setDate(pastDate.getDate() - 7);
                dateStr = `${pastDate.toLocaleDateString()} - ${dateStr}`
                break
            }
            case 30: {
                pastDate.setDate(pastDate.getDate() - 30);
                dateStr = `${pastDate.toLocaleDateString()} - ${dateStr}`
                break
            }
            default: {
            }
        }
        setTitle(dateStr)

    }, [date, range])
    return (
        <>
            <h2>{title}</h2>
            <div>
                <button type="button" onClick={() => range !== 1 ? setRange(1) : null} className={`${range === 1 ? "bg-cyan-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-l-md`}>
                    1 day
                </button>
                <button type="button" onClick={() => range !== 7 ? setRange(7) : null} className={`${range === 7 ? "bg-cyan-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}>
                    7 days
                </button>
                <button type="button" onClick={() => range !== 30 ? setRange(30) : null} className={`${range === 30 ? "bg-cyan-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-r-md`}>
                    30 days
                </button>
            </div>
            <div>
                {range === 1 &&
                    <DataDisplay
                        data={data.last1}
                        topShowing={topShowing}
                        setTopShowing={setTopShowing}
                    />
                }
                {range === 7 &&
                    <DataDisplay
                        data={data.last7}
                        topShowing={topShowing}
                        setTopShowing={setTopShowing}
                    />
                }
                {range === 30 &&
                    <DataDisplay
                        data={data.last30}
                        topShowing={topShowing}
                        setTopShowing={setTopShowing}
                    />
                }
            </div>
        </>
    )
}
  
export default DataRangeDisplay