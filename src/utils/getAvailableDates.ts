// the earliest date is March 13, 2023 - I can hard code this bc I am familiar with my populated data
// the data starts on March 13, 2023 and has a new day of data added once daily
const earliestDate = new Date(2023, 2, 13)

export const getLocalLatest = (): Date => {
    // current datetime string in America/Chicago timezone
    const now = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
    // create new Date object
    const newDate = new Date(now)
    newDate.setDate(newDate.getDate() - 1)
    return newDate
}

export const getLatestDateFormatted = (): string => {
    return formatDate(getLocalLatest())
}

export const getAvailableDates = (): Array<{ date: Date, formatted: string }> => {
    let date = getLocalLatest()
    const dateList = []
    while(date > earliestDate) {
        const thisDate = new Date(date)
        dateList.push({
            date: thisDate,
            formatted: formatDate(thisDate)
        })
        date.setDate(date.getDate() - 1);
    }
    return dateList
}

const formatDate = (newDate: Date) => {
    // year as (YYYY) format
    let year = newDate.getFullYear()
    // month as (MM) format
    let month = ("0" + (newDate.getMonth() + 1)).slice(-2)
    // date as (DD) format
    let date = ("0" + newDate.getDate()).slice(-2)
    // date time in YYYY-MM-DD format
    return `${year}-${month}-${date}`
}