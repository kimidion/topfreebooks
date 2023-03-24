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
        <div className="mt-2 lg:w-1/2">
            <div className="text-right lg:hidden m-2 text-sm font-light underline text-slate-700">
                {asAuthor && <a className="" href="#books">Jump to Books</a>}
                {!asAuthor && <a className="" href="#authors">Jump to Authors</a>}
            </div>
            <div className="bg-white shadow rounded-lg border overflow-hidden">
                <div id={asAuthor ? "authors" : "books"} className="sm:flex p-3 bg-gray-800">
                    <h4 className="mb-2 sm:mb-0 text-center sm:text-left text-3xl lg:text-2xl xl:text-3xl font-black text-white leading-7 flex-auto grow p-2">{`Top ${topShowing} ${asAuthor ? "Authors" : "Books"}`}</h4>
                    {count && 
                        <div className="w-1/2 sm:w-auto inline-block sm:block text-center px-2 md:px-4 xl:px-6">
                            <span className="block text-xl font-semibold leading-7 text-fuchsia-400">{count.toLocaleString()}</span>
                            <span className="block text-xs font-light text-slate-100">downloads</span>
                        </div>
                    }
                    {percent && 
                        <div className="w-1/2 sm:w-auto inline-block sm:block text-center px-2 md:px-4 xl:px-6">
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
                <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6 flex items-center">
                    <p className="text-sm text-gray-700 grow">
                        Showing <span className="font-medium">1</span> - <span className="font-medium">{topShowing}</span> of <span className="font-medium">100</span>
                    </p>
                    <p className="text-right lg:hidden m-2 text-sm font-light underline text-slate-700">
                        <a className="" href="#top">Top</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
  
export default StatList
