import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react"

import { INoteContent } from "../Interfaces/INote";
import { CardStyled } from "./NotesCard.style";


type NoteCard = {
  note: INoteContent;
  onEdit: (note: INoteContent) => void;
  onDelete: (id: number) => void;
};

const NoteCard = ({ note, onEdit, onDelete }: NoteCard) => {

  return (
    <div>
        <CardStyled>
          <Card
            sx={{
              width: "17em", display: "flex",
              flexDirection: "column", justifyContent: "space-between",
              boxShadow: "2px 3px 5px rgba(0, 0, 0, 0.40), 0px 16px 10px -10px rgba(0, 0, 0, 0.28), 0px 0px 30px -5px rgba(0, 0, 0, 0.28);"
            }}>
            <CardContent
              sx={{ padding: "0 5px 0 15px" }}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Tarefa
              </Typography>
              <Typography variant="h5">{note.title}</Typography>
              <Typography variant="body2">{note.content}</Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex", justifyContent: "space-between", width: "96%",
                alignItems: "center", height: "10%"
              }}
            >
              <IconButton onClick={() => onEdit(note)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => onDelete(note.id)}>
                <DeleteIcon color="warning" />
              </IconButton>
            </CardActions>
          </Card>
        </CardStyled>

    </div>


  );
};

export default NoteCard;
