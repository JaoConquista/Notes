import axios from "axios";
import { Account } from "../Interfaces/Account";


const urlAccount = "  http://localhost:3000/users"

export function createAccount(account: Account): Promise<Account> {

    return (
            axios.post(urlAccount, {
            name: account.name,
            email: account.email,
            password: account.password,
        })
    )
}