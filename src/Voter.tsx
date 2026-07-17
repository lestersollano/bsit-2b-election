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

export function Voter() {
    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between">
                <CardHeader>
                    <CardTitle>Princess Janella Francisco's Ballot</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-1 flex-col gap-3 overflow-auto">
                    <PositionCard
                        name="Rainniel Sanchez"
                        position="President"
                    />
                    <PositionCard
                        name="Rainniel Sanchez"
                        position="Vice President"
                    />
                    <PositionCard
                        name="Rainniel Sanchez"
                        position="Secretary"
                    />
                    <PositionCard
                        name="Rainniel Sanchez"
                        position="Treasurer"
                    />
                    <PositionCard name="Rainniel Sanchez" position="Auditor" />
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full" variant={"secondary"}>
                        Sumbit Votes
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
