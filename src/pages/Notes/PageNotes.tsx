import React, { useContext } from "react"
import { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard";
import { INoteContent } from "../../Interfaces/INote";
import Modal from "../Modal/Modal";
import {
  deleteNote,
  getNote,
  editNote,
} from "../../services/NoteService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Switch from 'react-switch'

//Styles
import { App, Content, Result, Search, Title, Footer, NavBar, TagsContent } from "./styles"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import ModeIcon from '@mui/icons-material/Mode';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext } from "styled-components";
import { ToastContainer } from "react-toastify";


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { Account } from "../../Interfaces/Account";

interface Props {
  toggleTheme(): void;
  tags: string[];
  user: Account;
}

const PageNotes = ({ toggleTheme, tags, user }: Props) => {
  //Qual a melhor forma de inserir valores em um state de objetos ?
  const { logout } = useAuth()

  const navigate = useNavigate()

  const { colors, title } = useContext(ThemeContext);

  const [noteList, setNoteList] = useState<INoteContent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [tagSelected, setTagSelected] = useState("All");

  const [isSelected, setIsSelected] = useState(false);
  const [perfilImage, setPerfilImage] = useState("")

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
    tagSelected !== "All" ? (
      noteList.filter(
        (note) => note.tag == (tagSelected)
      )
    ) : [];

  useEffect(() => {
    fecthData();
    setPerfilImage(user?.image)
  }, []);




  const notesToShow = searchInput.length > 0 ? filteredNotes : noteList;
  const tagsToShow = tagSelected.length > 0 ? filteredTags : noteList;

  const removeNote = async (id: number) => {
    await deleteNote(id);

    console.log(`Card ${id} foi deletado`);

    await fecthData();
  };


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
    console.time("Promise")

    const result: any = await Promise.all([
      editNote(note),
      fecthData()
    ])

    result[0];
    result[1];

    //Com essa estrutura a velocidade de execução do código aumentou.

    console.timeEnd("Promise")
  };

  const handleModalSubmit = async (note: INoteContent) => {
    updateNote(note);
    setShowModal(false);
    clearNoteToEdit();

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
              id="search-input"
              type="text"
              autoComplete="off"
              placeholder="Search your notes"
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <Box sx={{ flexGrow: 0, margin: "10px" }}>
              <Tooltip title="Open settings">
                <IconButton>
                  <GridViewOutlinedIcon fontSize="medium" sx={{ color: `#ccc` }} />
                </IconButton>
              </Tooltip>
            </Box>


            <hr />

            <Button
              sx={{ borderRadius: "100px" }}
              onClick={() => navigate("/notes/edit-profile")}>
              <Avatar
                alt="João"
                src={`${user?.image}`}
                sx={{ margin: "10px" }} />
            </Button>
          </Search>

          <Content>
            
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

          </Content>

          <TagsContent>
            <div className="tag" key={"All"}>
              <button
                id={tagSelected === "All" ? 'tag-btn-selected' : 'tag-btn'}
                onClick={() => handleTagClick('All')}
              >
                All({noteList.length})
              </button>
            </div>
            {tags?.length !== 0 && (
              tags?.map((tag) => (
                <div className="tag" key={tag}>
                  <button id={tagSelected === tag ? 'tag-btn-selected' : 'tag-btn'} onClick={() => handleTagClick(tag)}>

                    {tag}

                  </button>
                </div>
              ))
            )}
          </TagsContent>
        </>
      )}

      {showModal && noteToEdit && (
        <Modal
          onClose={() => clearNoteToEdit()}
          onDelete={handleDelete}
          note={noteToEdit}
          submit={handleModalSubmit}
          tags={tags}
        />
      )}
      <Result>
        {tagSelected !== "All" && !showModal ? (
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

              <>
                <NoteCard
                  key={index}
                  note={note}
                  color={note.color}
                  onEdit={handleEdit}
                />
              </>

            )))
        )}
      </Result>

      {!showModal && (
        <Footer>
          <div id="icons-part1">
            <CheckBoxOutlinedIcon fontSize="small" sx={{ color: '#e9ecef' }} />
            <CollectionsOutlinedIcon fontSize="small" sx={{ color: '#e9ecef' }} />
          </div>


          <NavBar>
            <Button
              onClick={() => navigate("/notes/addNote")}
              sx={{
                background: '#3A3A3A',
                border: `3px solid ${colors.background}`, borderRadius: "100px", height: "58px", width: "38px",
                display: "flex", justifyContent: "center", position: "relative",
                zIndex: "1", '&:hover': {
                  background: colors.inputBackground,
                }
              }}>
              <AddIcon fontSize="small" sx={{ color: "#ccc" }} />
            </Button>
          </NavBar>

          <div id="icons-part2">
            <MicNoneRoundedIcon fontSize="small" sx={{ color: '#e9ecef' }} />
            <ModeIcon fontSize="small" sx={{ color: '#e9ecef' }} />
          </div>
        </Footer>
      )}
    </App>
  );
};

export default PageNotes;
