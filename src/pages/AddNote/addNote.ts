import styled from 'styled-components'

export const Main = styled.div`

margin: 0 auto;
display: flex;
flex-direction: column;
text-align: center;
justify-content: end;
max-width: 100%;
min-width: 40%;

.title{
    display: flex;
    justify-content: space-around;
    max-width: 100%;
    min-width: 30%;
}
#footer-position{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: end;
}



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

        #title{
            width: 75%;
            overflow-y: auto;
            resize: none;
            color: ${props => props.theme.colors.text2};
            background-color: ${props => props.theme.colors.background};
            border: none;
            font-size:25px ;
        }

        #title:focus{
            outline: none;
        }

        #content{
            max-width: 80%;
            overflow-y: auto;
            resize: none;
            color: ${props => props.theme.colors.text2};
            background-color: ${props => props.theme.colors.background};
            border: none;
            font-size: 20px ;
            line-height: 22px;
        }
        #content:focus{
            outline: none;
        }
        
        #input-image{
            width: 90%;
            overflow-y: auto;
            resize: none;
            border: none;

            color: ${props => props.theme.colors.text2};
            background-color: ${props => props.theme.colors.background};
            font-size: 14px ;
    }

        #input-image:focus{
            outline: none;
        }
   

`

export const NavBar = styled.div`
    /* border: 1px solid red; */
    background-color: transparent;
    position: fixed;
    left: 1;
    bottom: 20px;
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

form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    /* border: 1px solid blue; */
    height: 80%;
    width: 80%;
}

#title-add-mobile{
    /* background-color: ${props => props.theme.colors.background}; */

}

#cancel-mobile-btn{
    color: ${props => props.theme.colors.text};
}


`

export const Footer = styled.div`


    background:  #3A3A3A;
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 10;
    width: 80%;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 30px 0 0 30px;

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

    .undo-redo-controls{
        display: flex;
    }

   
`

export const Tags = styled.div`

    /* border: 1px solid #fff; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 auto;

    #select-tags{
        display: flex;
        align-items: center;
        
    }

    #items{
        display: flex;
        justify-content: space-between;
        width: 55px;
        margin-right: 10px;
    }

`

export const Image = styled.div`
    margin: 25px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: auto;

    img{
        height: 290px;
        max-width: 340px;
        min-width: 150px;
        border-radius: 30px;
        margin-top: 120px;
    }
`


