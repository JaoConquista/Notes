import styled from "styled-components";

export const Main = styled.div`

img{
    border-radius: 100px;
}

#profile-img{
    text-align: center;

    h3{
        margin: 10px;
    }

    img{
        width: 350px;
        height: 350px;
        border-radius: 200px;

        @media only screen and (max-width : 758px){
            width: 250px;
            height: 250px;
        }

        @media only screen and (max-width : 628px){
            width: 200px;
            height: 200px;
        }
    }
}

#footer-position{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: end;
}


#content-1{
    margin: 10px;
    display: flex;
    justify-content: space-around;
    height: 500px;
    
    #inputs{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    
}
@media only screen and (max-width : 428px){
            #content-1{
                display: flex;
                flex-direction: column;
            }
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