import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Main, Image, Footer, Search, Title, Tags } from "./stylesModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useContext, useEffect, useState, useCallback } from "react";
import { INoteContent } from "../../Interfaces/INote";
import { autoResize } from "../../services/NoteService";
import { debounce } from 'lodash';

type Props = {
  note: INoteContent;
  onDelete: (id: number) => void;
  onClose: () => void;
  submit: (note: INoteContent) => void;
  tags: string[]
};

let undoStack: number = 0
let redoStack: number = 0

const Modal = ({ note, onClose, onDelete, submit, tags }: Props) => {

  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);

  const { colors } = useContext(ThemeContext)

  const [notePilha, setNotePilha] = useState<INoteContent[]>([]);
  let lastNote: INoteContent


  useEffect(() => {
    if (note) {
      setNoteToEdit(note);
    }
  }, [note]);

  useEffect(() => {
    autoResize('edit-title')
    autoResize('edit-content')
    debouncedSave(noteToEdit)
    
  }, [noteToEdit])

  const undoNote = () => {

    undoStack++

    if (notePilha.length < 1 || undoStack == notePilha.length) {
      undoStack = 0
      lastNote = notePilha[0];
      setNoteToEdit(lastNote);
      setNotePilha([lastNote]); // Atualiza a pilha de notas com apenas a última nota
    } else {

      lastNote = notePilha[(notePilha.length - 1) - undoStack];
      setNoteToEdit(lastNote);
      
    }
  }
  
  const redoNote = () => {

    redoStack++

    if (notePilha.length <= 1 || redoStack == notePilha.length) {
      redoStack = 0
      lastNote = notePilha[notePilha.length];
      setNoteToEdit(lastNote);
      setNotePilha([lastNote]);
    } else {
      lastNote = notePilha[((notePilha.length) - (redoStack + 1))];
      setNoteToEdit(lastNote);
      console.log(undoStack)
      console.log(notePilha)
    }
  }

  const debouncedSave = useCallback(
    debounce((nextValue) => {
      setNotePilha((prevNotePilha) => [...prevNotePilha, nextValue])
    }, 500),
    [notePilha]
  )
  
console.log(notePilha)



  const handleSubmitClick = () => {
    if (noteToEdit === null) return;

    submit(noteToEdit);
  };


  return (
    <Main>
      <Search>
        <Title>
          <h1>Notes</h1>
        </Title>
        <Button
          onClick={() => handleSubmitClick()}
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
                m: 1, minWidth: 90,
                border: 'transparent', // ou border: 'transparent'
                '&:focus': {
                  border: 'transparent', // ou border: 'transparent'
                },
              }}>
                <InputLabel sx={{ color: `${colors.text2}` }}>{note?.tag}</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  sx={{
                    width: "100%",
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
                  value={noteToEdit?.tag}
                  onChange={(e) => setNoteToEdit({ ...note, tag: e.target.value })}
                >
                  {tags.length >= 0 && (
                    tags.map((tag) => (
                      <MenuItem value={tag}>{tag}</MenuItem>
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
              value={noteToEdit?.title}
              autoComplete="off"
              id="edit-title"
              onInput={() => autoResize('edit-title')}
              onChange={(e) =>
                setNoteToEdit((prevNote: any) => ({
                  ...prevNote,
                  title: e.target.value,
                }))} >

            </textarea>

            <div id="more">
              <MoreVertIcon fontSize="small" />
            </div>
          </div>

          <textarea
            value={noteToEdit?.content}
            autoComplete="off"
            id="edit-content"
            onInput={() => autoResize('edit-content')}
            onChange={(e) =>
              setNoteToEdit((prevNote: any) => ({
                ...prevNote,
                content: e.target.value,
              }))}>

          </textarea>
          <textarea
            autoComplete="off"
            id="input-image"
            onInput={() => autoResize('input-image')}
            placeholder="Altere ou Adicione uma imagem aqui :))"
            onChange={(e) => setNoteToEdit({ ...note, image: e.target.value })}
          />

          <Image>
            <div id="image-content">
              <img src={`${noteToEdit?.image}`} />
            </div>
          </Image>
          <div className="buttons">
          </div>
        </Form>
      </div>

      <div id="footer-position">
        <Footer>
          <IconButton onClick={() => onClose()}
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
          <IconButton onClick={() => onDelete(note.id)}
            sx={{
              background: '#3A3A3A',
              borderRadius: "100px", height: "50px", width: "58px",
              display: "flex", justifyContent: "center", position: "relative",
              zIndex: "1", '&:hover': {
                background: colors.inputBackground,
              }
            }}>
            <DeleteIcon sx={{ color: `#ccc}` }} />
          </IconButton>
        </Footer>
      </div>

    </Main >
  );
};

export default Modal;