import RegisterComponent from "./components/RegisterComponent";
import {Typography} from "@mui/material";

export default function RegisterPage(){
    return(
        <>
            <Typography variant='h4' sx={{color: 'primary.main', mt: 4}}>Register</Typography>
            <RegisterComponent></RegisterComponent>
        </>
    );
}
