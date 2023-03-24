'use client'
// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
import DateSelect from '../client/DateSelect'
import DataRangeDisplay from '../client/DataRangeDisplay'

const StatPageLoading = () => {
    // const router = useRouter()

    // useEffect(() => {
    //     const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
    //     console.log(
    //         `App is changing to ${url} ${
    //         shallow ? 'with' : 'without'
    //         } shallow routing`
    //     )
    //     }

    //     router.events.on('routeChangeStart', handleRouteChange)
        

    //     // If the component is unmounted, unsubscribe
    //     // from the event with the `off` method:
    //     return () => {
    //         router.events.off('routeChangeStart', handleRouteChange)
    //     }
    // }, [router])
    const loadingData = {
        date: "",
        last1: {
            total: 1234567,
            top_100_authors: {
                top_100_count: 12345,
                top_100_percent: 0.12345,
                top_10_count: 12345,
                top_10_percent: 0.12345,
                top_25_count: 12345,
                top_25_percent: 0.12345,
                top_50_count: 12345,
                top_50_percent: 0.12345,
                list: [
                    { author: "Loading", count: 12345 },
                    { author: "Loading", count: 12345 },
                    { author: "Loading", count: 12345 },
                    { author: "Loading", count: 12345 }
                ]
            },
            top_100_books: {
                top_100_count: 12345,
                top_100_percent: 0.12345,
                top_10_count: 12345,
                top_10_percent: 0.12345,
                top_25_count: 12345,
                top_25_percent: 0.12345,
                top_50_count: 12345,
                top_50_percent: 0.12345,
                list: [
                    { pgId: 1234, title: "Loading", author: "Loading", count: 12345 },
                    { pgId: 1234, title: "Loading", author: "Loading", count: 12345 },
                    { pgId: 1234, title: "Loading", author: "Loading", count: 12345 },
                    { pgId: 1234, title: "Loading", author: "Loading", count: 12345 }
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