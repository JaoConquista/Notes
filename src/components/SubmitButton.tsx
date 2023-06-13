import Button from "@mui/material/Button"
import AddIcon from '@mui/icons-material/Add';

type SubmitButton = {
  name: string
}
  


const SubmitButton = ({name}: SubmitButton) => {
  return (
    <div>
        <Button type="submit" variant="contained" >
            {name}
        </Button>
    </div>
  )
}

export default SubmitButton