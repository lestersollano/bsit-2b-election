import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "./components/ui/card"
import { Separator } from "./components/ui/separator"
import PositionCard from "./components/voter/PositionCard"
import { API_BASE, POSITIONS, type User, type Vote } from "./lib/types"

export function Voter() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [voterName, setVoterName] = useState("")
    const [selections, setSelections] = useState<Record<string, string>>({})
    const [submitting, setSubmitting] = useState(false)

    const complete = POSITIONS.every((position) => selections[position])

    useEffect(() => {
        if (!id) return

        Promise.all([
            fetch(`${API_BASE}/votes/voter/${id}`).then((res) => res.json()),
            fetch(`${API_BASE}/users`).then((res) => res.json()),
        ]).then(([votes, users]: [Vote[], User[]]) => {
            const voter = users.find((user) => user.id === id)
            if (voter) {
                setVoterName(voter.name)
                if (voter.done_voting) {
                    navigate("/results", { replace: true })
                    return
                }
            }

            const next: Record<string, string> = {}
            for (const vote of votes) {
                const candidate = users.find(
                    (user) => user.id === vote.candidate_id
                )
                if (candidate) next[vote.position] = candidate.name
            }
            setSelections(next)
        })
    }, [id, navigate])

    const handleSubmit = async () => {
        if (!id || !complete || submitting) return

        setSubmitting(true)
        try {
            const res = await fetch(`${API_BASE}/votes/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ voter_id: id }),
            })
            if (!res.ok) return

            const user: User = await res.json()
            if (user.done_voting) {
                navigate("/results")
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between">
                <CardHeader>
                    <CardTitle>
                        {voterName ? `${voterName}'s Ballot` : "Ballot"}
                    </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-1 flex-col gap-3 overflow-auto">
                    {POSITIONS.map((position) => (
                        <PositionCard
                            key={position}
                            name={selections[position] ?? "-"}
                            position={position}
                        />
                    ))}
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full"
                        variant={complete ? "default" : "secondary"}
                        disabled={!complete || submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ? "Submitting..." : "Submit Votes"}
                    </Button>
                    <CardDescription className="text-center">
                        Choose a candidate for each position before submitting
                        your ballot
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Voter
