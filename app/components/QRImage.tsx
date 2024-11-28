type Props = {
    qrUrl: string
}

export default function QRImage ({qrUrl} : Props) {
    
    return(
        <img
            width="150px"
            height="150px"
            alt='QRCode'
            src={qrUrl}
      />
    )
}