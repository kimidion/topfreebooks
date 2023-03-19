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
    if (!list || list.length === 0)
        return null
    return (
        <div className="bg-white shadow rounded-lg border overflow-hidden mt-5 lg:w-1/2">
            <div className="flex p-3 bg-gray-800">
                <h4 className="text-3xl font-black text-white leading-7 flex-auto grow p-2">{`Top ${topShowing} ${asAuthor ? "Authors" : "Books"}`}</h4>
                {count && 
                    <div className="text-center px-2 md:px-4 lg:px-6">
                        <span className="block text-xl font-semibold leading-7 text-fuchsia-500">{count.toLocaleString()}</span>
                        <span className="block text-xs font-light text-slate-100">downloads</span>
                    </div>
                }
                {percent && 
                    <div className="text-center px-2 md:px-4 lg:px-6">
                        <span className="block text-xl font-semibold leading-7 text-green-400">{(percent * 100).toFixed(1)}%</span>
                        <span className="block text-xs font-light text-slate-100">of the total</span>
                    </div>
                }
            </div>
            <ol className="p-2">
                {asAuthor && list.map((item, index) => (
                    <AuthorListItem key={index+1} rank={index+1} author={item} />
                ))}
                {!asAuthor && list.map((item, index) => (
                    <BookListItem key={item.pgId} rank={index+1} book={item} />
                ))}
            </ol>
        </div>
    )
}
  
export default StatList
