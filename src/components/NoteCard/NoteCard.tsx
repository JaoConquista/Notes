import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { INoteContent } from "../../Interfaces/INote";
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
            <Typography variant="h5">{note.title}</Typography>
            <Typography variant="body2">{note.content}</Typography>
          </CardContent>
        </Card>
      </CardStyled>
    </div>


  );
};

export default NoteCard;
