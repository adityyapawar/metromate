import type { Metadata, Viewport } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Tour from "@/components/Tour";
import Footer from "@/components/Footer";
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = { title: "MetroMate – Pune Metro journey companion", description: "Find stations, explore metro lines and plan your journey across Pune." };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F7F8FA" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${geist.variable}`}><body className="font-sans"><Navbar /><main>{children}</main><Footer /><Tour /></body></html>);
}
