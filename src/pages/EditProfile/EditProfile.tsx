import { useContext, useEffect, useState } from 'react'
import { TotalNotesContext } from '../../contexts/TotalNotesContext';
import { Main, Footer, Search } from './editStyle'
import ClearIcon from '@mui/icons-material/Clear';
import { Button, IconButton, TextField } from '@mui/material'
import CheckIcon from "@mui/icons-material/Check";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Account } from '../../Interfaces/Account'
import { ThemeContext } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { editProfile, getUser } from '../../services/AccountServices';




interface EditProps {
    userAuth: (user: Account | null) => void;
}

function EditProfile({ userAuth }: EditProps) {

    const navigate = useNavigate()

    const { colors } = useContext(ThemeContext)
    const [profile, setProfile] = useState<Account | null>(null)
    const { total } = useContext(TotalNotesContext)

    useEffect(() => {
        var stringId = localStorage.getItem("id")
        if (stringId) {
            var userId = parseInt(stringId)
            getAccount(userId)
        }
    }, [])

    async function getAccount(idUser: number) {
        const data = await getUser(idUser)

        setProfile(data)
    }

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

                    <img src={`${profile?.image}`} alt="" />

                    <h3>{profile?.name}</h3>
                    <p>Você tem  {total} notas</p>
                </div>
                <div id="inputs">
                    <TextField
                        id="filled-basic"
                        label={profile?.name ? '' : 'Nome'}
                        value={profile?.name}
                        sx={{
                            color: `${colors.text2}`,
                            '.MuiOutlinedInput-notchedOutline': {
                                border: `1px solid ${colors.text2}`,
                            }
                        }}
                        inputProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        InputLabelProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        variant="filled"
                        onChange={(e) =>
                            setProfile((prevProfile: any) => ({
                                ...prevProfile,
                                name: e.target.value
                            }))} />

                    <TextField
                        id="filled-basic"
                        label={profile?.email ? "" : "E-mail"}
                        sx={{
                            color: `${colors.text2}`,
                            '.MuiOutlinedInput-notchedOutline': {
                                border: `1px solid ${colors.text2}`,
                            }
                        }}
                        inputProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        InputLabelProps={{
                            style: { color: `${colors.text2}` }
                        }}
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
                        label={profile?.image ? "" : "Link da foto"}
                        value={profile?.image}
                        sx={{
                            color: `${colors.text2}`,
                            '.MuiOutlinedInput-notchedOutline': {
                                border: `1px solid ${colors.text2}`,
                            }
                        }}
                        inputProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        InputLabelProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        variant="filled"
                        onChange={(e) =>
                            setProfile((prevProfile: any) => ({
                                ...prevProfile,
                                image: e.target.value
                            }))} />

                    <TextField
                        id="filled-basic"
                        label={profile?.password ? "" : "Senha"}
                        sx={{
                            color: `${colors.text2}`,
                            '.MuiOutlinedInput-notchedOutline': {
                                border: `1px solid ${colors.text2}`,
                            }
                        }}
                        inputProps={{
                            style: { color: `${colors.text2}` }
                        }}
                        InputLabelProps={{
                            style: { color: `${colors.text2}` }
                        }}
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