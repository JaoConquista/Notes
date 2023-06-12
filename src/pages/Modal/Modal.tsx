import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { INoteContent } from "../../Interfaces/INote";

type Props = {
  note: INoteContent;
  onClose: () => void;
  submit: (note: INoteContent) => void;
};

const Modal = ({ note, onClose, submit }: Props) => {
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);

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
    <div id="modal">
      <div className="title">
        <h1>Editando ...</h1>
      </div>
      <div className="content">
        <form>
          <TextField
            value={noteToEdit?.title}
            id="outlined-controlled"
            sx={{ margin: "10px" }}
            onChange={(e) =>
              setNoteToEdit((prevNote: any) => ({
                ...prevNote,
                title: e.target.value,
              }))
            }
          />
          <TextField
            value={noteToEdit?.content}
            id="outlined-controlled"
            sx={{ margin: "10px" }}
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
        </form>
      </div>
    </div>
  );
};

export default Modal;
