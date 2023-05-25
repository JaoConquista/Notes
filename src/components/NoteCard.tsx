import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import styleCard from "./NoteCard.module.css"

import { INoteContent } from "../Interfaces/INote";


type NoteCard = {
  note: INoteContent;
  getNoteId(id: number): void;
  handleDelete(id: number): void
};

const NoteCard = ({ note, getNoteId, handleDelete }: NoteCard) => {
  return (
    <Card sx={{width: "18em", m: 1}} className={styleCard["card"]}>
      <CardContent className={styleCard["card-content"]}>
        <Typography  sx={{ fontSize: 14}} color="text.secondary" gutterBottom>
          Tarefa
        </Typography>
        <Typography variant="h5" sx={{overflowWrap: 'break-word'}}>
          {note.title}
        </Typography>
        <Typography variant="body2" sx={{overflowWrap: 'break-word'}}>
          {note.content}
        </Typography>
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "space-between", width: "100%"}}>
        <IconButton onClick={() => getNoteId(note.id)}>
          <EditIcon color="primary"/>
        </IconButton>
        <IconButton onClick={() => handleDelete(note.id)} >
          <DeleteIcon color="warning"/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
