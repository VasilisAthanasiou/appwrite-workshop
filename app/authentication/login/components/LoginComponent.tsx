'use client'
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {Box, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {SubmitButton} from "@/app/components/SubmitButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import NextLink from "next/link";
import { Link as MuiLink } from '@mui/material';
import { signIn } from "@/cloud/server/actions";


export default function LoginComponent() {

    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const route = useRouter();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {

        if (searchParams.get('signup_result') === 'success'){
            toast.success("Sign up successful!");
        }
        if (searchParams.get('login_result') === 'fail') {
            toast.error("The credentials you provided do not belong to an existing account.");
        }
        route.push('/authentication/login');
    });

    return (
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
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box sx={{display: 'flex'}}>
                        <Typography variant={'inherit'}>Don&apos;t have an account?&nbsp;</Typography>
                        <MuiLink component={NextLink} href='/authentication/register' sx={{
                            cursor: 'pointer',
                            textDecoration: 'none',
                            mb: 2,
                            color: 'primary.main',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}>Register.</MuiLink>
                    </Box>
                </Box>
                <SubmitButton
                    variant="contained"
                    formAction={signIn}
                    sx={{textTransform: "none", width: '100%'}}
                    pendingText="Logging In..."
                >
                    Log In
                </SubmitButton>
                </Box>
            </form>
        </Box>
    );
}
