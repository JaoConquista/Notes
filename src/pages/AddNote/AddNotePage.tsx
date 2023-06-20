import React from "react";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import { Form, Main, Image, Footer, Search, Title, Tags } from "./addNote";
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
import { autoResize, postNote } from "../../services/NoteService"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNotePage = () => {

  const navigate = useNavigate()

  const colorsList = ["#ebf781", "#a5f5a5", "#f19c9c", "#bab6f3", "#dfb1ec",
    "#a5f5a5", "#9ceef1", "#dfb1ec", "#ebf781", "#a5f5a5",
    "#f19c9c", "#dfb1ec"]

  const tags = ["Work", "Dreams", "Food", "Study", "Travel"]

  const [note, setNote] = useState<INoteContent>({
    id: 0,
    title: "",
    content: "",
    color: "",
    image: "",
    tag: ""
  });

  const [image, setImage] = useState("")
  const [tag, setTag] = React.useState("");
  const { colors } = useContext(ThemeContext)

  console.log(image)

  useEffect(() => {
    setImage(note.image)
    setTag(note.tag);
  }, [note]);

  useEffect(() => {
    autoResize('edit-title')
    autoResize('edit-content')
  }, [note])

  const colorNote = () => {
    let randomColor = colorsList[Math.floor(Math.random() * (colorsList.length))]

    setNote({ ...note, color: randomColor });

  }

  const createNote = async (note: INoteContent) => {

    try {
      console.log(note)

      colorNote()

      console.log(note)

      await postNote(note);

      setNote({ id: note.id, title: " ", content: " ", color: "", image: "", tag: "" });

      navigate('/notes')

    } catch (error) {

      return error;

    }
  }


  const handleSubmit = async () => {

    await createNote(note)

  }
  return (
    <Main>
      <Search>
        <Title>
          <h1>Notes</h1>
        </Title>
        <Button
          onClick={(e) => handleSubmit()}
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
                  value={tag}
                  onChange={(e) => setNote({ ...note, tag: e.target.value })}
                >
                  {tags.length >= 0 &&(
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
              autoComplete="off"
              id="title"
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
            onInput={() => autoResize('content')}
            placeholder="Conteúdo ..."
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />

          <textarea
            autoComplete="off"
            id="input-image"
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
