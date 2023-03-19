'use client'
import type { Stat } from "@/types/TopData"
import BookListItem from "./BookListItem"
import AuthorListItem from "./AuthorListItem"

type StatListType = {
    list?: Array<Stat>,
    topShowing: number,
    asAuthor: boolean,
    count?: number,
    percent?: number
}

const StatList = ({ list, topShowing, count, percent, asAuthor }: StatListType) => {
    return (
        <>
            {list && list.length > 0 &&
                <div>
                    <h4>{`Top ${topShowing} ${asAuthor ? "Authors" : "Books"}`}</h4>
                    <p>
                        {count && <span>{count.toLocaleString()}</span>}
                        {percent && <span>({(percent * 100).toFixed(1)}% of the total)</span>}
                    </p>
                    <ol>
                        {asAuthor && list.map((item, index) => (
                            <AuthorListItem key={index+1} rank={index+1} author={item} />
                        ))}
                        {!asAuthor && list.map((item, index) => (
                            <BookListItem key={item.pgId} rank={index+1} book={item} />
                        ))}
                    </ol>
                </div>
            }
        </>
    )
}
  
export default StatList
