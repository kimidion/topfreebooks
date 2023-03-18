
type SortedData = {
    date: string
    dateList: Array<string>
    last1?: DataInterval
    last7?: DataInterval
    last30?: DataInterval
}

type DataInterval = {
    total: number
    top_100_authors?: RankedStats
    top_100_books?: RankedStats
}

type RankedStats = {
    top_100_count: number
    top_100_percent: number
    top_10_count: number
    top_10_percent: number
    top_25_count: number
    top_25_percent: number
    top_50_count: number
    top_50_percent: number
    list: Array<Stat>
}

type Stat = {
    pgId?: number
    title?: string
    author: string
    count: number
}
