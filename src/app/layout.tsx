import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tahseen AI - AI Solutions That Enhance Your Work",
  description: "We build AI agents and automation systems that help businesses work smarter, faster, and more efficiently.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <body className="bg-[#0d1426] text-gray-100 min-h-full flex flex-col selection:bg-[#008688]/30 selection:text-[#008688]">
        {children}
      </body>
    </html>
  );
}
