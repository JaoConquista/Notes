import styledNotes from "styled-components"

export const Main = styledNotes.div`
    height: 12em;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`

export const Search = styledNotes.div`
    margin: 0 auto;
    margin-top: 15px;
    text-align: center;
    margin-bottom: 10px;
`

export const Result = styledNotes.div`
    min-width: 40vw;
    max-width: 90vw;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start;
`