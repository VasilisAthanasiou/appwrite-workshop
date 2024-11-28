'use client'
import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary : {
            main: '#232d53',
        },
        secondary: {
            main: '#9a1d2e'
        }
    },
    components:{
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                }
            }
        }
    }

})
