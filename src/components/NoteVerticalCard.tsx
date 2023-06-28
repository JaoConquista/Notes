import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { INoteContent } from "../Interfaces/INote";
import { CardStyled, Image } from "./NotesVertical.style";


type NoteVerticalCard = {
    note: INoteContent;
    color: string;
    onEdit: (note: INoteContent) => void;
};

const NoteVerticalCard = ({ note, color, onEdit }: NoteVerticalCard) => {

    return (
        <div>
            <CardStyled>
                <Card
                    onClick={() => onEdit(note)}
                    sx={{
                        maxWidth: "30em", display: "flex", justifyContent: "space-between",
                        boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.40), 0px 16px 10px -10px rgba(0, 0, 0, 0.28), 0px 0px 30px -5px rgba(0, 0, 0, 0.28);",
                        borderRadius: "30px", backgroundColor: `${color}`
                    }}>


                    <CardContent
                        sx={{ paddingLeft: "15px" }}>
                        <Typography variant="h5">{note.title}</Typography>
                        <Typography variant="body2">{note.content}</Typography>
                    </CardContent>
                    {note.image !== "" && (
                        <Image><img src={`${note.image}`} /></Image>
                    )}
                </Card>
            </CardStyled>

        </div>


    );
};

export default NoteVerticalCard;
