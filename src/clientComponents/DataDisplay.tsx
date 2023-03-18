'use client'
import { DataInterval } from "@/types/TopData";
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
        <div className={`p-4 ${classes}`}>
            {data?.total && 
                <h3>{data?.total.toLocaleString()} total downloads</h3>
            }
            <div>
                <button type="button" onClick={() => setTopShowing(10)}>Top 10</button>
                <button type="button" onClick={() => setTopShowing(25)}>Top 25</button>
                <button type="button" onClick={() => setTopShowing(50)}>Top 50</button>
                <button type="button" onClick={() => setTopShowing(100)}>Top 100</button>
            </div>
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
    )
}
  
export default DataDisplay
