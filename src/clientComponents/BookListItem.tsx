'use client'
import { Stat } from "@/types/TopData"

type BookListItemType = {
    book: Stat,
    rank: number
}

const BookListItem = ({ book, rank }: BookListItemType) => {
    return (
        <li>{rank}. {book.title} by {book.author} ({book.count.toLocaleString()})</li>
    )
}
  
export default BookListItem
  