// layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@mui/material/styles"; 
import { theme } from './theme';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appwrite Workshop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
            <Toaster position={"top-right"}></Toaster>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
