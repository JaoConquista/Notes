import axios from "axios";
import { INoteContent } from "../Interfaces/INote";

const urlNotes = "https://localhost:7072/api/Note";


export function postNote(note: INoteContent): Promise<any> {
  return axios.post(`${urlNotes}`,{
    title: note.title,
    userId: note.userId,
    content: note.content,
    color: note.color,
    image: note.image,
    tagId: note.tagId
  });
}

export async function getNote(userId: number): Promise<INoteContent[]> {
  const response = await axios.get<INoteContent[]>(`${urlNotes}/${userId}`);
  console.log(response.data)
  const notes = response.data;
  const reversedNotes = notes.reverse()

  return reversedNotes;
}

// export function teste() {
//   let localNotes = localStorage.getItem("notes")
//   let notes: INoteContent[]

//   if(localNotes !== null){
//     notes = JSON.parse(localNotes)
//   }else{
//     notes = []
//   }

//   const reversedNotes = notes.reverse()

//   return reversedNotes
// }

export async function deleteNote(noteId: number, userId: number) {
  try {
    const response = await axios.delete(`${urlNotes}/${noteId}`, {
      params: {
        userId: userId
      }
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export function editNote(note: INoteContent) {
  const editNoteUrl = `${urlNotes}/${note.id}`;

  return axios.put(editNoteUrl, note , {
    params: {
      userId: note.userId
    }
  });
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
