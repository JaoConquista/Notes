import axios from "axios";
import { Account } from "../Interfaces/Account";


const urlAccount = "http://localhost:3000/users"

export function createAccount(account: Account): Promise<Account> {

    return (
        axios.post(urlAccount, {
            name: account.name,
            email: account.email,
            password: account.password,
            image: account.image
        })
    )
}

export async function getAccount(): Promise<Account[]> {
    try {
        const repsonse = await axios.get<Account[]>(urlAccount)
        const usersData = repsonse.data
        return usersData

    } catch (error) {
        console.error(error)
        return []
    }

} 

export function editProfile(account: Account | null) {
    const editProfile = `${urlAccount}/${account?.id}`

    return axios.put(editProfile, account)
}