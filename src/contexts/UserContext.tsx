import { ReactNode, createContext, useState } from "react"

type UserContextProps = {
    children: ReactNode
}

type UserContextType = {
    accessUser: boolean;
    setAccessUser: (newState: boolean) => void
}

const initialValue = {
    accessUser: false,
    setAccessUser: () => {}
}

export const UserContext = createContext<UserContextType>( initialValue );



//Provider

export const UserContextProvider = ({ children }: UserContextProps) => {
    
    const [accessUser, setAccessUser] = useState(initialValue.accessUser)

    return (
        <UserContext.Provider value={{ accessUser, setAccessUser }}>
            {children}
        </UserContext.Provider>
    )
}