import {
    createGlobalStyle
} from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    font-family: 'Roboto';

}
    body{
        height: 100vh;
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.primary};
    }
`

export default GlobalStyle;