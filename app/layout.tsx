import { type Metadata } from 'next';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Converso',
    description: 'Real-time AI Teaching Platform',
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={{variables: {colorPrimary: '#fe5933'}}}>
            <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

            <Navbar />
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
