import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_BASE, RESULTS_REVEAL, type User } from "./types"

/** Philippines observes UTC+8 year-round (no DST). */
const MANILA_OFFSET_MS = 8 * 60 * 60 * 1000

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function allVotersDone(users: User[]) {
    return users.length > 0 && users.every((user) => user.done_voting)
}

/** Instant for a wall-clock time in Asia/Manila. */
export function manilaDate(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number
) {
    return new Date(
        Date.UTC(year, month - 1, day, hour, minute, 0) - MANILA_OFFSET_MS
    )
}

export function isResultsRevealTime() {
    return timeUntil(
        RESULTS_REVEAL.month,
        RESULTS_REVEAL.day,
        RESULTS_REVEAL.hour,
        RESULTS_REVEAL.minute,
        RESULTS_REVEAL.year
    ).elapsed
}

/** Frontend voting cutoff — same instant as results reveal (Jul 20, 2026 8:00 PM PH). */
export function isVotingClosed() {
    return isResultsRevealTime()
}

export async function areResultsReady() {
    if (isResultsRevealTime()) return true
    const res = await fetch(`${API_BASE}/users`)
    const users: User[] = await res.json()
    return allVotersDone(users)
}

export function timeUntil(
    month: number,
    day: number,
    militaryTimeHour: number,
    militaryTimeMinute: number,
    year?: number
): { text: string; elapsed: boolean } {
    const now = new Date()
    const targetYear = year ?? now.getFullYear()
    const target = manilaDate(
        targetYear,
        month,
        day,
        militaryTimeHour,
        militaryTimeMinute
    )

    if (target.getTime() <= now.getTime()) {
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
