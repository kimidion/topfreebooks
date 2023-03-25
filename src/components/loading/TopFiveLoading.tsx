import type { SortedTopFive } from "@/types/TopData"
import StatList from "../client/StatList"
import Link from "next/link"

const TopFiveLoading = () => {
    const title = "Loading...",
        bookCount = 123, 
        bookPercent = 0.123, 
        authorCount = 123, 
        authorPercent = 0.123
    const data = {
        total: 1234,
        books: [
            { pgId: 1234, title: "Loading", author: "...", count: 123 },
            { pgId: 1234, title: "Loading", author: "...", count: 123 },
            { pgId: 1234, title: "Loading", author: "...", count: 123 },
            { pgId: 1234, title: "Loading", author: "...", count: 123 },
            { pgId: 1234, title: "Loading", author: "...", count: 123 }
        ],
        authors: [
            { author: "Loading", count: 123 },
            { author: "Loading", count: 123 },
            { author: "Loading", count: 123 },
            { author: "Loading", count: 123 },
            { author: "Loading", count: 123 }
        ]
    }
    return (
        <div>
            <div className="flex items-center mt-3">
                <h2 id="top" className="px-4 text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 grow">{title}</h2>
            </div>
            <div className="py-4">
                <div className="flex items-center">
                    {data?.total && 
                        <div className="grow px-3 md:px-5 xl:px-7">
                            <span className="block md:inline text-2xl md:text-3xl font-semibold leading-7 text-fuchsia-800">{data?.total.toLocaleString()} </span>
                            <span className="block md:inline text-xs md:text-lg font-light text-slate-600"> total downloads</span>
                        </div>
                    }
                    <div className="bg-white isolate inline-flex -space-x-px rounded-md shadow-sm px-4 py-2 underline underline-offset-1">
                        <Link className="text-md" href={`/`}>LOADING</Link>
                    </div>
                </div>
                <div className="lg:flex lg:gap-2 lg:items-start">
                    <StatList
                        topShowing={5}
                        list={data?.books}
                        asAuthor={false}
                        count={bookCount}
                        percent={bookPercent}
                    />
                    <StatList
                        topShowing={5}
                        list={data?.authors}
                        asAuthor={true}
                        count={authorCount}
                        percent={authorPercent}
                    />
                </div>
            </div>
        </div>
    )
}

export default TopFiveLoading
