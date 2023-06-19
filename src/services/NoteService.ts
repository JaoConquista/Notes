import axios from "axios";
import { INoteContent } from "../Interfaces/INote";

const urlNotes = "http://localhost:3000/notes";

export function postNote(note: INoteContent): Promise<any> {
  return axios.post(urlNotes, {
    title: note.title,
    content: note.content,
    color: note.color,
    image: note.image,
    tag: note.tag
  });
}

export async function getNote(): Promise<INoteContent[]> {
  const response = await axios.get<INoteContent[]>(urlNotes);

  const notes = response.data;
  const reversedNotes = notes.reverse()

  return reversedNotes;
}

export async function deleteNote(noteId: number) {
  try {
    const response = await axios.delete(`${urlNotes}/${noteId}`);

    return response;
  } catch (error) {
    console.log(error);
  }
}

export function editNote(note: INoteContent) {
  const editNoteUrl = `${urlNotes}/${note.id}`;

  return axios.put(editNoteUrl, note);
}

export function autoResize(tagId: string) {
  const textarea: HTMLElement | null = document.getElementById(`${tagId}`);
  if(textarea != null) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }else{
    return
  }
}
