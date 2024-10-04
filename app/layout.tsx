import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./components/SideNav";
import QueryProvider from "./provider/QueryProvider";
import ToastProvider from "./components/toast";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCAMalicious",
  description: "Scam detective app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <QueryProvider>
        <AuthProvider>
      <ToastProvider /> 
        <main className={inter.className}>{children}</main>
        </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
