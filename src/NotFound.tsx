import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./components/ui/card"
import { useNavigate } from "react-router"

export function NotFound() {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className="box-border flex h-dvh items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>404 not found</CardTitle>
                    <CardDescription>
                        Either you used a wrong link or you edited it
                    </CardDescription>
                </CardHeader>

                <CardFooter>
                    <Button className="w-full" onClick={handleClick}>
                        Go back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NotFound
