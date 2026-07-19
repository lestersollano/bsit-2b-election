import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "./components/ui/card"
import { Separator } from "./components/ui/separator"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "./components/ui/item"
import { API_BASE, POSITIONS, type User, type Vote } from "./lib/types"
import { areResultsReady } from "./lib/utils"

export function Results() {
    const navigate = useNavigate()
    const [ready, setReady] = useState(false)
    const [winners, setWinners] = useState<Record<string, string>>({})

    useEffect(() => {
        let cancelled = false

        areResultsReady()
            .then((isReady) => {
                if (cancelled) return
                if (!isReady) {
                    navigate("/awaiting-results", { replace: true })
                    return
                }
                setReady(true)
            })
            .catch(() => {
                if (!cancelled) navigate("/awaiting-results", { replace: true })
            })

        return () => {
            cancelled = true
        }
    }, [navigate])

    useEffect(() => {
        if (!ready) return

        Promise.all([
            fetch(`${API_BASE}/votes`).then((res) => res.json()),
            fetch(`${API_BASE}/users`).then((res) => res.json()),
        ]).then(([votes, users]: [Vote[], User[]]) => {
            const counts: Record<string, Record<string, number>> = {}
            for (const position of POSITIONS) {
                counts[position] = {}
            }

            for (const vote of votes) {
                if (!counts[vote.position]) counts[vote.position] = {}
                counts[vote.position][vote.candidate_id] =
                    (counts[vote.position][vote.candidate_id] ?? 0) + 1
            }

            const next: Record<string, string> = {}
            for (const position of POSITIONS) {
                const entries = Object.entries(counts[position])
                if (entries.length === 0) {
                    next[position] = "-"
                    continue
                }

                const max = Math.max(...entries.map(([, count]) => count))
                const top = entries
                    .filter(([, count]) => count === max)
                    .map(
                        ([candidateId]) =>
                            users.find((user) => user.id === candidateId)
                                ?.name ?? "Unknown"
                    )

                next[position] = top.join(" / ")
            }
            setWinners(next)
        })
    }, [ready])

    if (!ready) return null

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between">
                <CardHeader>
                    <CardTitle>Election Results</CardTitle>
                    <CardDescription>
                        Official winners of the 2026 BSIT 2B Class Elections
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-1 flex-col gap-3 overflow-auto">
                    {POSITIONS.map((position) => (
                        <Item key={position} variant="outline">
                            <ItemContent>
                                <ItemTitle className="text-lg">
                                    {winners[position] ?? "-"}
                                </ItemTitle>
                                <ItemDescription>{position}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default Results
