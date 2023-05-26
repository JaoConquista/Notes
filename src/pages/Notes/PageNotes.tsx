import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SubmitButton from "../../components/SubmitButton";
import NoteCard from "../../components/NoteCard";
import { INoteContent } from "../../Interfaces/INote";
import Modal from "../Modal/Modal";
import {
  deleteNote,
  getNote,
  postNote,
  editNote,
} from "../../services/NoteService";

import NotePagestyles from "./PageNotes.module.css";

const PageNotes = () => {
  //Qual a melhor forma de inserir valores em um state de objetos ?

  const [note, setNote] = useState<INoteContent>({
    id: 0,
    title: " ",
    content: " ",
  });
  const [noteList, setNoteList] = useState<INoteContent[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [noteToEdit, setNoteToEdit] = useState<INoteContent | null>(null);

  //filtro de notas
  const filteredNotes =
    searchInput.length > 0
      ? noteList.filter(
          (note) =>
            note.title.includes(searchInput) ||
            note.content.includes(searchInput)
        )
      : [];

  useEffect(() => {
    fecthData();
  }, []);

  const notesToShow = searchInput.length > 0 ? filteredNotes : noteList;

  const removeNote = async (id: number) => {
    await deleteNote(id);

    console.log(`Card ${id} foi deletado`);

    await fecthData();
  };

  const createNote = async (note: INoteContent) => {
    try {
      await postNote(note);

      await fecthData();
    } catch (error) {
      return error;
    }
  };

  const fecthData = async () => {
    const data = await getNote();

    setNoteList(data);
  };

  const handleEdit = (note: INoteContent) => {
    setNoteToEdit(note);

    setShowModal(true);
  };

  const handleDelete = (id: number) => removeNote(id);

  const updateNote = async (note: INoteContent) => {
    await editNote(note);
  };

  const handleModalSubmit = async (note: INoteContent) => {
    updateNote(note);
    setShowModal(false);
    clearNoteToEdit();

    await fecthData();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createNote(note);

    await fecthData();

    setNote({ id: note.id, title: "", content: "" });
  };

  const clearNoteToEdit = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="notes">
      <div className={NotePagestyles["main"]}>
        <div className="title">
          <h1>Notes</h1>
        </div>
        <div className={NotePagestyles["content"]}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-controlled"
              sx={{ margin: "10px" }}
              autoComplete="off"
              label="Título"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
            <TextField
              id="outlined-controlled"
              sx={{ margin: "10px" }}
              autoComplete="off"
              label="Conteúdo"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
            />
            <SubmitButton name="Criar" />
          </form>
        </div>
      </div>
      {noteList.length > 0 && (
        <div className={NotePagestyles["search"]}>
          <TextField
            id="outlined-controlled"
            sx={{ margin: "10px", width: "30em" }}
            label="Buscar"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      )}
      <div className="result">
        {showModal && noteToEdit && (
          <Modal
            onClose={() => clearNoteToEdit()}
            note={noteToEdit}
            submit={handleModalSubmit}
          />
        )}

        {!showModal &&
          notesToShow.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
      </div>
    </div>
  );
};

export default PageNotes;
