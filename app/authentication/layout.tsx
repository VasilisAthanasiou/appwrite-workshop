import { Box } from "@mui/material";
import {ReactNode} from "react";

export default function AuthenticationLayout({children,}: { children: ReactNode }) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {children}
        </Box>
    )
}
