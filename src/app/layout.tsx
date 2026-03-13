import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${plusJakartaSans.variable} ${inter.variable} font-body bg-bg text-text-primary antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
