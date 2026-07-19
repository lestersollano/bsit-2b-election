import { useEffect, useState } from "react"
import { Outlet, useNavigate, useParams } from "react-router"
import { API_BASE, type User } from "./lib/types"

export function RequireUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [allowed, setAllowed] = useState(false)

    useEffect(() => {
        if (!id) {
            navigate("/primer", { replace: true })
            return
        }

        let cancelled = false

        fetch(`${API_BASE}/users`)
            .then((res) => res.json())
            .then((users: User[]) => {
                if (cancelled) return
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
