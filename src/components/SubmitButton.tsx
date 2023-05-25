import Button from "@mui/material/Button"

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