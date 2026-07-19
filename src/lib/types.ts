export interface User {
    name: string
    id: string
    is_eligible: boolean
    ineligibility_reason: string
    done_voting: boolean
    created_at?: string
}

export interface Vote {
    id: string
    created_at: string
    voter_id: string
    candidate_id: string
    position: string
}

export const POSITIONS = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Auditor",
    "Public Information Officer (PIO)",
] as const

export type Position = (typeof POSITIONS)[number]

export const API_BASE = "https://bsit-2b-election-backend.onrender.com"

/** Results unlock at this local date/time, or earlier if every voter is done. */
export const RESULTS_REVEAL = {
    month: 7,
    day: 20,
    hour: 20,
    minute: 0,
} as const
