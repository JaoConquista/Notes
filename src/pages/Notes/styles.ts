import styled from "styled-components"

export const App = styled.div`

    transition: 1s;

    padding: 0;
    margin: 0;


`

export const Title = styled.div`

    text-align: left;
    padding-left: 30px;
    width: 110%;


`

export const Header = styled.div`

display: flex;
width: 100%

`

export const Content = styled.div`
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
    padding-bottom: 10px;
    margin: 0;
     /*display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start; */

    column-count: 4;

    @media only screen and (max-width: 768px) {
    column-count:3 ;
    padding-bottom: 70px;
    }
    @media only screen and (max-width: 650px) {
    column-count:2 
    }
`

export const Footer = styled.div`

@media only screen and (max-width: 1500px) {
    display: none;
    }

@media only screen and (max-width: 760px) {
    background:  #3A3A3A;
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;

}


`

export const NavBar = styled.div`
    /* border: 1px solid red; */
    background-color: transparent;
    position: fixed;
    top: 580px;
    `
