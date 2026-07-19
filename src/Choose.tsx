import { useEffect, useState } from "react"
import {
    Card,
    CardFooter,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from "./components/ui/card"
import { Separator } from "./components/ui/separator"
import NameCard from "./components/voter/NameCard"
import { useNavigate, useParams } from "react-router"
import { API_BASE, type User } from "./lib/types"
import { Button } from "./components/ui/button"

export function Choose() {
    const [users, setUsers] = useState<User[]>([])
    const { id, position } = useParams()
    const navigate = useNavigate()

    let description = ""

    switch (position) {
        case "President":
            description =
                "Leads the class by organizing activities, representing the students, making decisions with the class officers, and ensuring that class goals and responsibilities are carried out effectively. An ideal President should be responsible, trustworthy, confident, and capable of leading and making fair decisions."
            break
        case "Vice President":
            description =
                "Supports the President in managing class affairs, helps coordinate activities, and assumes the President's duties whenever the President is absent or unable to serve. An ideal Vice President should be dependable, cooperative, adaptable, and able to work well with both officers and classmates."
            break
        case "Secretary":
            description =
                "Records meeting minutes, maintains official documents, and manages class records and correspondence. An ideal Secretary should be organized, attentive to detail, and an effective communicator."
            break
        case "Treasurer":
            description =
                "Oversees the collection, safekeeping, and disbursement of class funds, maintains accurate financial records, and provides transparent financial reports to the class. An ideal Treasurer should be honest, organized, detail-oriented, and financially responsible."
            break
        case "Auditor":
            description =
                "Examines and verifies the Treasurer's financial records, monitors the proper use of class funds, and helps ensure accountability and financial transparency. An ideal Auditor should be honest, impartial, observant, and committed to fairness and accuracy."
            break
        case "Public Information Officer (PIO)":
            description =
                "Manages the dissemination of announcements, updates, and event information through official communication channels, while promoting class activities and keeping all members informed. An ideal PIO should be an effective communicator, creative, approachable, and active in keeping the class engaged and informed."
            break
        default:
            navigate(`/voter/${id}`)
    }

    const handleBack = () => {
        navigate(`/voter/${id}`)
    }

    useEffect(() => {
        fetch(`${API_BASE}/users`)
            .then((res) => res.json())
            .then(setUsers)
    }, [])

    return (
        <div className="box-border flex h-dvh justify-center p-6">
            <Card className="w-full max-w-xl justify-between">
                <CardHeader>
                    <CardTitle>Select a {position}</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-1 flex-col gap-3 overflow-auto">
                    {users.map(
                        (user) =>
                            user.is_eligible && (
                                <NameCard
                                    key={user.id}
                                    name={user.name}
                                    candidateId={user.id}
                                />
                            )
                    )}
                </CardContent>
                <Separator />
                <CardFooter className="flex flex-col gap-3">
                    <CardTitle className="text-center">{position}</CardTitle>
                    <CardDescription className="text-center">
                        {description}
                    </CardDescription>
                    <Button className="w-full" onClick={handleBack}>
                        Go Back
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Choose
