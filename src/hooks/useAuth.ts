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


/*
Detalhamento técnico

Alterar o valor do estado para true ou false, porque eu preciso saber se o usuário esta autenticado
Expor o estado no hook
Usar o método auth no componente Login
Usar o Método logout no componente PageNotes
Chamar hook de autenticação no componente App
--
Ao realizar o login o componente App não renderiza, assim, o redirecionamento para notes não funciona

2 horas e 40 minutos para solucionar esse probleminha. Melhora isso !
*/