export default function getRankStringFromNumber(number: number) {
    const lastDigit = number % 10;
    if (lastDigit === 1) {
        return `${number}st`;
    } else if (lastDigit === 2) {
        return `${number}nd`;
    } else {
        return `${number}th`;
    }
}