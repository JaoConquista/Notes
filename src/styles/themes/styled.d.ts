import 'styled-components'
//Sobre escrevendo o módulo default theme
declare module 'styled-components' {
    export interface DefaultTheme{
        title: string;
        colors: {
            primary: string;
            secondary: string;
    
            background:string;
            inputBackground: string;
            text: string;
            white: string

            buttonBackGround: string,
            buttonText:string,
        }
    }
}