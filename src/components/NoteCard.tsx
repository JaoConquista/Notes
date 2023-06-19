import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { INoteContent } from "../Interfaces/INote";
import { CardStyled, Image } from "./NotesCard.style";


type NoteCard = {
  note: INoteContent;
  color: string;
  onEdit: (note: INoteContent) => void;
};

const NoteCard = ({ note, color, onEdit }: NoteCard) => {

  return (
    <div>
      <CardStyled>
        <Card
          onClick={() => onEdit(note)}
          sx={{
            width: "14em", display: "flex",
            flexDirection: "column", justifyContent: "space-between",
            boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.40), 0px 16px 10px -10px rgba(0, 0, 0, 0.28), 0px 0px 30px -5px rgba(0, 0, 0, 0.28);",
            borderRadius: "30px", backgroundColor: `${color}`
          }}>
            {note.image !== "" && (
              <Image><img src={`${note.image}`} /></Image>
            )}
          
          <CardContent
            sx={{ paddingLeft: "15px" }}>
            {/* <Typography sx={{ fontSize: 14, padding: "0 5px 0 10px" }} color="text.secondary" gutterBottom>
                Tarefa
              </Typography> */}
            <Typography variant="h5">{note.title}</Typography>
            <Typography variant="body2">{note.content}</Typography>
          </CardContent>
        </Card>
      </CardStyled>

    </div>


  );
};

export default NoteCard;
