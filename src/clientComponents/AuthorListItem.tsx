'use client'

type AuthorListItemType = {
    author: Stat,
    rank: number
}
  

const AuthorListItem = ({ author, rank }: AuthorListItemType) => {
    return (
        <li>{rank}. {author.author} ({author.count.toLocaleString()})</li>
    )
}
  
export default AuthorListItem