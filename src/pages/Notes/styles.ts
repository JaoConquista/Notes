import styled from "styled-components"

export const Title = styled.div`

    /* border: 1px solid #000; */
    text-align: center;
    width: 110%;
    padding-left: 70px;


`


export const Header = styled.div`

display: flex;
/* border: 1px solid blue; */
width: 100%

`


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
    margin: 0 auto;
    margin: 10px;
     /*display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start; */

    column-count: 4;

    @media only screen and (max-width: 768px) {
    column-count:3 ;
    }
    @media only screen and (max-width: 650px) {
    column-count:2 ;
    }
`

// export const Column = styled.div`
//     -webkit-column-count: 3; /* Chrome, Safari, Opera */
//     -moz-column-count: 3; /* Firefox */
//      column-count: 1;
//     height: 100%;
//     column-gap: .5rem;
//     border: 1px solid #000;
// `