import React from "react";
import IconButton from "@mui/material/IconButton";
import styled, { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Main, Image, Footer, Search, Title, Tags } from "./stylesModal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



import { useContext, useEffect, useState } from "react";
import { INoteContent } from "../../Interfaces/INote";

type Props = {
  note: INoteContent;
  onDelete: (id: number) => void;
  onClose: () => void;
  submit: (note: INoteContent) => void;
};

const Modal = ({ note, onClose, onDelete, submit }: Props) => {
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);
  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    if (note) {
      setNoteToEdit(note);
    }
  }, [note]);
  useEffect(() => {
    autoResize('edit-title')
    autoResize('edit-content')
  }, [noteToEdit])

  const handleSubmitClick = () => {
    if (noteToEdit === null) return;

    submit(noteToEdit);
  };

  const autoResize = (tagId: string) => {
    const textarea: HTMLElement | null = document.getElementById(`${tagId}`);
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
                <InputLabel sx={{ color: `${colors.text}` }}>Tag</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  sx={{ color: `${colors.text}` }}
                  // value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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

          <Image>
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"/>
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
