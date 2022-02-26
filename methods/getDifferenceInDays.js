export default function getDifferenceInDays(date) {
    const start = new Date(2022, 0, 1)
    const diffTime = Math.abs(start - date.timestamp)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}