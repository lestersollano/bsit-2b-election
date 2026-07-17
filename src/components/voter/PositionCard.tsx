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
        navigate(`/voter/${id}/${position}`)
    }

    return (
        <Item variant={"outline"} onClick={() => handlePosition("president")}>
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
