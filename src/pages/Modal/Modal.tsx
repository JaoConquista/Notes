import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { ThemeContext } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
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
            onChange={(e) =>
              setNoteToEdit((prevNote: any) => ({
                ...prevNote,
                content: e.target.value,
              }))
            }
          />
          <div className="buttons">
            <IconButton>
              <CheckIcon
                color="primary"
                type="submit"
                onClick={() => handleSubmitClick()}
              />
            </IconButton>
            <IconButton onClick={() => onClose()}>
              <CancelIcon color="warning" />
            </IconButton>
          </div>
        </Form>
      </div>
    </Main>
  );
};

export default Modal;
