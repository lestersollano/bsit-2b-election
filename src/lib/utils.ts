import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function timeUntil(
    month: number,
    day: number,
    militaryTimeHour: number,
    militaryTimeMinute: number
): { text: string; elapsed: boolean } {
    const now = new Date()

    // Month is 0-based in JavaScript
    const target = new Date(
        now.getFullYear(),
        month - 1,
        day,
        militaryTimeHour,
        militaryTimeMinute,
        0
    )

    // If the date has already passed this year, assume next year
    if (target.getTime() < now.getTime()) {
        return { text: "this moment.", elapsed: true }
    }

    let diff = Math.floor((target.getTime() - now.getTime()) / 1000)

    const hours = Math.floor(diff / 3600)
    diff %= 3600

    const minutes = Math.floor(diff / 60)
    const seconds = diff % 60

    const parts: string[] = []

    if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`)
    if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`)
    if (seconds > 0 || parts.length === 0)
        parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`)

    if (parts.length === 1) return { text: parts[0], elapsed: false }
    if (parts.length === 2)
        return { text: `${parts[0]} and ${parts[1]}`, elapsed: false }

    const text = `${parts.slice(0, -1).join(", ")}, and ${parts.at(-1)}`

    return { text, elapsed: false }
}
