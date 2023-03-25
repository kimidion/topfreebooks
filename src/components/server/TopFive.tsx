import type { SortedTopFive } from "@/types/TopData"
import StatList from "../client/StatList"
import Link from "next/link"

type TopFiveType = {
    data: SortedTopFive | null
}

const TopFive = ({ data }: TopFiveType) => {
    let title = "Loading..."
    let bookCount = 0, bookPercent = 0, authorCount = 0, authorPercent = 0
    if (data) {
        const dateSplit = data.date.split("-")
        const dateObj = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1])-1, parseInt(dateSplit[2]))
        const pastDate = dateObj
        let dateStr = dateObj.toLocaleDateString()
        title = `Top Five for Yesterday - ${dateStr}`
        bookCount = data.books.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)
        bookPercent = bookCount / data.total
        authorCount = data.authors.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)
        authorPercent = authorCount / data.total
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
                        <Link className="text-md" href={`/${data?.date}`}>SEE THE FULL LIST</Link>
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

export default TopFive
