'use client'

import { SubmitButton } from "@/app/components/SubmitButton";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Box, IconButton, InputAdornment, Link as MuiLink, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import { signUp } from "@/cloud/server/actions";

export default function RegisterComponent() {

    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {

        if (searchParams.get('signup_result') === 'fail'){
            toast.error("Sign up failed.");
        }
    });

    return(
        <Box sx={{width: 600, mt: 4}}>
            <form>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        px: 8,
                        maxWidth: 'md',
                        justifyContent: 'center',
                        gap: 2,
                    }}
                >
                    <TextField
                        label="Email"
                        variant="outlined"
                        name="email"
                        required
                        fullWidth
                        InputProps={{
                            sx: {
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: 4,
                                height: '50px',
                                py: 1,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'primary.main',
                                }
                            }
                        }}
                        sx={{
                            mb: 2,
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        InputProps={{
                            sx: {
                                borderRadius: '8px',
                                backgroundColor: 'white',
                                boxShadow: 4,
                                height: '50px',
                                py: 1,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'primary.main',
                                }
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                        }}
                    />
                    <Box sx={{display: 'flex'}}>
                    <Typography variant={'inherit'}>Have an account?&nbsp;</Typography>
                    <MuiLink component={NextLink} href='/authentication/login' sx={{
                        cursor: 'pointer',
                        textDecoration: 'none',
                        mb: 2,
                        color: 'primary.main',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}>Log In.</MuiLink>
                    </Box>
                    <SubmitButton
                        variant="contained"
                        formAction={signUp}
                        sx={{textTransform: "none", boxShadow: 4}}
                        pendingText="Signing Up..."
                    >
                        Sign Up
                    </SubmitButton>
                </Box>
            </form>
        </Box>
    )
}
