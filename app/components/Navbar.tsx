'use client'

import { SubmitButton } from "@/app/components/SubmitButton";
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from '@mui/material';
import { usePathname } from "next/navigation";
import {useState, MouseEvent} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from "@/cloud/server/actions";
import Image from "next/image";
import unipiLogo from '../public/University-of-Piraeus-Logo.png';

export default function Navbar() {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const pathname = usePathname();

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ width: '100%',
                height: 50,
                backgroundColor: 'primary.main',
                position: 'sticky',
                top: 0,
                zIndex: 1200,
                boxShadow: 8,}}>
                {!pathname.startsWith('/authentication/') &&
                    <Box sx={{display: 'flex', flexDirection: 'row', height: '100%',}}>
                        <Image src={unipiLogo} alt="LOGO" width={50} height={50}/>
                        <Box sx={{position: 'absolute', top: 2, right: 2,}}>
                            <Tooltip title="Account options">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ mx: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', '&:hover': {
                                            color: 'secondary.main'
                                        } }}>
                                        <MenuIcon />
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    borderRadius: '4px',
                                    bgcolor: 'primary.main',
                                    boxShadow: 8,
                                    ml:2.3,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <form>
                            <MenuItem onClick={handleClose}>
                                <SubmitButton
                                    formAction={signOut}
                                    sx={{
                                        textTransform: "none",
                                        textAlign: 'start',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '6px 16px',
                                        width: '100%',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            color: 'secondary.main'
                                        }
                                    }}
                                    pendingText="Signing Out..."
                                >Sign Out
                                </SubmitButton>
                            </MenuItem>
                            </form>
                        </Menu>
                    </Box>
                }
            </Box>
        </>
    );
}

