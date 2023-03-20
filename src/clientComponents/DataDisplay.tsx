'use client'
import type { DataInterval } from "@/types/TopData";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import StatList from "./StatList"

type DataDisplayType = {
    classes?: string,
    data?: DataInterval,
    topShowing: number,
    setTopShowing: Dispatch<SetStateAction<number>>
}

const DataDisplay = ({ classes, data, topShowing, setTopShowing }: DataDisplayType) => {
    // all of this state stuff is pretty annoying bc I have an odd data format so it might be better to move this to a custom hook
    const [booksCount, setBooksCount] = useState(data?.top_100_books?.top_10_count || 0)
    const [booksPercent, setBooksPercent] = useState(data?.top_100_books?.top_10_percent || 0)
    const [booksList, setBooksList] = useState(data?.top_100_books?.list || [])
    const [authorsCount, setAuthorsCount] = useState(data?.top_100_authors?.top_10_count || 0)
    const [authorsPercent, setAuthorsPercent] = useState(data?.top_100_authors?.top_10_percent || 0)
    const [authorsList, setAuthorsList] = useState(data?.top_100_authors?.list || [])

    useEffect(() => {
        const toParse = {...data}
        // I don't like this but working with arrays can be finicky
        const bookList = toParse?.top_100_books?.list || []
        const newBookList = [...bookList]
        const authorList = toParse?.top_100_authors?.list || []
        const newAuthorList = [...authorList]
        switch(topShowing) {
            case 10: {
                //set values
                setBooksCount(toParse?.top_100_books?.top_10_count || 0)
                setBooksPercent(toParse?.top_100_books?.top_10_percent || 0)
                setBooksList(newBookList.splice(0,10))
                setAuthorsCount(toParse?.top_100_authors?.top_10_count || 0)
                setAuthorsPercent(toParse?.top_100_authors?.top_10_percent || 0)
                setAuthorsList(newAuthorList.splice(0,10))
                break;
            }
            case 25: {
                //set values
                setBooksCount(toParse?.top_100_books?.top_25_count || 0)
                setBooksPercent(toParse?.top_100_books?.top_25_percent || 0)
                setBooksList(newBookList.splice(0,25))
                setAuthorsCount(toParse?.top_100_authors?.top_25_count || 0)
                setAuthorsPercent(toParse?.top_100_authors?.top_25_percent || 0)
                setAuthorsList(newAuthorList.splice(0,25))
                break
            }
            case 50: {
                //set values
                setBooksCount(toParse?.top_100_books?.top_50_count || 0)
                setBooksPercent(toParse?.top_100_books?.top_50_percent || 0)
                setBooksList(newBookList.splice(0,50))
                setAuthorsCount(toParse?.top_100_authors?.top_50_count || 0)
                setAuthorsPercent(toParse?.top_100_authors?.top_50_percent || 0)
                setAuthorsList(newAuthorList.splice(0,50))
                break
            }
            default: {
                //set values
                setBooksCount(toParse?.top_100_books?.top_100_count || 0)
                setBooksPercent(toParse?.top_100_books?.top_100_percent || 0)
                setBooksList(newBookList)
                setAuthorsCount(toParse?.top_100_authors?.top_100_count || 0)
                setAuthorsPercent(toParse?.top_100_authors?.top_100_percent || 0)
                setAuthorsList(newAuthorList)
                break
            }
        }
    }, [topShowing, data])

    return (
        <div className={`py-4 ${classes}`}>
            <div className="flex items-center">
                {data?.total && 
                    <div className="grow px-3 md:px-5 xl:px-7">
                        <span className="block md:inline text-2xl md:text-3xl font-semibold leading-7 text-fuchsia-800">{data?.total.toLocaleString()} </span>
                        <span className="block md:inline text-xs md:text-lg font-light text-slate-600"> total downloads</span>
                    </div>
                }
                <div className="bg-white isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <button type="button" onClick={() => topShowing !== 10 ? setTopShowing(10) : null} className={`${topShowing === 10 ? "bg-green-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-l-md`}>
                        <span className="hidden sm:block">Top&nbsp;</span> 10
                    </button>
                    <button type="button" onClick={() => topShowing !== 25 ? setTopShowing(25) : null} className={`${topShowing === 25 ? "bg-green-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}>
                        <span className="hidden sm:block">Top&nbsp;</span> 25
                    </button>
                    <button type="button" onClick={() => topShowing !== 50 ? setTopShowing(50) : null} className={`${topShowing === 50 ? "bg-green-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}>
                        <span className="hidden sm:block">Top&nbsp;</span> 50
                    </button>
                    <button type="button" onClick={() => topShowing !== 100 ? setTopShowing(100) : null} className={`${topShowing === 100 ? "bg-green-200" : "hover:bg-gray-50"} relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-r-md`}>
                        <span className="hidden sm:block">Top&nbsp;</span> 100
                    </button>
                </div>
            </div>
            <div className="lg:flex lg:gap-2 lg:items-start">
                <StatList
                    topShowing={topShowing}
                    count={booksCount}
                    percent={booksPercent}
                    list={booksList}
                    asAuthor={false}
                />
                <StatList
                    topShowing={topShowing}
                    count={authorsCount}
                    percent={authorsPercent}
                    list={authorsList}
                    asAuthor={true}
                />
            </div>
        </div>
    )
}
  
export default DataDisplay
