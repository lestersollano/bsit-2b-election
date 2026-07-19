import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "../ui/item"
import { ChevronRight, Loader2 } from "lucide-react"
import { API_BASE, type Vote } from "@/lib/types"

function NameCard({
    name,
    candidateId,
}: {
    name: string
    candidateId: string
}) {
    const { id, position } = useParams()
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)

    const handleVote = async () => {
        if (!id || !position || submitting) return

        setSubmitting(true)
        try {
            const res = await fetch(`${API_BASE}/votes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    voter_id: id,
                    candidate_id: candidateId,
                    position,
                }),
            })

            if (!res.ok) return

            const vote: Vote = await res.json()
            if (
                vote.id &&
                vote.voter_id &&
                vote.candidate_id &&
                vote.position
            ) {
                navigate(`/voter/${id}`)
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Item
            variant={"outline"}
            onClick={handleVote}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-[102%]"
        >
            <ItemContent>
                <ItemTitle className="text-lg">{name}</ItemTitle>
            </ItemContent>
            <ItemActions>
                <ItemMedia variant={"icon"}>
                    {submitting ? (
                        <Loader2 className="animate-spin" color="grey" />
                    ) : (
                        <ChevronRight color="grey" />
                    )}
                </ItemMedia>
            </ItemActions>
        </Item>
    )
}

export default NameCard
