import styled from "styled-components"

export const App = styled.div`

    transition: 1s;

    padding: 0;
    margin: 0;


`

export const Title = styled.div`

    text-align: left;
    font-size: small;
    display: flex;
    justify-content: center;
    border-right: 1px solid #ccc;
    color: #f8f9fa;
    width: 10%;
    margin: 10px;
    padding-right: 10px;

    @media only screen and (max-width: 768px){
        display: none;
    }


`

export const Header = styled.div`

display: flex;
width: 100%

`

export const Content = styled.div`
    height: 6em;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media only screen and (max-width: 760px) {
        display: none;
        form{
            display: none;
            margin-top: 20px;
        }
    }
`

export const Search = styled.div`
    margin: 0 auto;
    text-align: center;
    background-color: #3A3A3A;
    border-radius: 30px;
    margin: 10px;
    width: 95%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    input{
        width: 80%;
        height: 38px;
        background-color: #3A3A3A;
        color: ${props => props.theme.colors.text2};
        border: none;

        font-size: medium;
    }
    input:focus{
        outline: none;
    }

    hr{
        border: 1px solid #ccc;
        height: 28%;
    }
`

export const Result = styled.div`
    min-width: 40vw;
    max-width: 98vw;
    margin: 0 auto;
    padding: 8px;
     /*display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: start;

    display: grid;
    grid-template-columns: repeat(4, 2fr); /* Definindo 4 colunas */
    column-count: 4;

    .vertical{
        grid-column: span 2;
    }


    @media only screen and (max-width: 768px) {
    column-count:3 ;
    padding-bottom: 70px;

    .vertical{
        grid-column: span 3;
    }
    }
    @media only screen and (max-width: 650px) {
    column-count:2 ;
    .vertical{
        grid-column: span 4;
    }
    }
`

export const Footer = styled.div`
display: none;

@media only screen and (max-width: 768px) {
    background:  #3A3A3A;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;

    #icons-part1, #icons-part2{
        width: 45%;
        display: flex;
        justify-content: space-around;
    }
    #icons-part1{
        padding-right: 15px;
    }
    #icons-part2{
        padding-left: 15px;
    }

}


`

export const NavBar = styled.div`
    /* border: 1px solid red; */
    background-color: transparent;
    position: fixed;
    left: 1;
    bottom: 7px;
    z-index: 100;
`

export const AddNoteMobile = styled.div`

height: 83.5vh;
margin: 0 auto;
display: flex;
justify-content: center;

#cancel-mobile-btn{
    display: flex;
    justify-content: end;
    margin: 10px;
}

#create-mobile-note{
    display: flex;
    justify-content: center;
    
}

/* form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    /* border: 1px solid blue;
    height: 80%;
    width: 80%; */

#title-add-mobile{
    /* background-color: ${props => props.theme.colors.background}; */

}

#cancel-mobile-btn{
    color: ${props => props.theme.colors.text};
}
`


export const Form = styled.form`
        margin-left: 10px;
        display: flex;
        max-width: 100%;
        min-width: 30%;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;

        #title-edit-content{
            display: flex;
            justify-content: space-between;
            align-items: center;

            #more{
                margin-bottom: 26px;
                margin-right: 10px;
            }

        }
        textarea{
            margin-top: 12px;
            
        }

        #edit-title{
            width: 75%;
            overflow-y: auto;
            resize: none;
            color: ${props => props.theme.colors.text};
            background-color: ${props => props.theme.colors.background};
            border: none;
            font-size:25px ;
        }

        #edit-title:focus{
            outline: none;
        }

        #edit-content{
            max-width: 80%;
            overflow-y: auto;
            resize: none;
            color: ${props => props.theme.colors.text};
            background-color: ${props => props.theme.colors.background};
            border: none;
            font-size: 15px ;
            line-height: 22px;
        }
        #edit-content:focus{
            outline: none;
        }
   

`

export const TagsContent = styled.div`
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  margin: 12px 0px 10px 0px ;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  #tag-btn{
    min-width: 70px;
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: 45px;
    font-size: 0.8rem;
    border-radius: 12px;
    margin-left: 10px;
    margin-right: 3px;

    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.button};
    border: 1px solid ${props => props.theme.colors.button};
  }

  #tag-btn-selected{
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    padding: 10px;


    min-width: 70px;
    height: 45px;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 12px;
    margin-left: 10px;
    margin-right: 3px;

    background: ${props => props.theme.colors.buttonSelected};
    color: ${props => props.theme.colors.text};
    border: 1px solid ${props => props.theme.colors.buttonSelected};
  }
`

export const Image = styled.div`
    margin: 25px;

    img{
        height: 290px;
        max-width: 340px;
        min-width: 150px;
        border-radius: 30px;
    }



`
