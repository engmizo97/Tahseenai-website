import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Tahseen AI - AI Solutions That Enhance Your Work",
  description: "We build AI agents, automated workflows, and custom software that save businesses time and reduce manual work.",
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
      className="h-full antialiased scroll-smooth dark"
    >
      <body className="bg-[#0d1426] text-gray-100 min-h-full flex flex-col selection:bg-[#008688]/30 selection:text-[#008688]">
        {children}
      </body>
    </html>
  );
}
