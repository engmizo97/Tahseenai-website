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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://tahseenai.com/#organization",
              "name": "شركة تحسين الحلول التقنية للذكاء الاصطناعي",
              "alternateName": ["Tahseen AI", "تحسين للذكاء الاصطناعي", "منصة تحسين التعليمية", "تحسين التعليمية"],
              "url": "https://tahseenai.com",
              "identifier": {
                "@type": "PropertyValue",
                "name": "الرقم الوطني الموحد",
                "value": "7051762271"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "الرياض",
                "addressCountry": "SA"
              },
              "sameAs": [
                "https://edutahseen.com",
                "https://www.instagram.com/tahseen.education/",
                "https://www.tiktok.com/@tahseen.education",
                "https://www.facebook.com/tahseen.education",
                "https://x.com/TahsenEducation"
              ],
              "subOrganization": {
                "@type": "EducationalOrganization",
                "@id": "https://edutahseen.com/#organization",
                "name": "منصة تحسين التعليمية",
                "alternateName": ["تحسين التعليمية", "منصة قدرات", "منصة تحصيلي", "منصة بوصلتي", "edutahseen"],
                "url": "https://edutahseen.com",
                "description": "منصة تحسين التعليمية (edutahseen.com) — المنصة التعليمية الذكية الأولى في المملكة العربية السعودية للتدريب التكيفي على اختبارات القدرات العامة والتحصيلي ومقياس بوصلتي لتحديد التخصص الجامعي."
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(regs) {
                    for (var r of regs) r.unregister();
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var n of names) caches.delete(n);
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#0d1426] text-gray-100 min-h-full flex flex-col selection:bg-[#008688]/30 selection:text-[#008688]">
        {children}
      </body>
    </html>
  );
}
