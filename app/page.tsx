import { Box, Typography } from "@mui/material";
import QRImage from "./components/QRImage";
import { fetchQRCodePreviews, fetchQRCodes } from "./repository/QRCodeRepository";
import CreateQRCode from "./components/CreateQRCode";
import { getSession } from "@/cloud/server/actions";

export default async function Home() {
  const user = await getSession();

  const qrCodes = await fetchQRCodes(user?.$id ?? "");
  const qrCodesList = await fetchQRCodePreviews();

  // Ensure the lists are of the same length
  const listLength = Math.min(qrCodesList.length, qrCodes.length);
  
  return ( 
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%' }}>
            {Array.from({ length: listLength }).map((_, index) => (
              <Box key={index} sx={{ p: '25px' }}>
                <QRImage qrUrl={qrCodesList[index]} />
                <Typography>{qrCodes[index].qr_code_id}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ position: 'flex', mr: '50vw%', mt: '20px' }}>
          <CreateQRCode/>
        </Box>
      </Box>

  </>
  );
}
