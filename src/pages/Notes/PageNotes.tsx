import React, { useContext } from "react"
import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import { INoteContent } from "../../Interfaces/INote";
import Modal from "../Modal/Modal";
import {
  deleteNote,
  getNote,
  postNote,
  editNote,
} from "../../services/NoteService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Switch from 'react-switch'

//Styles
import TextField from "@mui/material/TextField";
import { App, Content, Result, Search, Header, Title, Footer, NavBar } from "./styles"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ModeIcon from '@mui/icons-material/Mode';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import Stack from '@mui/material/Stack';
import { ThemeContext } from "styled-components";
import AddButton from "../../components/AddButton";
import { titleRequired } from "../../utils/toast";
import { ToastContainer } from "react-toastify";

interface Props {
  toggleTheme(): void;
}

const PageNotes = ({ toggleTheme }: Props) => {
  //Qual a melhor forma de inserir valores em um state de objetos ?
  const { logout } = useAuth()

  const navigate = useNavigate()

  const colorsList = ["#ebf781", "#a5f5a5", "#f19c9c", "#bab6f3", "#dfb1ec",
    "#a5f5a5", "#9ceef1", "#dfb1ec", "#ebf781", "#a5f5a5",
    "#f19c9c", "#dfb1ec"]

  const { colors, title } = useContext(ThemeContext);

  const [note, setNote] = useState<INoteContent>({
    id: 0,
    title: " ",
    content: " ",
    color: " "
  });
  const [noteList, setNoteList] = useState<INoteContent[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);

  //filtro de notas
  const filteredNotes =
    searchInput.length > 0
      ? noteList.filter(
        (note) =>
          note.title.includes(searchInput) ||
          note.content.includes(searchInput)
      )
      : [];

  useEffect(() => {
    fecthData();
  }, []);


  const notesToShow = searchInput.length > 0 ? filteredNotes : noteList;

  const removeNote = async (id: number) => {
    await deleteNote(id);

    console.log(`Card ${id} foi deletado`);

    await fecthData();
  };

  const createNote = async (note: INoteContent) => {
    try {

      await postNote(note);

      await fecthData();

    } catch (error) {
      return error;
    }
  };

  const colorNote = () => {
    let randomColor = colorsList[Math.floor(Math.random() * (colorsList.length))]

    setNote(prevNote => ({
      ...prevNote,
      color: randomColor
    }));
  }

  const fecthData = async () => {
    const data = await getNote();

    setNoteList(data);
  };

  const handleEdit = (note: INoteContent) => {
    setNoteToEdit(note);

    setShowModal(true);
  };

  const handleDelete = (id: number) => removeNote(id);

  const updateNote = async (note: INoteContent) => {
    await editNote(note);

    await fecthData()
  };

  const handleModalSubmit = async (note: INoteContent) => {
    updateNote(note);
    setShowModal(false);
    clearNoteToEdit();

    await fecthData();
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {

    if (e) {
      e.preventDefault();

      setTimeout(() => colorNote(), 500)

      console.log(note)

      await createNote(note);

      await fecthData();

      setNote({ id: note.id, title: " ", content: " ", color: " " });
    } else {
      if (note.title == " ") {
        titleRequired()
      } else {
        setTimeout(() => colorNote(), 500)

        console.log(note)

        await createNote(note);

        await fecthData();
      }

      setNote({ id: note.id, title: " ", content: " ", color: " " });
    }

  };

  const clearNoteToEdit = () => {
    setShowModal(false);
  };

  const logOut = () => {
    logout()

    navigate("/login")
  }
  return (
    <App>
      <ToastContainer/>
      <Content>
        <Header>
          <Title>
            <h1>Notes</h1>
          </Title>
          <Stack direction="row" spacing={2}
            sx={{ width: "5%", display: "flex", justifyContent: "flex-end", alignItems: "center", paddingRigth: "30px" }}>
            <Button onClick={() => logOut()}>Sair</Button>
            <Switch
              onChange={() => toggleTheme()}
              checked={title === 'dark'}
              checkedIcon={false}
              uncheckedIcon={false}
              height={10}
              width={40}
              handleDiameter={15}
            />
          </Stack>
        </Header>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-controlled"
              sx={{ margin: "10px", background: `${colors.inputBackground}`, borderRadius: "10px" }}
              autoComplete="off"
              required
              label="Título"
              InputLabelProps={{
                sx: { color: `${colors.text}` }
              }}
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <TextField
              id="outlined-controlled"
              sx={{ margin: "10px", background: `${colors.inputBackground}`, borderRadius: "10px" }}
              autoComplete="off"
              required
              label="Conteúdo"
              InputLabelProps={{
                sx: { color: `${colors.text}` }
              }}
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
            <AddButton />
          </form>
        </div>
      </Content>

      {noteList.length > 0 && (
        <Search>
          <TextField
            id="outlined-controlled"
            sx={{
              margin: "10px", maxWidth: "30em", minWidth: "20em",
              boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.40), 0px 16px 10px -10px rgba(0, 0, 0, 0.28), 0px 0px 30px -5px rgba(0, 0, 0, 0.28)",
              borderRadius: "10px", border: "none", background: `${colors.inputBackground}`
            }}
            label="Buscar"
            autoComplete="off"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Search>
      )}
      <div>
        {showModal && noteToEdit && (
          <Modal
            onClose={() => clearNoteToEdit()}
            note={noteToEdit}
            submit={handleModalSubmit}
          />
        )}
        <Result>
          {!showModal &&
            notesToShow.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                color={note.color}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
        </Result>
      </div>
      <Footer>
        <CheckBoxIcon fontSize="small" sx={{color: '#e9ecef'}}/>
        <CollectionsOutlinedIcon fontSize="small" sx={{color: '#e9ecef'}}/>

        <NavBar>
          <Button
            onClick={() => handleSubmit()}
            sx={{
              background: '#3A3A3A',
              border: `3px solid ${colors.background}`, borderRadius: "100px", height: "58px", width: "58px",
              display: "flex", justifyContent: "center", position: "relative",
              zIndex: "1", '&:hover': {
                background: colors.inputBackground,
              }
            }}>
            <AddIcon fontSize="medium" sx={{ color: "#ccc" }} />
          </Button>
        </NavBar>

        <MicNoneRoundedIcon fontSize="small" sx={{color: '#e9ecef'}}/>
        <ModeIcon fontSize="small" sx={{color: '#e9ecef'}}/>
      </Footer>
    </App>
  );
};

export default PageNotes;
