import { Box, Typography } from "@mui/material";
import LoginComponent from "./components/LoginComponent";

export default function LoginPage(){
    return(
        <Box>
            <Typography variant='h4' sx={{color: 'primary.main', mt: 4, ml: 18}}>Log into your account</Typography>
            <LoginComponent></LoginComponent>
        </Box>
    );
}
