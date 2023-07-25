
interface NoteCardImageProps{
    image?: string;
}

export function NoteCardImage({image}: NoteCardImageProps){
    return (<>
     <img src={`${image}`} />
    </>)
}