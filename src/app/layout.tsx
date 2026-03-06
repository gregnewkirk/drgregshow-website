import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Dr. Greg | Science Communicator & Content Creator",
  description:
    "Evidence-based science talks, open debates, and practical advice. Come learn, challenge ideas, and join a kinder, smarter internet.",
  openGraph: {
    title: "Dr. Greg | Science Communicator & Content Creator",
    description:
      "Evidence-based science talks, open debates, and practical advice.",
    url: "https://drgregshow.com",
    siteName: "Dr. Greg Show",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-body bg-bg text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
