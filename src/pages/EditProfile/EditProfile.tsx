import React, { useContext, useEffect, useState } from 'react'
import { Main, Footer, Search } from './editStyle'
import ClearIcon from '@mui/icons-material/Clear';
import { Avatar, Button, IconButton, TextField, colors } from '@mui/material'
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Account } from '../../Interfaces/Account'
import { ThemeContext } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { editProfile, getAccount } from '../../services/AccountServices';


interface EditProps {
    user: Account;
    userAuth: (user: Account) => void;
}

function EditProfile({ user, userAuth}: EditProps) {

    const navigate = useNavigate()

    const { colors } = useContext(ThemeContext)
    const [profile, setProfile] = useState<Account | null>(null)

    useEffect(() => {
        setProfile(user)
    }, [])

    const editAccount = async (data: Account | null) => {
    
        try {
            editProfile(data)
            
            userAuth(data)

            navigate("/notes")

        } catch (error) {
            return error
        }
    }



    return (
        <Main>
            <Search>
                <Button
                onClick={() => editAccount(profile)}
                    sx={{
                        background: '#3A3A3A',
                        borderRadius: "100px", height: "50px", width: "58px",
                        display: "flex", justifyContent: "center", position: "relative",
                        zIndex: "1", '&:hover': {
                            background: colors.inputBackground,
                        }
                    }}>
                    <CheckIcon fontSize="medium" sx={{ color: "#ccc" }} />
                </Button>

                <Button
                    sx={{
                        background: '#3A3A3A',
                        borderRadius: "100px", height: "50px", width: "38px",
                        display: "flex", justifyContent: "center", position: "relative",
                        zIndex: "1", '&:hover': {
                            background: colors.inputBackground,
                        }
                    }}>
                    <MoreVertIcon fontSize="small" sx={{ color: "#ccc" }} />
                </Button>

            </Search>
            <div id="content-1">
                <div id="profile-img">

                    <Avatar
                        src={`${profile?.image}`}
                        sx={{width: "300px", height: "300px"}} 
                    />

                    <h3>{profile?.name}</h3>

                    <h4>Você tem 12 notas</h4>
                </div>
                <div id="inputs">
                        <TextField
                            id="filled-basic"
                            label="Nome"
                            value={profile?.name}
                            variant="filled"
                            onChange={(e) =>
                                setProfile((prevProfile: any) => ({
                                    ...prevProfile,
                                    name: e.target.value
                                }))} />

                        <TextField
                            id="filled-basic"
                            label="Email"
                            type='email'
                            value={profile?.email}
                            variant="filled"
                            onChange={(e) =>
                                setProfile((prevProfile: any) => ({
                                    ...prevProfile,
                                    email: e.target.value
                                }))} />

                        <TextField
                            id="filled-basic"
                            label="Link da Foto"
                            value={profile?.image}
                            variant="filled"
                            onChange={(e) =>
                                setProfile((prevProfile: any) => ({
                                    ...prevProfile,
                                    image: e.target.value
                                }))} />

                        <TextField
                            id="filled-basic"
                            label="Senha"
                            value={profile?.password}
                            variant="filled"
                            onChange={(e) =>
                                setProfile((prevProfile: any) => ({
                                    ...prevProfile,
                                    password: e.target.value
                                }))} />
                </div>
            </div>
            <div id="footer-position">
                <Footer>
                    <IconButton onClick={() => navigate("/notes")}
                        sx={{
                            background: '#3A3A3A',
                            borderRadius: "100px", height: "50px", width: "58px",
                            display: "flex", justifyContent: "center", position: "relative",
                            zIndex: "1", '&:hover': {
                                background: colors.inputBackground,
                            }
                        }}>
                        <ClearIcon sx={{ color: `#ccc` }} />
                    </IconButton>
                </Footer>
            </div>
        </Main>
    )
}

export default EditProfile