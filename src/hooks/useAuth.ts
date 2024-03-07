import { useState, useEffect } from 'react'


export function useAuth() {
    const [isAuth, setIsAuth] = useState<boolean | null>(false)

    useEffect(() => {

        if (localStorage.getItem("auth") === "true") {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [isAuth])

    const auth = () => {
        localStorage.setItem("auth", "true")
    }
    const logout = () => {
        localStorage.setItem("auth", "false")
    }

    return { isAuth, auth, logout }
}