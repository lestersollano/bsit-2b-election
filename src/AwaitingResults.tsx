import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "./components/ui/card"
import { Separator } from "./components/ui/separator"
import {
    Item,
    ItemContent,
    ItemTitle,
} from "./components/ui/item"
import { API_BASE, RESULTS_REVEAL, type User } from "./lib/types"
import { allVotersDone, timeUntil } from "./lib/utils"

export function AwaitingResults() {
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState({ text: "", elapsed: false })
    const [doneCount, setDoneCount] = useState({ done: 0, total: 0 })
    const [pending, setPending] = useState<User[]>([])

    useEffect(() => {
        let cancelled = false

        const check = async () => {
            const countdown = timeUntil(
                RESULTS_REVEAL.month,
                RESULTS_REVEAL.day,
                RESULTS_REVEAL.hour,
                RESULTS_REVEAL.minute,
                RESULTS_REVEAL.year
            )
            if (!cancelled) setTimeLeft(countdown)

            try {
                const res = await fetch(`${API_BASE}/users`)
                const users: User[] = await res.json()
                if (cancelled) return

                setDoneCount({
                    done: users.filter((user) => user.done_voting).length,
                    total: users.length,
                })
                setPending(users.filter((user) => !user.done_voting))

                if (countdown.elapsed || allVotersDone(users)) {
                    navigate("/results", { replace: true })
                }
            } catch {
                if (countdown.elapsed && !cancelled) {
                    navigate("/results", { replace: true })
                }
            }
        }

        check()
        const interval = setInterval(check, 1000)
        return () => {
            cancelled = true
            clearInterval(interval)
        }
    }, [navigate])

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-sm justify-between">
                <CardHeader>
                    <CardTitle>Results Pending</CardTitle>
                    <CardDescription>
                        Names below have not finished voting yet
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-1 flex-col gap-3 overflow-auto">
                    {pending.length === 0 ? (
                        <CardDescription className="text-center">
                            Everyone has finished voting
                        </CardDescription>
                    ) : (
                        pending.map((user) => (
                            <Item key={user.id} variant="outline">
                                <ItemContent>
                                    <ItemTitle className="text-lg">
                                        {user.name}
                                    </ItemTitle>
                                </ItemContent>
                            </Item>
                        ))
                    )}
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col gap-3">
                    <div className="bg-muted h-2 w-full overflow-hidden">
                        <div
                            className="bg-primary h-full transition-all duration-500"
                            style={{
                                width:
                                    doneCount.total > 0
                                        ? `${(doneCount.done / doneCount.total) * 100}%`
                                        : "0%",
                            }}
                        />
                    </div>
                    <CardDescription className="text-center">
                        {doneCount.total > 0
                            ? `${doneCount.done} of ${doneCount.total} voters finished`
                            : "Checking voter status..."}
                    </CardDescription>
                    <CardDescription className="text-center">
                        {timeLeft.elapsed
                            ? "Reveal time reached. Opening results..."
                            : `Opens in ${timeLeft.text}`}
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AwaitingResults
