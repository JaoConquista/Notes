import axios from "axios";
import { INoteContent } from "../Interfaces/INote";

const urlNotes = 'http://localhost:3000/notes'

export function postNote(note: INoteContent): Promise<any> {
    
    return(
        axios.post(urlNotes, {
            title: note.title,
            content: note.content,
        })
    )
}

export async function getNote(): Promise<INoteContent[]>{

    const response = await axios.get<INoteContent[]>(urlNotes)

    const notes = response.data

    return notes
} 

export async function deleteNote(noteId: number) {

     try {

        const response = await axios.delete(`${urlNotes}/${noteId}`)

        return response

     } catch (error) {

        console.log(error)

     }
     
}

export function editNote(note: INoteContent, noteId: number) {
    let editNote = `${urlNotes}/${noteId}`

    return axios.put(editNote, {
        title: note.title,
        content: note.content
    })
}