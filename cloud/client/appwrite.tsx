'use client'
import { Client } from "appwrite";

export function createBrowserClient() {

  const client = new Client()
  .setEndpoint("")
  .setProject("");
  
  return client;
}