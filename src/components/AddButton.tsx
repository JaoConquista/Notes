import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';


const AddButton = () => {
  return (
    <div>
        <Button type="submit" variant="contained" >
            <AddIcon fontSize="small"/>
        </Button>
    </div>
  )
}

export default AddButton