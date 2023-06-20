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
  autoResize
} from "../../services/NoteService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import Switch from 'react-switch'

//Styles
import TextField from "@mui/material/TextField";
import { App, Content, Result, Search, Title, Footer, NavBar, TagsContent } from "./styles"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ModeIcon from '@mui/icons-material/Mode';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext } from "styled-components";
import AddButton from "../../components/AddButton";
import { ToastContainer } from "react-toastify";


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

interface Props {
  toggleTheme(): void;
}

const PageNotes = ({ toggleTheme }: Props) => {
  //Qual a melhor forma de inserir valores em um state de objetos ?
  const { logout } = useAuth()

  const navigate = useNavigate()

  const { colors, title } = useContext(ThemeContext);

  const [tags, setTag] = useState(["Work", "Dreams", "Travel", "Food", "Study"])

  const colorsList = ["#ebf781", "#a5f5a5", "#f19c9c", "#bab6f3", "#dfb1ec",
    "#a5f5a5", "#9ceef1", "#dfb1ec", "#ebf781", "#a5f5a5",
    "#f19c9c", "#dfb1ec"]

  const [note, setNote] = useState<INoteContent>({
    id: 0,
    title: " ",
    content: " ",
    color: " ",
    image: "",
    tag: ""
  });
  const [noteList, setNoteList] = useState<INoteContent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [tagSelected, setTagSelected] = useState("");

  const [isSelected, setIsSelected] = useState(false);

  //filtro de notas
  const filteredNotes =
    searchInput.length > 0
      ? noteList.filter(
        (note) =>
          note.title.includes(searchInput) ||
          note.content.includes(searchInput)
      )
      : [];
  //filtro de tags
  const filteredTags =
    tagSelected != "" ? (
      noteList.filter(
        (note) => note.tag == (tagSelected)
      )
    ) : [];
  console.log(filteredTags)

  useEffect(() => {
    fecthData();
  }, []);


  const notesToShow = searchInput.length > 0 ? filteredNotes : noteList;
  const tagsToShow = tagSelected.length > 0 ? filteredTags : noteList;

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

    setNote({ ...note, color: randomColor });
  }


  const fecthData = async () => {
    const data = await getNote();

    setNoteList(data);
  };

  const handleEdit = (note: INoteContent) => {
    setNoteToEdit(note);

    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    removeNote(id)

    clearNoteToEdit()

  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setTimeout(() => colorNote(), 500)

    console.log(note)

    await createNote(note);

    setNote({ id: note.id, title: " ", content: " ", color: " ", image: "", tag: "" });

    await fecthData();


  };

  const clearNoteToEdit = () => {
    setShowModal(false);
  };

  const logOut = () => {
    logout()

    navigate("/login")
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClose = () => {
    setShowAddInput(false)
  }


  const handleTagClick = (tag: string) => {
    setIsSelected(true);

    setTagSelected(tag)
  }
  return (
    <App>
      <ToastContainer />
      {!showModal && (
        <>
          <Search>
            <Title>
              <h1>Notes</h1>
            </Title>
            <Box sx={{ flexGrow: 0, margin: "10px" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <MenuIcon fontSize="large" sx={{ margin: "10px", color: `#e9ecef` }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '35px', textAlign: "center" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem sx={{ margin: "10px" }} onClick={() => logOut()}>
                  <Typography textAlign="center">Sair</Typography>
                </MenuItem>

                <Switch
                  onChange={() => toggleTheme()}
                  checked={title === 'dark'}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={10}
                  width={40}
                  handleDiameter={15}
                />

              </Menu>
            </Box>

            <input
              type="text"
              placeholder="Search your notes"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Avatar
              alt="João"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
              sx={{ margin: "10px" }} />
          </Search>
          <TagsContent>
            <div className="tag">
              <button
                id={tagSelected === "" ? 'tag-btn-selected' : 'tag-btn'}
                onClick={() => handleTagClick('')}
              >
                All({noteList.length})
              </button>
            </div>
            {tags.length !== 0 && (
              tags.map((tag) => (
                <div className="tag" key={tag}>
                  <button id={tagSelected === tag ? 'tag-btn-selected' : 'tag-btn'} onClick={() => handleTagClick(tag)}>

                    {tag}

                  </button>
                </div>
              ))
            )}
          </TagsContent>
          <Content>
            <div>
              <form onSubmit={handleSubmit}>

                <TextField
                  id="outlined-controlled"
                  sx={{
                    margin: "10px", background: `${colors.background}`, borderRadius: "10px",
                    color: `${colors.text}`
                  }}
                  inputProps={{
                    style: {
                      color: `${colors.text}`,
                    },
                  }}
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
                  sx={{
                    margin: "10px", background: `${colors.background}`, borderRadius: "10px",
                    color: `${colors.text}`
                  }}
                  inputProps={{
                    style: {
                      color: `${colors.text}`,
                    },
                  }}
                  autoComplete="off"
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
        </>
      )}

      {showModal && noteToEdit && (
        <Modal
          onClose={() => clearNoteToEdit()}
          onDelete={handleDelete}
          note={noteToEdit}
          submit={handleModalSubmit}
        />
      )}
      <Result>
        {filteredTags.length > 0 ? (
          tagsToShow.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              color={note.color}
              onEdit={handleEdit}
            />
          ))
        ) : (
          !showModal && (
            notesToShow.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                color={note.color}
                onEdit={handleEdit}
              />
            ))
          )
        )}
      </Result>

      {!showModal && (
        <Footer>
          <CheckBoxIcon fontSize="small" sx={{ color: '#e9ecef' }} />
          <CollectionsOutlinedIcon fontSize="small" sx={{ color: '#e9ecef' }} />

          <NavBar>
            <Button
              onClick={() => navigate("/notes/addNote")}
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

          <MicNoneRoundedIcon fontSize="small" sx={{ color: '#e9ecef' }} />
          <ModeIcon fontSize="small" sx={{ color: '#e9ecef' }} />
        </Footer>
      )}
    </App>
  );
};

export default PageNotes;
