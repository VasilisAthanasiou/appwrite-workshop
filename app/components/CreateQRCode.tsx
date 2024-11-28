'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Fab, Modal, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { SubmitButton } from "./SubmitButton";
import toast from "react-hot-toast";
import { createQRCode } from "../repository/QRCodeRepository";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    zIndex: 100
};

export default function CreateQRCode() {
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter(); 

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {        
        if (searchParams.get('created_qr_code') === 'success') {
            toast.success("QR Code successfully created!");
            handleClose();
            router.push('/');
        }
        if (searchParams.get('created_qr_code') === 'fail') {
            toast.error("New QR Code creation failed.");
            handleClose();
            router.push('/');
        }
    }, [router, searchParams]);

    return (
        <div>
            <Fab id='create-qr-code' sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                    bgcolor: "secondary.main",
                }
            }} aria-label="add" onClick={handleOpen}>
                <AddIcon sx={{color: 'white'}}/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >  
                <Box sx={style}>
                    <form id='create-qr-code-modal'>
                        <Typography variant='h5' sx={{color: 'primary.main'}}>Create new QR Code</Typography>
                        <Box sx={{ mt:2 }}>
                            <TextField
                                label="Content"
                                variant="outlined"
                                name="content"
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
                            <Box sx={{mb:1, display: 'flex', gap:1, spacing: 2, alignItems: 'center', width:'100%'}}>
                                <SubmitButton formAction={createQRCode} variant="contained"
                                            sx={{textTransform: "none", width: "50%"}} pendingText="Creating..."> Create
                                </SubmitButton>
                                <Button variant="contained" color="error" sx={{textTransform: 'none', width: "50%"}}
                                        onClick={() => {
                                            router.push('/');
                                            handleClose();
                                        }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
        </Modal>
        </div>
    );
}
