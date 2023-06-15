import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import { Form, Main } from "./stylesModal";

import { useContext, useEffect, useState } from "react";
import { INoteContent } from "../../Interfaces/INote";

type Props = {
  note: INoteContent;
  onClose: () => void;
  submit: (note: INoteContent) => void;
};

const Modal = ({ note, onClose, submit }: Props) => {
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);
  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    if (note) {
      setNoteToEdit(note);
    }
  }, [note]);

  const handleSubmitClick = () => {
    if (noteToEdit === null) return;

    submit(noteToEdit);
  };

  return (
    <Main>
      <div className="title">
        <h1>Editando ...</h1>
        <IconButton onClick={() => onClose()}>
          <Fab size="small" color="error">
            <ClearIcon />
          </Fab>
        </IconButton>

      </div>
      <div className="content">
        <Form>
          <TextField
            value={noteToEdit?.title}
            autoComplete="off"
            id="outlined-controlled"
            sx={{ margin: "10px", background: `${colors.inputBackground}`, borderRadius: "10px" }}
            InputLabelProps={{
              sx: { color: `${colors.text}` }
            }}
            inputProps={{
              style: {
                color: `${colors.text}`,
              },
            }}
            onChange={(e) =>
              setNoteToEdit((prevNote: any) => ({
                ...prevNote,
                title: e.target.value,
              }))
            }
          />
          <TextField
            value={noteToEdit?.content}
            autoComplete="off"
            id="outlined-controlled"
            sx={{ margin: "10px", background: `${colors.inputBackground}`, borderRadius: "10px" }}
            InputLabelProps={{
              sx: { color: `${colors.text}` }
            }}
            inputProps={{
              style: {
                color: `${colors.text}`,
              },
            }}
            onChange={(e) =>
              setNoteToEdit((prevNote: any) => ({
                ...prevNote,
                content: e.target.value,
              }))
            }
          />
          <div className="buttons">
            <IconButton onClick={() => handleSubmitClick()}>
              <Fab size="small" color="success">
                <CheckIcon />
              </Fab>
            </IconButton>
          </div>
        </Form>
      </div>
    </Main>
  );
};

export default Modal;
