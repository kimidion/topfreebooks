'use client'
import type { Stat } from "@/types/TopData"

type AuthorListItemType = {
    author: Stat,
    rank: number
}
  

const AuthorListItem = ({ author, rank }: AuthorListItemType) => {
    return (
        <li className="border-b p-2 flex last:border-b-0 hover:bg-slate-100">
            <div className="flex-none w-8 lg:w-10 text-lg font-semibold text-right">{rank}.</div>
            <div className="flex-auto grow  px-2 md:px-4">
                <span className="block text-xl font-black leading-7">{author.author}</span>
            </div>
            <div className="text-center px-2 md:px-4 lg:px-6">
                <span className="block text-xl font-semibold leading-7 text-fuchsia-800">{author.count.toLocaleString()}</span>
                <span className="block text-xs font-light text-slate-600">downloads</span>
            </div>
        </li>
    )
}
  
export default AuthorListItem