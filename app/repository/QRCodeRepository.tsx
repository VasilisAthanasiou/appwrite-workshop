'use server'
import { createDatabaseClient, createStorageClient } from "@/cloud/server/appwrite";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import { QRCode } from "../model/QRCode";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Query } from "appwrite";
import { getSession } from "@/cloud/server/actions";

const QR_CODES_BUCKET = "";
const DATABASE_ID = ""
const QR_CODES_COLLECTION_ID = ""

export const createQRCode = async (formData: FormData) => {
    const database = await createDatabaseClient();
    const content = formData.get('content')?.toString();
    const user = await getSession();
    
    try {
        const qrCodeID = await generateQRCode(content!);
        if (qrCodeID) {
            const newQRCode: QRCode = {
                qr_code_id: qrCodeID,
                content: content!,
                user_id: user!.$id,
            };
    
            const qrCode = await database.createDocument(
                DATABASE_ID,
                QR_CODES_COLLECTION_ID,
                qrCodeID,
                newQRCode
            )
            console.log(qrCode);
            return redirect('/?created_qr_code=success');
        }
        return redirect('/?created_qr_code=fail'); 

    } catch (error) {
        if(isRedirectError(error)) {
            throw error;
        }
        console.log('createQRCode error: ', error);
        return redirect('/?created_qr_code=fail');
    }
}

export const generateQRCode = async (qrContent: string) => {
    const storage = await createStorageClient();
    const QRCodeID = ID.unique();
    try {
        const qrImageRaw = await fetch('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + qrContent);
        const qrImageBlob = await qrImageRaw.blob();
        await storage.createFile(
            QR_CODES_BUCKET,
            QRCodeID,
            new File([qrImageBlob], qrContent!) 
        )
        revalidatePath('/', 'layout');
        return QRCodeID;
    } catch (error) {
        console.log('generateQRCode error: ', error);
    }
    return null;
}

export const fetchQRCodeFiles = async () => {
    const storage = await createStorageClient();

    try { 
        const result = await storage.listFiles(
            QR_CODES_BUCKET,
        );
        return result.files;
    } catch (error) {
        console.log('fetchQRCodes error: ', error);
        return [];
    }
}

export const fetchQRCodes = async (userID: string) => {
    const database = await createDatabaseClient();

    try { 
        const qrCodesDocs = await database.listDocuments(
            DATABASE_ID,
            QR_CODES_COLLECTION_ID,
            [Query.equal("user_id", userID)]
        );
        const QRCodes = qrCodesDocs.documents.map(documentToQRCode);
        return QRCodes as QRCode[];
    } catch (error) {
        console.log('fetchQRCodes error: ', error);
        return [];
    }
}

export const fetchQRCodePreviews = async () => {
    const storage = await createStorageClient();
    try {
        const qrCodesStorageObjects = await fetchQRCodeFiles();
        const qrCodePreviews = [];
        for (let qrCodeStorageObject of qrCodesStorageObjects) {
            const arrayBuffer = await storage.getFilePreview(
                QR_CODES_BUCKET,
                qrCodeStorageObject.$id,
                150,
                150,
            );
            // Convert ArrayBuffer to base64
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const dataUrl = `data:image/png;base64,${base64}`;
            qrCodePreviews.push(dataUrl);
        }
        return qrCodePreviews;
    } catch (error) {
        console.log('fetchQRCodePreviews error: ', error);
        return [];
    }
}

export const fetchQRCode = async (qrCodeID: string) => {
    const database = await createDatabaseClient();

    try {
        const qrCode = await database.getDocument(
            DATABASE_ID,
            QR_CODES_COLLECTION_ID,
            qrCodeID
        )
        console.log(qrCode);
        
    } catch (error) {
        console.log('fetchQRCode error: ', error);
        return undefined;
    }
}

const documentToQRCode = (doc: any) => {
    return {
        qr_code_id: doc.qr_code_id,
        content: doc.content,
    };
}

