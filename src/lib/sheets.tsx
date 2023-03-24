import "server-only"
import { google } from 'googleapis'
import type { SortedData, RankedStats, Stat } from "@/types/TopData"

// export async function getAllDailyCount() {
//   try {
//     const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
//     const sheets = google.sheets({ version: 'v4', auth })
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: process.env.SPREADSHEET_ID,
//       range: 'dailyCount!A:E', // sheet name
//     })

//     const rows = response.data.values
//     if (rows?.length) {
//       const formatted = rows.map((row) => ({
//         date: row[1],
//         last1: row[2],
//         last7: row[3],
//         last30: row[4]
//       }))
//       return formatted.slice(1, formatted.length)
//     }
//   } catch (err) {
//     console.log(err)
//   }
//   return []
// }

// export async function getAllTopBooks() {
//     try {
//         const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
//         const sheets = google.sheets({ version: 'v4', auth })
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: process.env.SPREADSHEET_ID,
//             range: 'topBooks!A:L', // sheet name
//         })
    
//         const rows = response.data.values
//         if (rows?.length) {
//             const formatted = rows.map((row) => ({
//                 date: row[1],
//                 category: row[2],
//                 total_count: row[3],
//                 total_percent: row[4],
//                 top_10_count: row[5],
//                 top_10_percent: row[6],
//                 top_25_count: row[7],
//                 top_25_percent: row[8],
//                 top_50_count: row[9],
//                 top_50_percent: row[10],
//                 list: row[11]
//             }))
//             return formatted.slice(1, formatted.length)
//         }
//     } catch (err) {
//         console.log(err)
//     }
//     return []
// }

// export async function getAllTopAuthors() {
//     try {
//         const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] })
//         const sheets = google.sheets({ version: 'v4', auth })
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId: process.env.SPREADSHEET_ID,
//             range: 'topAuthors!A:L', // sheet name
//         })
    
//         const rows = response.data.values
//         if (rows?.length) {
//             const formatted = rows.map((row) => ({
//                 date: row[1],
//                 category: row[2],
//                 total_count: row[3],
//                 total_percent: row[4],
//                 top_10_count: row[5],
//                 top_10_percent: row[6],
//                 top_25_count: row[7],
//                 top_25_percent: row[8],
//                 top_50_count: row[9],
//                 top_50_percent: row[10],
//                 list: row[11]
//             }))
//             return formatted.slice(1, formatted.length)
//         }
//     } catch (err) {
//         console.log(err)
//     }
//     return []
// }

export async function getAllDataByDate(date: string) {
    const dailyData: SortedData = { date }
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const jwt = new google.auth.JWT(
            process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            undefined,
            (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            target
        )
        const sheets = google.sheets({ version: 'v4', auth: jwt })
        const dailySheet = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'dailyCount!A:E', // sheet name
        })
        const authorSheet = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'topAuthors!A:L', // sheet name
        })
        const bookSheet = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'topBooks!A:L', // sheet name
        })
        const daily = dailySheet.data.values?.filter((day) => {
            return day[1] == date 
        })
        const authors = authorSheet.data.values?.filter((day) => {
            return day[1] == date 
        })
        const books = bookSheet.data.values?.filter((day) => {
            return day[1] == date 
        })
        if (daily?.length) {
            dailyData.last1 = {
                total: parseInt(daily[0][2])
            }
            dailyData.last7 = {
                total: parseInt(daily[0][3])
            }
            dailyData.last30 = {
                total: parseInt(daily[0][4])
            }
            if (authors?.length) {
                dailyData.last1.top_100_authors = parseRow(authors[0], true)
                dailyData.last7.top_100_authors = parseRow(authors[1], true)
                dailyData.last30.top_100_authors = parseRow(authors[2], true)
            }
            if (books?.length) {
                dailyData.last1.top_100_books = parseRow(books[0], false)
                dailyData.last7.top_100_books = parseRow(books[1], false)
                dailyData.last30.top_100_books = parseRow(books[2], false)
            }
        }
    } catch (err) {
      console.log(err)
    }
    return dailyData
}

const parseRow = (data: Array<string>, asAuthor: boolean): RankedStats => {
    return {
        top_100_count: parseInt(data[3]),
        top_100_percent: parseFloat(data[4]),
        top_10_count: parseInt(data[5]),
        top_10_percent: parseFloat(data[6]),
        top_25_count: parseInt(data[7]),
        top_25_percent: parseFloat(data[8]),
        top_50_count: parseInt(data[9]),
        top_50_percent: parseFloat(data[10]),
        list: asAuthor ? parseAuthorList(data[11]) : parseBookList(data[11])
    }
}

const parseBookList = (data: string): Array<Stat> => {
    const list = JSON.parse(data)
    const formatted = list.map((row: { pgId: string, name: string, count: string }) => {
        const nameSplit = row.name.trim().split(" by ")
        return ({
            pgId: parseInt(row.pgId),
            title: nameSplit[0],
            author: nameSplit[1],
            count: parseInt(row.count)
        })
    })
    return formatted
} 

const parseAuthorList = (data: string): Array<Stat> => {
    const list = JSON.parse(data)
    const formatted = list.map((row: { name: string, count: string }) => ({
        author: row.name.trim(),
        count: parseInt(row.count)
    }))
    return formatted
} 