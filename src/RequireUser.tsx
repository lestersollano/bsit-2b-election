import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router"
import { API_BASE, type User } from "./lib/types"
import { isVotingClosed } from "./lib/utils"

export function RequireUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (!id) {
            navigate("/primer", { replace: true })
            return
        }

        if (isVotingClosed()) {
            navigate("/results", { replace: true })
            return
        }

        let cancelled = false

        fetch(`${API_BASE}/users`)
            .then((res) => res.json())
            .then((users: User[]) => {
                if (cancelled) return
                if (isVotingClosed()) {
                    navigate("/results", { replace: true })
                    return
                }
                const exists = users.some((user) => user.id === id)
                if (!exists) {
                    navigate("/primer", { replace: true })
                    return
                }
                setAllowed(true)
            })
            .catch(() => {
                if (!cancelled) navigate("/primer", { replace: true })
            })

        return () => {
            cancelled = true
        }
    }, [id, navigate])

    if (!allowed) return null

    return <Outlet />
}

export default RequireUser
