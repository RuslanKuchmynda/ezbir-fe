import type {Metadata} from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import HeaderV2 from "@/components/HeaderV2";
import AuthAside from "@/app/auth/components/AuthAside";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "єЗбір",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ua">
        <body className=''>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
