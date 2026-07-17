import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./components/ui/card"

export function Primer() {
    const handleClick = () => {
        window.location.href = "fb-messenger://user/25838309992478988"
    }

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between overflow-auto">
                <CardHeader>
                    <CardTitle>BSIT 2B Class Elections</CardTitle>
                    <CardDescription>
                        Welcome to the official 2026 BSIT 2B Class Election
                        portal!
                    </CardDescription>
                    <hr />
                    <CardDescription className="text-center">
                        <br />
                        This election will conduct a{" "}
                        <strong>Direct Democracy</strong>. This means all
                        members of the particular democratic group are
                        candidates.
                        <br />
                        <br />
                        You can vote anyone in our section including yourself
                        but only for one position each.
                        <br />
                        <br />
                        You can vote anyone in our section including yourself
                        but only for one position each.
                        <br />
                        <br />
                        Some members are <strong>disqualified</strong> from
                        candidacy due to reasons mentioned below:
                        <br />
                        <br />
                        <strong>Lester Matthew Sollano</strong> - SSC officer
                        <br />
                        <br />
                        <strong>Ivan Migs Bergania</strong> - irregular schedule
                        <br />
                        <br />
                        <strong>Shim Steven Manaloto</strong> - irregular
                        schedule
                        <br />
                        <br />
                        Your votes will be publicly accessible and can be viewed
                        by anyone. This ensures transparency is observed and no
                        vote is forged.
                        <br />
                        <br />
                        Regardless if you vote or not, all existing votes on
                        July 21, 2026 12:00 AM will be the basis for the winners
                        of each position.
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        variant={"secondary"}
                        className="w-full"
                        onClick={handleClick}
                    >
                        PROCEED
                    </Button>
                    <CardDescription className="text-center">
                        You can only proceed after July 20, 2026 12:00 AM
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Primer
