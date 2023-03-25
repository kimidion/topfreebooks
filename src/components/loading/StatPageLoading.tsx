'use client'

import DateSelect from '../client/DateSelect'
import DataRangeDisplay from '../client/DataRangeDisplay'

const StatPageLoading = () => {
    const loadingData = {
        date: "",
        last1: {
            total: 12345,
            top_100_authors: {
                top_100_count: 123,
                top_100_percent: 0.123,
                top_10_count: 123,
                top_10_percent: 0.123,
                top_25_count: 123,
                top_25_percent: 0.123,
                top_50_count: 123,
                top_50_percent: 0.123,
                list: [
                    { author: "Loading", count: 123 },
                    { author: "Loading", count: 123 },
                    { author: "Loading", count: 123 },
                    { author: "Loading", count: 123 },
                    { author: "Loading", count: 123 },
                    { author: "Loading", count: 123 }
                ]
            },
            top_100_books: {
                top_100_count: 123,
                top_100_percent: 0.123,
                top_10_count: 123,
                top_10_percent: 0.123,
                top_25_count: 123,
                top_25_percent: 0.123,
                top_50_count: 123,
                top_50_percent: 0.123,
                list: [
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                    { pgId: 1234, title: "Loading", author: "...", count: 123 },
                ]
            }
        }
    }
    return (
        <>
            <div className="animate-pulse">
                <DateSelect date="" disabled />
                <DataRangeDisplay date="" data={loadingData} loading />
            </div>
        </>
    )
}
  
export default StatPageLoading