import axios from "axios";
import { IUser } from "../Interfaces/Account";


const urlAccount = "https://localhost:7072/api/User"

export function createAccount(account: IUser): Promise<IUser> {

    return (
        axios.post(urlAccount, {
            name: account.name,
            email: account.email,
            password: account.password,
            image: account.image,
        })
    )
}

export async function getAccount(): Promise<IUser[]> {
    //todo: make promise return IUser
    try {
        const repsonse = await axios.get<IUser[]>(urlAccount)
        const usersData = repsonse.data
        return usersData

    } catch (error) {
        console.error(error)
        throw error
    }

}

export async function getUser(userId: number): Promise<IUser> {
    const userEndPoint = `${urlAccount}/${userId}`
    try {
        const response = await axios.get<IUser>(userEndPoint)
        const userData = response.data
        return userData;
    } catch (error) {
        console.error(error)
        throw error
    }
}

export function editProfile(account: IUser | null) {
    const editProfile = `${urlAccount}/${account?.id}`

    return axios.put(editProfile, account)
}