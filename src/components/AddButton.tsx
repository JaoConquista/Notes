import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';
import {AddButtonStyle} from "./AddButtonStyle";


const AddButton = () => {
  return (
    <AddButtonStyle>
        <Button type="submit" variant="contained">
            <AddIcon fontSize="small"/>
        </Button>
    </AddButtonStyle>
  )
}

export default AddButton