import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from "@mui/icons-material/Cancel";
import { INoteContent } from "../../Interfaces/INote";

type Props = {
    handleShowModal(value: boolean): void;
    handleEdit(note: INoteContent, id: number): void;
    noteId: number;
};

const Modal = ({handleShowModal, handleEdit, noteId}: Props) => {

  const [note, setNote] = useState<INoteContent>({
    id: 0,
    title: " ",
    content: " "
  })

  console.log(noteId)

  return (
    <div id="modal">
      <div className="title">
        <h1>Editando ...</h1>
      </div>
      <div className="content">
        <form>
          <TextField
            value={note.title}
            id="outlined-controlled"
            sx={{ margin: "10px" }}
            label="Título"
            onChange={(e) => setNote((prevNote: any) => ({
              ...prevNote,
              title: e.target.value
            }))
          }
          />
          <TextField
            value={note.content}
            id="outlined-controlled"
            sx={{ margin: "10px"}}
            label="Conteúdo"
            onChange={(e) => setNote((prevNote: any) => ({
              ...prevNote,
              content: e.target.value
            }))
          }
          />
          <div className="buttons">
            <IconButton>
              <CheckIcon color="primary" type="submit" onClick= {() => handleEdit(note, noteId)}/>
            </IconButton>
            <IconButton onClick={() => handleShowModal(false)}>
              <CancelIcon color="warning" />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
