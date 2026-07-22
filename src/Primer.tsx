import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "./components/ui/card"
import { isVotingClosed, timeUntil } from "./lib/utils"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Separator } from "./components/ui/separator"

export function Primer() {
    const [timeLeft, setTimeLeft] = useState({ text: "", elapsed: false })
    const navigate = useNavigate()

    const handleClick = () => {
        if (isVotingClosed()) {
            navigate("/results")
            return
        }
        if (timeLeft.elapsed) {
            navigate("/validation")
        }
    }

    useEffect(() => {
        const update = () => {
            setTimeLeft(timeUntil(7, 20, 10, 0, 2026))
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between">
                <CardHeader>
                    <CardTitle>BSIT 2B Class Elections</CardTitle>
                    <CardDescription>
                        Welcome to the official 2026 BSIT 2B Class Election
                        portal!
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="flex-1 overflow-auto">
                    <CardDescription className="text-justify">
                        This election will conduct a{" "}
                        <strong>Direct Democracy</strong>. This means all
                        members of our class are candidates.
                        <br />
                        <br />
                        You can vote anyone in our section including yourself
                        but only for one position each.
                        <br />
                        <br />
                        Your votes will be publicly accessible and can be viewed
                        by anyone. This ensures transparency is observed and no
                        vote is forged.
                        <br />
                        <br />
                        The result of the election is non-negotioable. This
                        means a winner cannot revoke their position.
                        <br />
                        <br />
                        Some members are <strong>disqualified</strong> from
                        candidacy due to reasons mentioned below:
                        <br />
                        <br />
                        <strong>Lester Matthew Sollano</strong> - SSC Vice
                        President of Internal Affairs
                        <br />
                        <strong>Ivan Migs Bergania</strong> - Irregular Schedule
                        <br />
                        <br />
                        The Official BSIT 2B 2026 Election will start in{" "}
                        <strong>July 20, 2026</strong> at exactly{" "}
                        <strong>10:00 AM</strong>.
                        <br />
                        <br />
                        Regardless if you vote or not, only the existing votes
                        before <strong>July 20, 2026 8:00 PM</strong> will be
                        the basis for the winners of each position.
                        <br />
                        <br />
                        <hr />
                        <br />
                        In the event of a winner gets disqualified due to
                        unforseen circumstances, a classroom based election will
                        be held in a future date.
                        <br />
                        <br />
                        In the event of a tie, both candidates can settle it
                        themselves or a tiebreaker will be held in the Messenger
                        announcement group chat.
                    </CardDescription>
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        variant={timeLeft.elapsed ? "default" : "secondary"}
                        className="w-full"
                        onClick={handleClick}
                    >
                        PROCEED
                    </Button>
                    <CardDescription className="text-center">
                        {timeLeft.elapsed
                            ? "By proceeding you agree to the terms mentioned above"
                            : `You can proceed in ${timeLeft.text}`}
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Primer
