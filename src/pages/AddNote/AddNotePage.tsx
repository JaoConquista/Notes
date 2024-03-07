import React, { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Main, Image, Footer, Search, Title, Tags } from "./addNote";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';



import { useContext, useEffect, useState } from "react";
import { INoteContent } from "../../Interfaces/INote";
import { autoResize, postNote } from "../../services/NoteService"
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash';


interface Props {
  tags: string[]
}

let stackCounter: number = 0

const AddNotePage = ({ tags }: Props) => {

  const navigate = useNavigate()

  const colorsList = ["#ebf781", "#a5f5a5", "#f19c9c", "#bab6f3", "#dfb1ec",
    "#a5f5a5", "#9ceef1", "#dfb1ec", "#ebf781", "#a5f5a5",
    "#f19c9c", "#dfb1ec"]
  
  const [userId, setUserId] = useState(Number(localStorage.getItem("id")));
  
  const [note, setNote] = useState<INoteContent>({
    id: userId,
    userId: userId,
    title: "",
    content: "",
    color: "",
    image: "",
    tagId: ""
  });

  const [image, setImage] = useState("")
  const [tagId, setTagId] = React.useState<string | undefined>("");
  const { colors } = useContext(ThemeContext);
  const [notePilha, setNotePilha] = useState<INoteContent[]>([]);
  let lastNote: INoteContent;
  console.log(userId);
  useEffect(() => {
    autoResize('edit-title')
    autoResize('edit-content')

    setImage(note.image)
    setTagId(note.tagId);

    if (!notePilha.includes(note)) {
      debouncedSave(note)
    }

    console.log(stackCounter)
  }, [note]);

  const colorNote = () => {
    const randomColor = colorsList[Math.floor(Math.random() * (colorsList.length))]

    return randomColor

  }

  const createNote = async (note: INoteContent) => {
    const randomColor = colorNote();
    const noteWithColor = { ...note, color: randomColor };

    try {

      await postNote(noteWithColor).then(() => navigate("/notes"));

      setNote({ id: note.id, userId: note.userId ,title: " ", content: " ", color: "", image: "", tagId: "" });

    } catch (error) {

      return error;

    }

  }

  const undoNote = () => {

    stackCounter++

    if (notePilha.length < 1 || stackCounter == notePilha.length) {
      stackCounter = 0
      lastNote = notePilha[0];
      setNote(lastNote);
      setNotePilha([lastNote]); // Atualiza a pilha de notas com apenas a última nota
    } else {

      lastNote = notePilha[(notePilha.length - 1) - stackCounter];
      setNote(lastNote);

    }
  }
  console.log(notePilha)
  const redoNote = () => {

    if (stackCounter > 0) {
      stackCounter--

      if (stackCounter === notePilha.length) {
        stackCounter++;
        lastNote = notePilha[notePilha.length - 1];
        setNote(lastNote);
        setNotePilha([lastNote]);
      } else {
        lastNote = notePilha[notePilha.length - (stackCounter + 1)];
        setNote(lastNote);
        console.log(stackCounter);
        console.log(notePilha);
      }
    }
  }

  const debouncedSave = useCallback(
    debounce((nextValue) => {
      setNotePilha((prevNotePilha) => [...prevNotePilha, nextValue])
    }, 500),
    [notePilha]
  )


  return (
    <Main>
      <Search>
        <Title>
          <h1>Notes</h1>
        </Title>
        <Button
          onClick={() => createNote(note)}
          type="submit"
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

        <div className="undo-redo-controls">
          <Button
            onClick={() => undoNote()}
            sx={{
              background: '#3A3A3A',
              borderRadius: "100px", height: "50px", width: "58px",
              display: "flex", justifyContent: "center", position: "relative",
              zIndex: "1", '&:hover': {
                background: colors.inputBackground,
              }
            }}>
            <UndoIcon fontSize="medium" sx={{ color: "#ccc" }} />
          </Button>
          <Button
            onClick={() => redoNote()}
            sx={{
              background: '#3A3A3A',
              borderRadius: "100px", height: "50px", width: "58px",
              display: "flex", justifyContent: "center", position: "relative",
              zIndex: "1", '&:hover': {
                background: colors.inputBackground,
              }
            }}>
            <RedoIcon fontSize="medium" sx={{ color: "#ccc" }} />
          </Button>
        </div>

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

      <div className="content">
        <Form>
          <Tags>
            <div id="select-tags">
              <BookmarkBorderOutlinedIcon />
              <FormControl variant="outlined" sx={{
                minWidth: 85,
                border: 'transparent',
                '&:focus': {
                  border: 'transparent',
                },
              }}>
                <InputLabel sx={{ color: `${colors.text2}` }}>Tag</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  sx={{
                    color: "white",
                    '.MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: "none",
                      color: `${colors.text2}`
                    },
                    '.MuiSvgIcon-root ': {
                      fill: "white !important",
                    }
                  }}
                  value={tagId}
                  onChange={(e) => setNote({ ...note, tagId: e.target.value })}
                >
                  {tags.length >= 0 && (
                    tags.map((tag, index) => (
                      <MenuItem value={tag} key={index}>{tag}</MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </div>
            <div id="items">
              <Inventory2OutlinedIcon />
              <InfoOutlinedIcon />
            </div>
          </Tags>
          <div id="title-edit-content">
            <textarea
              autoComplete="off"
              id="title"
              value={note.title}
              placeholder="Título .."
              onInput={() => autoResize('title')}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            >

            </textarea>
            <div id="more">
              <MoreVertIcon fontSize="small" />
            </div>
          </div>

          <textarea
            autoComplete="off"
            id="content"
            value={note.content}
            onInput={() => autoResize('content')}
            placeholder="Conteúdo ..."
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />

          <textarea
            autoComplete="off"
            id="input-image"
            value={note.image}
            onInput={() => autoResize('input-image')}
            placeholder="Link da sua Imagem se quiser ;)"
            onChange={(e) => setNote({ ...note, image: e.target.value })}
          />

          <Image>
            <div id="image-content">
              <img src={`${image}`} />
            </div>
          </Image>
          <div className="buttons">
          </div>
        </Form>
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

    </Main >
  );
};

export default AddNotePage;
