import styled from "styled-components"

export const Main = styled.div`
    height: 12em;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`


export const Search = styled.div`
    margin: 0 auto;
    margin-top: 15px;
    text-align: center;
    margin-bottom: 10px;
`

export const Result = styled.div`
    min-width: 40vw;
    max-width: 98vw;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start;
`

// export const Column = styled.div`
//     -webkit-column-count: 3; /* Chrome, Safari, Opera */
//     -moz-column-count: 3; /* Firefox */
//      column-count: 1;
//     height: 100%;
//     column-gap: .5rem;
//     border: 1px solid #000;
// `