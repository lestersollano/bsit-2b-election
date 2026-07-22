import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "./components/ui/card"
import { API_BASE, type User } from "./lib/types"
import { isVotingClosed } from "./lib/utils"

export function Validate() {
    const [uuid, setUuid] = useState("")
    const [error, setError] = useState("")
    const [checking, setChecking] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isVotingClosed()) {
            navigate("/results", { replace: true })
            return
        }

        const id = uuid.trim()
        if (!id) {
            setError("Enter your UUID to continue")
            return
        }

        setChecking(true)
        setError("")
        try {
            const res = await fetch(`${API_BASE}/users`)
            const users: User[] = await res.json()
            const exists = users.some((user) => user.id === id)
            if (!exists) {
                setError("That UUID was not found")
                return
            }
            if (isVotingClosed()) {
                navigate("/results", { replace: true })
                return
            }
            navigate(`/voter/${id}`)
        } catch {
            setError("Could not verify your UUID. Try again.")
        } finally {
            setChecking(false)
        }
    }

    return (
        <div className="box-border flex h-dvh items-center justify-center p-6">
            <Card className="w-full max-w-sm">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-(--card-spacing)"
                >
                    <CardHeader>
                        <CardTitle>Identity Check</CardTitle>
                        <CardDescription>
                            Enter the UUID from your Messenger message to open
                            your ballot
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                            autoComplete="off"
                            spellCheck={false}
                            className="h-10 w-full border border-input bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                        />
                        {error && (
                            <CardDescription className="text-destructive">
                                {error}
                            </CardDescription>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={checking}
                        >
                            {checking ? "Checking..." : "Continue"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Validate
