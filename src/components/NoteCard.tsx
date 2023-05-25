import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styleCard from "./NoteCard.module.css";

import { INoteContent } from "../Interfaces/INote";

type NoteCard = {
  note: INoteContent;
  onEdit: (note: INoteContent) => void;
  onDelete: (id: number) => void;
};

const NoteCard = ({ note, onEdit, onDelete }: NoteCard) => {
  return (
    <Card
      className={styleCard["card"]}
      sx={{
        width: "18em",
        m: 1,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Tarefa
        </Typography>
        <Typography variant="h5">{note.title}</Typography>
        <Typography variant="body2">{note.content}</Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <IconButton onClick={() => onEdit(note)}>
          <EditIcon color="primary" />
        </IconButton>
        <IconButton onClick={() => onDelete(note.id)}>
          <DeleteIcon color="warning" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
