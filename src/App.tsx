import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./components/ui/card"

export function App() {
    const handleClick = () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

        if (isMobile) {
            window.location.href = "fb-messenger://user/25838309992478988"
        } else {
            window.location.href =
                "https://www.messenger.com/e2ee/t/25838309992478988"
        }
    }

    return (
        <div className="box-border flex h-dvh items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>BSIT 2B Class Elections</CardTitle>
                    <CardDescription>
                        Check your Messenger inbox for a private message from
                        Lester Matthew Sollano for your voting link
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" onClick={handleClick}>
                        Open Messenger
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default App
