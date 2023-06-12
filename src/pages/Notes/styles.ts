import styled from "styled-components"

export const Main = styled.main`


    background-color: ${props => props.theme.colors.background};

    color: ${props => props.theme.colors.primary}

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
     /*display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start; */

    column-count: 4;

    @media only screen and (max-width: 768px) {
    column-count:3 ;
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
    position:fixed;
    bottom:0px;
    left:0px;

}


`

export const Button1 = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    height: 46px;
    width: 46px;
    background: #3A3A3A;
    border: 3px solid #000;
    
`