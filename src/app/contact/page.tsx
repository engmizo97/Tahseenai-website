"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Clock, CheckCircle2, MessageSquare, Sparkles, Send, Globe, Menu, X, Sun, Moon } from "lucide-react";
import Footer from "@/components/Footer";
import AmbientWaveParticles from "@/components/AmbientWaveParticles";
import CurvedRibbonBackground from "@/components/CurvedRibbonBackground";

export default function ContactPage() {
  const [lang, setLang] = useState<"ar" | "en">("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isAr = lang === "ar";
  const isLight = theme === "light";
  const homePrefix = isAr ? "/?lang=ar" : "";
  const contactHref = isAr ? "/contact?lang=ar" : "/contact";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    service: "AI Agents & Automation",
    budget: "$5,000 - $15,000",
    message: "",
  });

  // Sync Language & Theme from LocalStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "en" || urlLang === "ar") {
          setLang(urlLang as "ar" | "en");
        } else {
          const saved = localStorage.getItem("tahseen_lang");
          if (saved === "en" || saved === "ar") {
            setLang(saved as "ar" | "en");
          }
        }

        const savedTheme = localStorage.getItem("tahseen_theme") as "dark" | "light" | null;
        if (savedTheme === "dark" || savedTheme === "light") {
          setTheme(savedTheme);
          document.documentElement.classList.remove("dark", "light");
          document.documentElement.classList.add(savedTheme);
        } else {
          document.documentElement.classList.add("dark");
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  const toggleLanguage = () => {
    const nextLang = isAr ? "en" : "ar";
    setLang(nextLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("tahseen_lang", nextLang);
      const url = new URL(window.location.href);
      if (nextLang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", "ar");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("tahseen_theme", nextTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(nextTheme);
    }
  };

  const navLinks = isAr
    ? [
        { name: "الرئيسية", href: `${homePrefix}/#home` },
        { name: "خدماتنا", href: `${homePrefix}/#services` },
        { name: "التحليلات", href: `${homePrefix}/#insights` },
        { name: "الحلول", href: `${homePrefix}/#solutions` },
        { name: "من نحن", href: `${homePrefix}/#about` },
        { name: "اتصل بنا", href: contactHref },
      ]
    : [
        { name: "HOME", href: `${homePrefix}/#home` },
        { name: "SERVICES", href: `${homePrefix}/#services` },
        { name: "INSIGHTS", href: `${homePrefix}/#insights` },
        { name: "SOLUTIONS", href: `${homePrefix}/#solutions` },
        { name: "ABOUT US", href: `${homePrefix}/#about` },
        { name: "CONTACT", href: contactHref },
      ];

  const servicesList = isAr
    ? [
        "وكلاء الذكاء الاصطناعي والأتمتة",
        "استشارات واستراتيجيات AI",
        "تطوير الويب وتطبيقات الجوال",
        "مراكز الاتصال والدردشة الذكية",
        "دمج وتدريب نماذج LLM المخصصة",
      ]
    : [
        "AI Agents & Automation",
        "AI Consulting & Strategy",
        "Full-stack Web & App Dev",
        "AI Chat & Call Center",
        "Custom LLM Integration",
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen bg-[#060913] text-white flex flex-col justify-between overflow-x-clip font-sans"
    >
      {/* Architectural Sweeping Ribbon & Dashed Grid Background */}
      <CurvedRibbonBackground theme={theme} />

      {/* Ambient Wave Particles */}
      <AmbientWaveParticles theme={theme} />

      {/* 1. Sticky Header / Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#060913]/90 backdrop-blur-xl border-b border-white/[0.04] transition-all duration-300">
        <div className="py-2.5 sm:py-3 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link href={isAr ? "/" : "/?lang=en"} className="flex items-center group cursor-pointer">
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 lg:h-10 lg:w-48 transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/tahseen-logo.png"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 144px, 192px"
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links & Controls */}
          <div className="hidden md:flex items-center gap-4 lg:gap-7">
            <nav className="flex items-center gap-4 lg:gap-7 text-xs font-semibold tracking-wider text-gray-200">
              {navLinks.map((link) => {
                const isActive = link.href === contactHref;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-1 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#008688] font-bold"
                        : "text-gray-300 hover:text-[#008688]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#008688] rounded-full shadow-[0_0_8px_rgba(0,134,136,0.8)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Little Theme Switch Slider */}
            <button
              onClick={toggleTheme}
              type="button"
              dir="ltr"
              role="switch"
              aria-checked={isLight}
              aria-label={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className="relative inline-flex items-center w-12 h-6 p-0.5 rounded-full border border-white/20 bg-white/10 transition-colors duration-300 cursor-pointer flex-shrink-0"
            >
              <div className="w-full flex justify-between items-center px-1 text-xs select-none pointer-events-none">
                <Sun className={`w-3 h-3 ${isLight ? "text-amber-500 opacity-100" : "text-gray-400 opacity-40"}`} />
                <Moon className={`w-3 h-3 ${!isLight ? "text-cyan-300 opacity-100" : "text-gray-400 opacity-40"}`} />
              </div>
              <span
                style={{ left: "2px" }}
                className={`absolute top-0.5 bottom-0.5 w-5 h-5 rounded-full bg-[#008688] shadow-xs flex items-center justify-center text-[#060913] transition-transform duration-300 transform ${
                  isLight ? "translate-x-0" : "translate-x-6"
                }`}
              >
                {isLight ? <Sun className="w-3 h-3 text-[#060913]" /> : <Moon className="w-3 h-3 text-[#060913]" />}
              </span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#008688]/40 text-gray-200 hover:text-[#008688] transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#008688]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            <Link
              href={contactHref}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>{isAr ? "تحدث معنا" : "LET'S TALK"}</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Little Theme Slider */}
            <button
              onClick={toggleTheme}
              type="button"
              dir="ltr"
              aria-label="Toggle theme"
              className="relative inline-flex items-center w-11 h-5.5 p-0.5 rounded-full border border-white/20 bg-white/10 transition-colors"
            >
              <div className="w-full flex justify-between items-center px-1 text-[10px] select-none pointer-events-none">
                <Sun className={`w-2.5 h-2.5 ${isLight ? "text-amber-500" : "text-gray-400 opacity-40"}`} />
                <Moon className={`w-2.5 h-2.5 ${!isLight ? "text-cyan-300" : "text-gray-400 opacity-40"}`} />
              </div>
              <span
                style={{ left: "2px" }}
                className={`absolute top-0.5 bottom-0.5 w-4.5 h-4.5 rounded-full bg-[#008688] shadow-xs flex items-center justify-center text-[#060913] transition-transform duration-300 transform ${
                  isLight ? "translate-x-0" : "translate-x-5"
                }`}
              >
                {isLight ? <Sun className="w-2.5 h-2.5" /> : <Moon className="w-2.5 h-2.5" />}
              </span>
            </button>

            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/[0.04] border border-white/10 text-gray-200 hover:text-[#008688]"
            >
              <Globe className="w-3 h-3 text-[#008688]" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white hover:text-[#008688] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#060913]/98 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-2xl">
            <nav className="flex flex-col space-y-3 text-sm font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-white/5 text-gray-200 hover:text-[#008688] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowRight className={`w-3.5 h-3.5 text-gray-500 ${isAr ? "rotate-180" : ""}`} />
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* 2. Main Contact Form & Details Section */}
      <main className="relative z-10 py-10 sm:py-20 px-4 sm:px-8 lg:px-16 max-w-[1400px] mx-auto w-full flex-1">
        
        {/* Header Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? "تحدث مع خبراء الذكاء الاصطناعي" : "LET'S TALK AI SOLUTIONS"}</span>
          </div>
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {isAr ? (
              <>
                ابدأ رحلة <span className="text-[#008688]">التحول بالذكاء الاصطناعي</span>
              </>
            ) : (
              <>
                Start Your <span className="text-[#008688]">AI Transformation</span>
              </>
            )}
          </h1>
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? "جاهز لأتمتة تدفقات العمل اليدوية، وتدشين وكلاء مبيعات أذكياء، أو استشارة فريقنا المتخصص؟ شاركنا تفاصيل مشروعك أدناه."
              : "Ready to automate manual workflows, deploy intelligent sales agents, or consult on enterprise AI strategy? Tell us about your project below."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] text-start">
            {formSubmitted ? (
              <div className="py-12 sm:py-16 text-center space-y-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#008688]/10 border border-[#008688] text-[#008688] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,134,136,0.3)]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                    {isAr ? "تم استلام رسالتك بنجاح!" : "Message Received!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    {isAr ? (
                      <>
                        شكراً لك، <span className="text-white font-semibold">{formData.fullName}</span>. سيقوم فريقنا الهندسي في الرياض بمراجعة تفاصيل مشروعك والتواصل معك عبر البريد <span className="text-[#008688]">{formData.email}</span> خلال ٢٤ ساعة عمل.
                      </>
                    ) : (
                      <>
                        Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Our AI engineering team in Riyadh will review your project details and get back to you at <span className="text-[#008688]">{formData.email}</span> within 24 business hours.
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg btn-teal-outline text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {isAr ? "إرسال استفسار آخر" : "Send Another Inquiry"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "الاسم الكامل" : "Your Name"} <span className="text-[#008688]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isAr ? "مثال: سلطان العتيبي" : "e.g. Sultan Al-Otaibi"}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#008688] focus:ring-1 focus:ring-[#008688] transition-colors text-sm"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "البريد الإلكتروني للعمل" : "Work Email"} <span className="text-[#008688]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sultan@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#008688] focus:ring-1 focus:ring-[#008688] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "الشركة / المؤسسة" : "Company / Organization"}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? "مثال: مجموعة النخبة" : "e.g. Al-Nokhba Group"}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#008688] focus:ring-1 focus:ring-[#008688] transition-colors text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                      {isAr ? "رقم الجوال" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      placeholder="+966 5X XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#008688] focus:ring-1 focus:ring-[#008688] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div className="space-y-1.5">
                  <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {isAr ? "الخدمة المطلوبة" : "Service of Interest"}
                  </label>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {servicesList.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          formData.service === svc
                            ? "bg-[#008688] text-white shadow-[0_0_15px_rgba(0,134,136,0.4)]"
                            : "bg-white/[0.04] text-gray-300 border border-white/10 hover:border-white/30"
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[11px] sm:text-xs font-bold text-gray-300 uppercase tracking-wider">
                    {isAr ? "تفاصيل وأهداف المشروع" : "Project Details & Goals"} <span className="text-[#008688]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={
                      isAr
                        ? "صف لنا تدفقات العمل الحالية، وأهدافك، أو التحديات التي ترغب في حلها بالذكاء الاصطناعي..."
                        : "Describe your workflows, goals, or what challenges you want to solve with AI..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#008688] focus:ring-1 focus:ring-[#008688] transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#008688] text-white hover:brightness-110 font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[0_4px_25px_rgba(0,134,136,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
                  <span>{isAr ? "إرسال طلب المشروع ←" : "SEND INQUIRY →"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6 text-start">
            
            {/* Direct Contact Card */}
            <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1f24] via-[#07131a] to-[#060913] border border-[#008688]/30 space-y-5 shadow-[0_12px_40px_rgba(0,134,136,0.1)]">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {isAr ? "معلومات التواصل المباشر" : "Direct Contact Details"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href="mailto:info@tahseenai.com"
                  className="flex items-center gap-3 text-gray-300 hover:text-[#008688] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "البريد الإلكتروني المباشر" : "Direct Email"}
                    </div>
                    <div className="font-semibold text-white">info@tahseenai.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "المقر الرئيسي" : "Headquarters"}
                    </div>
                    <div className="font-semibold text-white">
                      {isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, Kingdom of Saudi Arabia"}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-9 h-9 rounded-xl bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">
                      {isAr ? "ساعات الاستجابة" : "Working Hours"}
                    </div>
                    <div className="font-semibold text-white">
                      {isAr ? "الأحد – الخميس (الرد خلال ٢٤ ساعة)" : "Sunday – Thursday (Response in <24 hrs)"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Commitment */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
              <div className="flex items-center gap-2 text-[#008688] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? "التزامنا تجاه المجتمع السعودي" : "National Impact Pledge"}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {isAr ? (
                  <>
                    نلتزم بالتبرع بنسبة <strong className="text-white">١٪ من عوائد أعمالنا</strong> لصالح <strong className="text-[#008688]">منصة إحسان (Ehsan Platform)</strong> لدعم المبادرات الخيرية في المملكة.
                  </>
                ) : (
                  <>
                    We proudly donate <strong className="text-white">1% of all revenue</strong> to the <strong className="text-[#008688]">Ehsan Platform (منصة إحسان)</strong> to support social development across Saudi Arabia.
                  </>
                )}
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* 3. Enterprise Footer */}
      <Footer lang={lang} theme={theme} />

    </div>
  );
}
