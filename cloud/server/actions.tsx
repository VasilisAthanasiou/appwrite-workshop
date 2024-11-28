'use server'

import {redirect} from "next/navigation";
import {createAdminClient, createSessionClient} from "./appwrite";
import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getSession = async () => {

    const { account } = await createSessionClient();

    try {
        return await account.get();
    } catch (error) {        
        return undefined;
    }
};

// -------------------------------------------- Authentication ------------------------------------------------------ //
export const signIn = async (formData: FormData) => {
    
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        

        cookies().set(process.env.NEXT_APPWRITE_SESSION_COOKIE!, session.secret, {
            path: '/',
            httpOnly: true, 
            sameSite: "strict",
        });

    } catch (e) {
        console.log('Sign In error: ' + e);
        return redirect('/authentication/login?login_result=fail');
    }
    revalidatePath('/', 'layout');
    return redirect('/');
};

export const signUp = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userId = ID.unique();

    try {
        const { account } = await createAdminClient();
        await account.create(userId, email, password, email);
    } catch (e) {
        console.log(e);
        return redirect("/authentication/register?signup_result=fail");
    }
    return redirect("/authentication/login?signup_result=success");

};

export const signOut = async () => {
    
    try {
        const { account } = await createSessionClient();
        cookies().delete(process.env.NEXT_APPWRITE_SESSION_COOKIE!);
        await account.deleteSession('current');
    } catch (e) {
        console.log(e);
        return;
    }
    revalidatePath('/', 'layout');
    return redirect('/authentication/login');
    
}

// ---------------------------------------- End of Authentication --------------------------------------------------- //