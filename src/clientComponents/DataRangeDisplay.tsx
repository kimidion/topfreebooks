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
                <button type="button" onClick={() => setRange(1)}>1 day</button>
                <button type="button" onClick={() => setRange(7)}>7 days</button>
                <button type="button" onClick={() => setRange(30)}>30 days</button>
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