"use server";
import { Client, Account, Storage } from "node-appwrite";
import {Databases} from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint("")
    .setProject("");

  const session = cookies().get(process.env.NEXT_APPWRITE_SESSION_COOKIE!);
  if ( session ) {    
    client.setSession(session.value);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createDatabaseClient() {
  const client = new Client()
      .setEndpoint("")
      .setProject("")

  const session = cookies().get(process.env.NEXT_APPWRITE_SESSION_COOKIE!);

  if (session) {
    client.setSession(session.value);
  }
return new Databases(client);
}

export async function createStorageClient() {
  const client = new Client()
      .setEndpoint("")
      .setProject("");
  
  const session = cookies().get(process.env.NEXT_APPWRITE_SESSION_COOKIE!);

  if (session) {
    client.setSession(session.value);
  }
  
  return new Storage(client);
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint("")
    .setProject("")
    .setKey("");

  return {
    get account() {
      return new Account(client);
    },
  };
}
