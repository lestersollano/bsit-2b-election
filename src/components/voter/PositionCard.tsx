import { useNavigate, useParams } from "react-router"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "../ui/item"
import { ChevronRight } from "lucide-react"

function PositionCard({ name, position }: { name: string; position: string }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const handlePosition = (position: string) => {
        navigate(`/voter/${id}/${encodeURIComponent(position)}`)
    }

    return (
        <Item
            variant={"outline"}
            onClick={() => handlePosition(position)}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-[102%]"
        >
            <ItemContent>
                <ItemTitle className="text-lg">{name}</ItemTitle>
                <ItemDescription>{position}</ItemDescription>
            </ItemContent>
            <ItemActions>
                <ItemMedia variant={"icon"}>
                    <ChevronRight color="grey"></ChevronRight>
                </ItemMedia>
            </ItemActions>
        </Item>
    )
}

export default PositionCard
