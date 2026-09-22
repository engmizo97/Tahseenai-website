"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ArrowRight, HeartHandshake } from "lucide-react";

interface FooterProps {
  lang?: "ar" | "en";
}

export default function Footer({ lang = "en" }: FooterProps) {
  const isAr = lang === "ar";
  const contactHref = isAr ? "/contact?lang=ar" : "/contact";
  const homePrefix = isAr ? "/?lang=ar" : "";

  const content = {
    ar: {
      mission:
        "وكلاء ذكاء اصطناعي وأنظمة أتمتة تساعد الشركات في السعودية على إنجاز أعمالها اليومية بكفاءة.",
      hq: "الرياض، المملكة العربية السعودية",
      social: (
        <>
          تبرع بنسبة 1% من الأرباح لصالح{" "}
          <strong className="text-white">منصة إحسان (Ehsan Platform)</strong>
        </>
      ),
      colSolutions: "المنصة والحلول",
      solutionsList: [
        { name: "تحسين التعليمية", href: "https://edutahseen.com" },
        { name: "وكلاء الذكاء الاصطناعي", href: "/#services" },
        { name: "أتمتة العمليات", href: "/#services" },
        { name: "المتابعة والتحليلات", href: "/#insights" },
        { name: "استشارات الذكاء الاصطناعي", href: "/#services" },
        { name: "تطوير الويب والتطبيقات", href: "/#services" },
      ],
      colCompany: "عن الشركة",
      companyList: [
        { name: "من نحن", href: `${homePrefix}/#about` },
        { name: "قصص النجاح", href: `${homePrefix}/#testimonials` },
        { name: "اتصل بنا", href: contactHref },
      ],
      colContact: "التواصل",
      contactDesc: "لديك سؤال أو ترغب في بدء مشروع؟ تواصل معنا مباشرة.",
      emailLabel: "البريد الإلكتروني",
      letsTalk: "تحدث معنا",
      copyright: `© ${new Date().getFullYear()} مجموعة تحسين للذكاء الاصطناعي. جميع الحقوق محفوظة.`,
      privacy: "سياسة الخصوصية",
      terms: "الشروط والأحكام",
      security: "أمان الأنظمة",
      vision: "المملكة العربية السعودية • رؤية 2030",
    },
    en: {
      mission:
        "AI agents, automated workflows, and custom software for businesses in Saudi Arabia.",
      hq: "Riyadh, Kingdom of Saudi Arabia",
      social: (
        <>
          1% of profits donated to{" "}
          <strong className="text-white">Ehsan Platform (منصة إحسان)</strong>
        </>
      ),
      colSolutions: "Solutions",
      solutionsList: [
        { name: "Tahseen Education", href: "https://edutahseen.com" },
        { name: "AI Agents", href: `${homePrefix}/#services` },
        { name: "Process Automation", href: `${homePrefix}/#services` },
        { name: "Live Analytics", href: `${homePrefix}/#insights` },
        { name: "AI Consulting", href: `${homePrefix}/#services` },
        { name: "Web & App Development", href: `${homePrefix}/#services` },
      ],
      colCompany: "Company",
      companyList: [
        { name: "About Us", href: `${homePrefix}/#about` },
        { name: "Client Stories", href: `${homePrefix}/#testimonials` },
        { name: "Contact Us", href: contactHref },
      ],
      colContact: "Contact",
      contactDesc: "Have a question or ready to start a project? Reach out anytime.",
      emailLabel: "Email",
      letsTalk: "LET'S TALK",
      copyright: `© ${new Date().getFullYear()} Tahseen AI Group. All rights reserved.`,
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      security: "Security",
      vision: "KSA • Vision 2030",
    },
  };

  const t = isAr ? content.ar : content.en;

  return (
    <footer className="relative z-10 bg-[#0f1629] border-t border-white/[0.08] pt-16 sm:pt-20 pb-12 text-gray-400 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Column 1: Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <Link href={isAr ? "/" : "/?lang=en"} className="flex items-center group">
              <div className="relative h-11 w-52 sm:h-12 sm:w-60 transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,134,136,0.3)]">
                <Image
                  src="/tahseen-logo.png?v=3"
                  alt="Tahseen AI"
                  fill
                  sizes="(max-width: 640px) 208px, 240px"
                  className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                />
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm font-normal">
              {t.mission}
            </p>

            {/* Saudi Regional Identity & Ehsan Pledge */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                <MapPin className="w-4 h-4 text-[#008688] flex-shrink-0" />
                <span>{t.hq}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-300">
                <HeartHandshake className="w-4 h-4 text-[#008688] flex-shrink-0" />
                <span>{t.social}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Solutions & Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {t.colSolutions}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {t.solutionsList.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`inline-block hover:text-[#008688] transition-all duration-200 ${
                      isAr ? "hover:-translate-x-1.5" : "hover:translate-x-1.5"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company & Governance */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {t.colCompany}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {t.companyList.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`inline-block hover:text-[#008688] transition-all duration-200 ${
                      isAr ? "hover:-translate-x-1.5" : "hover:translate-x-1.5"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected & Direct Inquiries */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              {t.colContact}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.contactDesc}
            </p>

            <a
              href="mailto:info@tahseenai.com"
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-[#008688]/10 border border-white/[0.08] hover:border-[#008688]/40 transition-all duration-300 group hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,134,136,0.15)]"
            >
              <div className="w-8 h-8 rounded-xl bg-[#008688]/10 text-[#008688] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400">{t.emailLabel}</div>
                <div className="text-xs font-bold text-white group-hover:text-[#008688] transition-colors">
                  info@tahseenai.com
                </div>
              </div>
            </a>

            <Link
              href={contactHref}
              className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#008688] text-white hover:brightness-110 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(0,134,136,0.3)] hover:shadow-[0_6px_25px_rgba(0,134,136,0.5)] hover:-translate-y-0.5 gap-1.5"
            >
              <span>{t.letsTalk}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono text-center sm:text-start">
          <div>
            {t.copyright}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-gray-400">
            <Link href={isAr ? "/#about" : "/?lang=en#about"} className="hover:text-[#008688] transition-colors">
              {t.privacy}
            </Link>
            <Link href={isAr ? "/#about" : "/?lang=en#about"} className="hover:text-[#008688] transition-colors">
              {t.terms}
            </Link>
            <Link href={isAr ? "/#insights" : "/?lang=en#insights"} className="hover:text-[#008688] transition-colors">
              {t.security}
            </Link>
            <span className="text-[#008688] font-semibold">{t.vision}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
