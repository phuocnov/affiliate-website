'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ResponsiveAppBar from "@/app/components/Appbar";
import { AuthProvider } from "@/contexts/authContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className} >
        <AuthProvider>
          <AppRouterCacheProvider>
            <ResponsiveAppBar />
            {children}
          </AppRouterCacheProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
