"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Mail,
  BarChart3,
  TrendingUp,
  Quote,
  Star,
  Workflow,
  LineChart,
  Users,
  HelpCircle,
  Globe,
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Compass,
  ExternalLink,
  Cpu,
  ShieldCheck,
  UserCheck,
  Code2,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CurvedRibbonBackground from "@/components/CurvedRibbonBackground";

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("en");
  const isAr = lang === "ar";
  const contactHref = isAr ? "/contact?lang=ar" : "/contact";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSolutionIdx, setActiveSolutionIdx] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("home");

  // NEXUS Studio-Style Scroll State Tracking
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY || window.pageYOffset || 0;
          setScrollY(currentY);

          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            setScrollProgress(Math.min(1, Math.max(0, currentY / totalHeight)));
          }

          // Track active nav section during scroll
          const sectionIds = ["about", "education", "solutions", "services", "home"];
          const scrollPos = currentY + 250;
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (el) {
              const docTop = el.getBoundingClientRect().top + currentY;
              if (scrollPos >= docTop) {
                setActiveSection(id);
                break;
              }
            }
          }

          // Track active solution card during scroll as right column moves
          const solIds = ["solution-01", "solution-02", "solution-03"];
          const triggerY = window.innerHeight * 0.45;
          solIds.forEach((id, idx) => {
            const card = document.getElementById(id);
            if (card) {
              const rect = card.getBoundingClientRect();
              if (rect.top <= triggerY && rect.bottom >= triggerY) {
                setActiveSolutionIdx(idx);
              }
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        localStorage.removeItem("tahseen_theme");
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

  const navLinks = isAr
    ? [
        { name: "الرئيسية", href: "#home" },
        { name: "خدماتنا", href: "#services" },
        { name: "الحلول", href: "#solutions" },
        { name: "تحسين التعليمية", href: "#education" },
        { name: "من نحن", href: "#about" },
        { name: "اتصل بنا", href: contactHref },
      ]
    : [
        { name: "HOME", href: "#home" },
        { name: "SERVICES", href: "#services" },
        { name: "SOLUTIONS", href: "#solutions" },
        { name: "EDUCATION", href: "#education" },
        { name: "ABOUT US", href: "#about" },
        { name: "CONTACT", href: contactHref },
      ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.replace("#", "");
      setActiveSection(targetId);
      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };

  const showcaseSolutions = isAr
    ? [
        {
          id: "solution-01",
          step: "٠١",
          total: "٠٣",
          tag: "المبيعات والدعم",
          title: "وكلاء المبيعات والدعم",
          subtitle: "ردود سريعة وتأهيل للعملاء على مدار الساعة.",
          desc: "يعمل عبر واتساب والموقع والبريد للإجابة على الأسئلة، وحجز المواعيد، وتحويل العملاء المؤهلين لفريقك مباشرة.",
          metrics: [
            { label: "نمو المبيعات", val: "٣ أضعاف" },
            { label: "سرعة الرد", val: "< ١٠ ثوانٍ" },
            { label: "التواجد", val: "٢٤/٧" },
          ],
          features: [
            "ربط مباشر مع واتساب والمحادثة الحية",
            "حجز المواعيد وتحديث التقويم تلقائياً",
            "تأهيل العملاء ونقل بياناتهم للـ CRM",
          ],
          icon: <UserCheck className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-02",
          step: "٠٢",
          total: "٠٣",
          tag: "أتمتة العمليات",
          title: "أتمتة العمليات",
          subtitle: "اربط برامجك وتوقف عن إدخال البيانات يدوياً.",
          desc: "مزامنة مستمرة بين برامج الـ ERP وقواعد البيانات لمنع تكرار الإدخال اليدوي وتقليص الأخطاء.",
          metrics: [
            { label: "تقليص العمل اليدوي", val: "-٤٢٪" },
            { label: "دقة البيانات", val: "٩٩.٩٪" },
            { label: "مدة الإطلاق", val: "١٤ يوماً" },
          ],
          features: [
            "قراءة واستخراج بيانات الفواتير والمستندات آلياً",
            "مزامنة مستمرة مع برامج الـ ERP وقواعد البيانات",
            "مسارات موافقة واضحة مع سجل متابعة دقيق",
          ],
          icon: <Workflow className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-03",
          step: "٠٣",
          total: "٠٣",
          tag: "التحليلات والمتابعة",
          title: "لوحات المتابعة الحية",
          subtitle: "متابعة دقيقة لحجم العمل وجودة النتائج.",
          desc: "شاهد سرعة الاستجابة، ورضا العملاء، وأداء كل مسار عمل مباشرة دون تخمين.",
          metrics: [
            { label: "سرعة الاستجابة", val: "~٠.٤ ثانية" },
            { label: "نسبة الاستقرار", val: "٩٩.٩٨٪" },
            { label: "الالتزام", val: "١٠٠٪" },
          ],
          features: [
            "لوحات تحكم واضحة لكل مسار عمل",
            "تنبيهات فورية عند الحاجة لأي تدخل",
            "مؤشرات لقياس الأداء ومعدلات الإنجاز",
          ],
          icon: <LineChart className="w-6 h-6 text-[#008688]" />,
        },
      ]
    : [
        {
          id: "solution-01",
          step: "01",
          total: "03",
          tag: "SALES & SUPPORT",
          title: "Sales & Support Agents",
          subtitle: "Fast answers and lead qualification around the clock.",
          desc: "Deploys on WhatsApp, web chat, and email to qualify buyers and book meetings directly on your calendar.",
          metrics: [
            { label: "Sales Growth", val: "3X Faster" },
            { label: "Response Time", val: "< 10s" },
            { label: "Availability", val: "24/7" },
          ],
          features: [
            "Direct WhatsApp and web chat integration",
            "Automated calendar booking and CRM sync",
            "Fast lead qualification and handoff",
          ],
          icon: <UserCheck className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-02",
          step: "02",
          total: "03",
          tag: "OPERATIONS",
          title: "Process Automation",
          subtitle: "Connect your tools and stop copying data by hand.",
          desc: "Syncs your ERP, CRM, and databases to eliminate repetitive data entry and reduce errors.",
          metrics: [
            { label: "Manual Work Cut", val: "-42%" },
            { label: "Data Accuracy", val: "99.9%" },
            { label: "Setup Time", val: "14 Days" },
          ],
          features: [
            "Automated document and invoice processing",
            "Reliable two-way sync with ERP databases",
            "Clear approval flows with full audit trails",
          ],
          icon: <Workflow className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-03",
          step: "03",
          total: "03",
          tag: "ANALYTICS",
          title: "Live Analytics",
          subtitle: "Track volume, speed, and accuracy in real time.",
          desc: "Monitor response times and resolution rates across every channel without guesswork.",
          metrics: [
            { label: "Response Speed", val: "~0.4s" },
            { label: "Uptime", val: "99.98%" },
            { label: "Security", val: "100%" },
          ],
          features: [
            "Live activity and volume tracking",
            "Instant alerts when tasks need attention",
            "Clear performance metrics for your team",
          ],
          icon: <LineChart className="w-6 h-6 text-[#008688]" />,
        },
      ];

  const scrollToSolution = (id: string, index: number) => {
    setActiveSolutionIdx(index);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const testimonials = isAr
    ? [
        {
          quote: "أتمتت تحسين تصنيف طلباتنا في أسبوعين، واختصرت ساعات من العمل اليدوي اليومي.",
          author: "أحمد المطيري",
          role: "مدير العمليات",
          company: "فيوتشر تيك",
          metrics: "-٤٢٪ عمل يدوي",
        },
        {
          quote: "يجيب وكيل الواتساب على العملاء فوراً على مدار الساعة، ويوجه المؤهلين للمبيعات بدقة.",
          author: "سارة الحربي",
          role: "مديرة النمو",
          company: "داتا بلس",
          metrics: "رد فوري < ١٠ ثوانٍ",
        },
        {
          quote: "قلصت الأتمتة وقت الاستجابة لثوانٍ معدودة، وارتفعت مبيعاتنا بشكل ملحوظ من أول شهر.",
          author: "خالد الغامدي",
          role: "الرئيس التنفيذي",
          company: "كلاود سفير",
          metrics: "+٤٥٪ زيادة المبيعات",
        },
      ]
    : [
        {
          quote: "Tahseen automated our intake in two weeks, cutting hours of daily manual work.",
          author: "Ahmed Al-Mutairi",
          role: "Head of Operations",
          company: "FutureTech KSA",
          metrics: "-42% Manual Work",
        },
        {
          quote: "Our WhatsApp agent answers customers 24/7 and routes qualified leads directly to sales.",
          author: "Sarah Al-Harbi",
          role: "Growth Director",
          company: "DataPlus",
          metrics: "Sub-10s Response",
        },
        {
          quote: "Automated workflows cut our response time to seconds, boosting sales from month one.",
          author: "Khaled Al-Ghamdi",
          role: "CEO",
          company: "CloudSphere",
          metrics: "+45% Conversion Lift",
        },
      ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const faqs = isAr
    ? [
        {
          q: "ما هي تحسين للذكاء الاصطناعي؟",
          a: "شركة تقنية سعودية تبني وكلاء ذكاء اصطناعي وأنظمة أتمتة تلغي المهام اليدوية وتختصر الوقت.",
        },
        {
          q: "ما هي الخدمات الأساسية التي تقدمونها؟",
          a: "وكلاء مبيعات ودعم 24/7، أتمتة مسارات العمل وربط الأنظمة، تطوير برمجيات مخصصة، واستشارات تبني الذكاء الاصطناعي.",
        },
        {
          q: "كيف تساعد حلول تحسين منشأتي؟",
          a: "نقلص تكاليف التشغيل وساعات العمل اليومية برد فوري على العملاء ومزامنة البيانات بين أنظمتك بلا أخطاء.",
        },
        {
          q: "هل يمكن تخصيص الذكاء الاصطناعي ليتحدث بأسلوب شركتنا؟",
          a: "نعم، ندرب الوكيل على بيانات خدماتك وهويتك ليتحدث بأسلوب فريقك ويتصل بأنظمتك مباشرة.",
        },
        {
          q: "هل تقدمون خدماتكم للشركات الناشئة؟",
          a: "نعم، نقدم حلولنا للشركات الناشئة والمنشآت الكبرى بنطاق عمل يناسب احتياجك وميزانيتك.",
        },
      ]
    : [
        {
          q: "What is Tahseen AI?",
          a: "A Saudi tech company building AI agents and automations that eliminate manual work and save operational time.",
        },
        {
          q: "What services do you offer?",
          a: "24/7 sales and support agents, workflow automation, ERP integrations, custom software development, and AI consulting.",
        },
        {
          q: "How does Tahseen AI help my business?",
          a: "We cut operating costs and manual hours with instant customer responses and error-free data synchronization.",
        },
        {
          q: "Can the AI match our company brand and voice?",
          a: "Yes. Agents are trained on your company data and brand voice to communicate naturally and accurately.",
        },
        {
          q: "Do you work with startups?",
          a: "Yes. We tailor our deployments for startups, SMEs, and enterprises based on your exact budget and workflow.",
        },
      ];

  const basePillsRow1 = isAr
    ? [
        "تقارير مباشرة",
        "رد سريع للعملاء",
        "ربط سهل للأنظمة",
        "دقة في البيانات",
        "أتمتة المهام اليومية",
        "جاهزية على مدار الساعة",
      ]
    : [
        "Live Reports",
        "Fast Responses",
        "Easy Integrations",
        "Accurate Data",
        "Automated Tasks",
        "24/7 Availability",
      ];

  const basePillsRow2 = isAr
    ? [
        "تقليص العمل اليدوي",
        "توفير التكاليف",
        "قرارات أوضح",
        "خدمة عملاء أسرع",
        "سلاسل عمل منظمة",
      ]
    : [
        "Less Manual Work",
        "Lower Costs",
        "Clearer Decisions",
        "Faster Support",
        "Organized Workflows",
      ];

  const pillsRow1 = [
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
    ...basePillsRow1,
  ];
  const pillsRow2 = [
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
    ...basePillsRow2,
  ];

  // NEXUS Studio-Style Hero Scroll Parallax & Fade
  const heroProgress = Math.min(1, Math.max(0, scrollY / 520));
  const heroOpacity = Math.max(0, 1 - heroProgress * 1.25);
  const heroScale = 1 - heroProgress * 0.08;
  const heroTranslateY = heroProgress * 100;

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col justify-between overflow-x-clip font-sans bg-[#0d1426] text-white"
    >
      {/* NEXUS Studio-Style Top Scroll Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#008688] z-[100] origin-left pointer-events-none transition-transform duration-75 ease-out shadow-[0_0_10px_rgba(0,134,136,0.8)]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* 1. Sticky Header / Navbar (Locked to Dark Aesthetic in Both Modes) */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/[0.06] bg-[#0d1426]/92 text-white transition-all duration-300">
        <div className="py-2.5 sm:py-3 px-4 sm:px-8 lg:px-16 xl:px-24 max-w-[1500px] mx-auto w-full flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 lg:h-10 lg:w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/tahseen-logo.png?v=4"
                alt="Tahseen AI"
                fill
                sizes="(max-width: 640px) 144px, 192px"
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links & Controls (Adaptive: Visible on Large Screens and Above) */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            <nav className="flex items-center gap-3.5 xl:gap-6 text-xs font-semibold tracking-wider text-gray-300">
              {navLinks.map((link) => {
                const isSectionActive = link.href === `#${activeSection}`;
                return link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative py-1 transition-all duration-200 cursor-pointer ${
                      isSectionActive
                        ? "text-[#008688] font-bold"
                        : "text-gray-300 hover:text-[#008688]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isSectionActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#008688] rounded-full shadow-[0_0_8px_rgba(0,134,136,0.8)]" />
                    )}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`relative py-1 transition-all duration-200 cursor-pointer ${
                      isSectionActive
                        ? "text-[#008688] font-bold"
                        : "text-gray-300 hover:text-[#008688]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isSectionActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#008688] rounded-full shadow-[0_0_8px_rgba(0,134,136,0.8)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#008688]/40 text-gray-200 hover:text-[#008688] transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#008688]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            {/* Contact Action Button */}
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center px-4 xl:px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>{isAr ? "تحدث معنا" : "LET'S TALK"}</span>
            </Link>
          </div>

          {/* Mobile & Tablet Right Controls: Language, Talk & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-md bg-white/[0.04] border border-white/10 text-gray-200 hover:text-[#008688]"
            >
              <Globe className="w-3 h-3 text-[#008688]" />
              <span>{isAr ? "EN" : "عربي"}</span>
            </button>

            <Link
              href={contactHref}
              className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-md btn-teal-outline"
            >
              <span>{isAr ? "تواصل" : "TALK"}</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-white hover:text-[#008688] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Slide-Down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0d1426]/98 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 text-sm font-bold">
              {navLinks.map((link) => {
                const isSectionActive = link.href === `#${activeSection}`;
                return link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 border-b border-white/5 transition-colors flex items-center justify-between ${
                      isSectionActive ? "text-[#008688] font-bold" : "text-gray-200 hover:text-[#008688]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSectionActive ? "text-[#008688]" : "text-gray-500"} ${isAr ? "rotate-180" : ""}`} />
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`py-2.5 border-b border-white/5 transition-colors flex items-center justify-between ${
                      isSectionActive ? "text-[#008688] font-bold" : "text-gray-200 hover:text-[#008688]"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSectionActive ? "text-[#008688]" : "text-gray-500"} ${isAr ? "rotate-180" : ""}`} />
                  </a>
                );
              })}
            </nav>

            <div className="pt-2">
              <Link
                href={contactHref}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3 text-xs font-bold tracking-widest uppercase rounded-xl bg-[#008688] text-white shadow-[0_4px_20px_rgba(0,134,136,0.4)]"
              >
                <span>{isAr ? "ابدأ مشروعك معنا ←" : "LET'S TALK / CONTACT →"}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <main
        id="home"
        style={{ minHeight: "calc(100dvh - 65px)" }}
        className="relative z-10 pt-14 sm:pt-18 lg:pt-22 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-16 max-w-[1680px] mx-auto w-full flex flex-col justify-between"
      >
        
        {/* 3D Canvas Layer */}
        <HeroRing3D mirrored={isAr} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center min-h-[360px] sm:min-h-[400px] lg:min-h-[420px] pointer-events-none">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 lg:space-y-7 text-start pointer-events-auto">
            
            {/* Primary Headline */}
            <ScrollReveal priority y={35} duration={1100} delay={100}>
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] xl:text-[58px] 2xl:text-[62px] font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                {isAr ? (
                  <>
                    حلول ذكاء اصطناعي <br />
                    <span className="text-[#008688]">تُعزز</span> وتطوّر أعمالك
                  </>
                ) : (
                  <>
                    AI Solutions That <br />
                    <span className="text-[#008688]">Enhance</span> Your Work
                  </>
                )}
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal priority y={35} duration={1100} delay={250}>
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-300 leading-[1.65] font-normal max-w-sm sm:max-w-md">
                {isAr
                  ? "نبني وكلاء ذكاء اصطناعي وأنظمة أتمتة تنجز أعمالك اليومية بسرعة ودقة."
                  : "We build AI agents and automations that eliminate routine work for your business."}
              </p>
            </ScrollReveal>

            {/* Primary CTA Button */}
            <ScrollReveal priority y={35} duration={1100} delay={380}>
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3.5">
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer group"
                >
                  <span>{isAr ? "لنبنِ معاً" : "LET'S BUILD TOGETHER"}</span>
                  <ArrowRight className={`w-4 h-4 text-[#008688] transition-transform duration-300 group-hover:translate-x-1 ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </Link>
              </div>
            </ScrollReveal>

          </div>

          {/* Right Empty Spacing for 3D Ring */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6 h-[340px] sm:h-[380px]" />

        </div>
      </main>

      {/* Rest of the Page (Excludes Hero) — Architectural Sweeping Ribbon & Dashed Grid Background */}
      <div className="relative w-full overflow-x-clip bg-[#0f1629] border-t border-white/[0.08]">
        <CurvedRibbonBackground />

        {/* 3. Core 4 Services (Dedicated Separate Section under Hero) */}
        <section id="services" className="relative z-10 py-10 sm:py-14 px-4 sm:px-8 lg:px-16 max-w-[1500px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28">
        
        {/* Section Heading */}
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <span>{isAr ? "خدماتنا" : "SERVICES"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isAr ? (
                <>
                  خدماتنا <span className="text-[#008688]">الأساسية</span>
                </>
              ) : (
                <>
                  Our Core <span className="text-[#008688]">Services</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal">
              {isAr
                ? "أنظمة أتمتة وبرمجيات ترفع كفاءة عملياتك وتلغي الهدر."
                : "Automations and software built to eliminate operational bottlenecks."}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Sharp Bento Service Cards with Clean Solid Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: AI Agents */}
          <ScrollReveal delay={0} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "رد فوري على العملاء، وتأهيل المبيعات، ودعم مستمر 24/7."
                  : "Instant customer responses, lead qualification, and 24/7 support."}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: Automation */}
          <ScrollReveal delay={120} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "أتمتة العمليات" : "Automation"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "ربط الأنظمة وبرامج الـ ERP لإلغاء الإدخال والمهام المتكررة."
                  : "Seamless system and ERP integrations that eliminate repetitive work."}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3: Consulting */}
          <ScrollReveal delay={240} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "استشارات الذكاء الاصطناعي" : "Consulting"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "خارطة طريق واضحة لتبني الذكاء الاصطناعي بعائد استثماري ملموس."
                  : "Actionable roadmaps to deploy AI where it drives measurable ROI."}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4: Development */}
          <ScrollReveal delay={360} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "التطوير المخصص" : "Development"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "تطبيقات ويب وجوال متطورة وقابلة للتوسع وفق احتياجاتك."
                  : "Scalable web and mobile applications tailored to your business."}
              </p>
            </div>
          </ScrollReveal>

        </div>

      </section>

      {/* 6. SOLUTIONS SHOWCASE WITH STICKY SCROLL EFFECT & BENTO BOXES ON ONE SIDE */}
      <section id="solutions" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Sticky Section Overview & Interactive Step Navigation */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-6 text-start">
            <ScrollReveal y={40} duration={1100}>
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isAr ? "الحلول" : "SOLUTIONS"}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {isAr ? (
                    <>
                      حلول مخصصة <br className="hidden sm:inline" />
                      <span className="text-[#008688]">لفرق العمل</span>
                    </>
                  ) : (
                    <>
                      AI Built for <br className="hidden sm:inline" />
                      <span className="text-[#008688]">Your Team</span>
                    </>
                  )}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {isAr
                    ? "أدوات عملية تختصر المهام الروتينية ليركز فريقك على الأهم."
                    : "Practical tools that cut routine tasks so your team can focus on what matters."}
                </p>
              </div>
            </ScrollReveal>

            {/* Interactive Step Jump Buttons (Adaptive: Horizontal Pills on Mobile, Sticky Vertical Stack on Desktop) */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pt-2 pb-1 lg:pb-0 scrollbar-none">
              {showcaseSolutions.map((sol, idx) => (
                <button
                  key={sol.id}
                  onClick={() => scrollToSolution(sol.id, idx)}
                  className={`flex-shrink-0 lg:w-full p-2.5 sm:p-3.5 rounded-md border text-start transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                    activeSolutionIdx === idx
                      ? "bg-white/[0.06] border-[#008688] text-white shadow-[0_0_15px_rgba(0,134,136,0.15)]"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-mono text-xs font-bold text-[#008688]">{sol.step}</span>
                    <span className="text-xs font-bold font-sans whitespace-nowrap lg:whitespace-normal">{sol.title}</span>
                  </div>
                  <ArrowRight className={`hidden sm:inline w-3.5 h-3.5 text-[#008688] transition-transform ${activeSolutionIdx === idx ? "translate-x-1" : "opacity-40"} ${isAr ? "rotate-180" : ""}`} />
                </button>
              ))}
            </div>

            {/* Direct Contact Button */}
            <div className="pt-2">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
              >
                <span>{isAr ? "احجز استشارتك الآن" : "LET'S TALK"}</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          </div>

          {/* Right Column: Vertically Stacked Sharp Bento Solution Cards */}
          <div className="lg:col-span-7 space-y-6">
            {showcaseSolutions.map((sol, idx) => (
              <ScrollReveal key={sol.id} delay={idx * 100} y={45} duration={1100}>
                <div
                  id={sol.id}
                  onMouseEnter={() => setActiveSolutionIdx(idx)}
                  className={`p-6 sm:p-8 md:p-10 sharp-bento space-y-6 text-start transition-all duration-300 ${
                    activeSolutionIdx === idx ? "border-[#008688]/60 shadow-[0_10px_35px_rgba(0,134,136,0.12)]" : ""
                  }`}
                >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center">
                      {sol.icon}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-[#008688] block">{sol.tag}</span>
                      <span className="text-[11px] text-gray-400 font-mono">Stage {sol.step} of {sol.total}</span>
                    </div>
                  </div>
                  <span className="font-mono text-lg font-bold text-gray-500">{sol.step}</span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-[#008688] font-medium">{sol.subtitle}</p>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal pt-1">{sol.desc}</p>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  {sol.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#008688] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Metric Badges */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 border-t border-white/10 text-center font-mono">
                  {sol.metrics.map((m) => (
                    <div key={m.label} className="p-2 sm:p-2.5 rounded-md bg-white/[0.02] border border-white/10 flex flex-col justify-center">
                      <div className="text-xs sm:text-sm font-bold text-[#008688]">{m.val}</div>
                      <div className="text-[9px] sm:text-[10px] text-gray-400 leading-tight mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </section>

      {/* 7. Value Marquee */}
      <section dir="ltr" className="relative z-10 py-12 sm:py-16 overflow-hidden border-t border-b border-white/[0.08] bg-white/[0.02] select-none">
        <div className="space-y-4">
          <div className="flex gap-4 animate-marquee-left">
            {pillsRow1.map((pill, idx) => (
              <div
                key={`p1-${idx}`}
                className="marquee-teal-pill flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-bold tracking-wide border border-[#008688] bg-[#008688] text-white shadow-[0_4px_15px_rgba(0,134,136,0.25)] hover:scale-105 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
          <div className="flex gap-4 animate-marquee-right">
            {pillsRow2.map((pill, idx) => (
              <div
                key={`p2-${idx}`}
                className="marquee-teal-pill flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-bold tracking-wide border border-[#008688] bg-[#008688] text-white shadow-[0_4px_15px_rgba(0,134,136,0.25)] hover:scale-105 transition-all select-none cursor-default"
              >
                {pill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Tahseen Education (Flagship Ecosystem Highlight) */}
      <section id="education" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-transparent">
        
        {/* Section Tag */}
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,134,136,0.15)]">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{isAr ? "تحسين التعليمية" : "TAHSEEN EDUCATION"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isAr ? (
                <>
                  تمكين <span className="text-[#008688]">الشباب</span>
                </>
              ) : (
                <>
                  Youth <span className="text-[#008688]">Empowerment</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
              {isAr
                ? "منصة واحدة لطلاب المرحلة الثانوية في السعودية للاستعداد لاختبارات القدرات والتحصيلي وتحديد المسار الجامعي."
                : "One platform for Saudi high school students to prepare for Qudurat and Tahsili, and plan their university path."}
            </p>
          </div>
        </ScrollReveal>

        {/* Sharp Highlight Card */}
        <ScrollReveal y={45} delay={100} duration={1100}>
          <div className="relative rounded-md p-6 sm:p-10 lg:p-12 sharp-bento border-2 border-[#008688] shadow-[0_20px_60px_rgba(0,134,136,0.22)] mb-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-start">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-md bg-[#008688] text-white text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider uppercase">
                  {isAr ? "المنصة التعليمية • edutahseen.com" : "EDUCATION • EDUTAHSEEN.COM"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "٤,٣٠٠+ طالب وطالبة" : "4,300+ Students"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "معايير قياس الرسمية" : "Official Qiyas Standards"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {isAr
                    ? "أدوات متطورة لاجتياز الاختبارات"
                    : "Advanced Tools to Master Your Exams"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {isAr
                    ? "تدريب مخصص، وتتبع دقيق لنقاط القوة والتحسين، ونماذج محاكية للاختبارات الرسمية."
                    : "Adaptive practice, real exam simulations, and personalized progress tracking."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "المعلم الذكي" : "AI Smart Tutor"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "شرح فوري وتدريب مخصص لكل طالب" : "Personalized step-by-step guidance"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "تقارير المتابعة" : "Progress Reports"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "متابعة دقيقة لنقاط القوة والتحسين" : "Clear tracking of strengths and focus areas"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "معايير قياس" : "Real Exam Standards"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "تجميعات محدثة ونماذج اختبار محاكية" : "Updated question banks matching official formats"}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 dark-subcard flex flex-col justify-center items-stretch gap-4 p-6 sm:p-8 rounded-md bg-[#060913] border border-white/15 text-center shadow-lg">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#008688] uppercase tracking-widest block font-bold">
                  {isAr ? "منظومة موحدة" : "UNIFIED PLATFORM"}
                </span>
                <div className="text-xl sm:text-2xl font-extrabold !text-white">
                  {isAr ? "حساب واحد لجميع الاختبارات" : "One Account for All Exams"}
                </div>
                <p className="text-[11px] !text-gray-300">
                  {isAr ? "وصول كامل للقدرات والتحصيلي وبوصلتي" : "Full access to Qudurat, Tahsili & Bausalty"}
                </p>
              </div>

              <a
                href="https://edutahseen.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-md text-xs font-extrabold tracking-widest uppercase bg-[#008688] text-white hover:brightness-110 shadow-[0_4px_20px_rgba(0,134,136,0.5)] transition-all cursor-pointer"
              >
                <span>{isAr ? "زيارة منصة تحسين التعليمية" : "VISIT EDUTAHSEEN.COM"}</span>
                <ExternalLink className="w-4 h-4 mx-1.5" />
              </a>
            </div>

          </div>
        </div>
        </ScrollReveal>

        {/* 4 Interactive Educational Platform Cards (No AI Suffix, Dedicated Logos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Platform 1: Tahseen Education */}
          <ScrollReveal delay={0} y={45} duration={1100}>
            <a
              href="https://edutahseen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg bg-white/5 border border-[#008688]/30 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-[0_0_12px_rgba(0,134,136,0.2)]">
                  <Image
                    src="/platforms/tahseen-edu.png"
                    alt="Tahseen Education"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#008688] font-bold uppercase tracking-wider">
                    {isAr ? "المنظومة التعليمية" : "ECOSYSTEM"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#008688] transition-colors">
                    {isAr ? "تحسين التعليمية" : "Tahseen Education"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "المنظومة الشاملة للثانوية والقبول" : "Comprehensive student portal"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#008688] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

          {/* Platform 2: Qudurat */}
          <ScrollReveal delay={90} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/qudurat"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg bg-white/5 border border-[#008688]/30 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-[0_0_12px_rgba(0,134,136,0.2)]">
                  <Image
                    src="/platforms/qudurat.webp"
                    alt="Qudurat Platform"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#008688] font-bold uppercase tracking-wider">
                    {isAr ? "اختبار القدرات" : "EXAM PREP"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#008688] transition-colors">
                    {isAr ? "منصة قدرات" : "Qudurat"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "تدريب تكيفي للكمي واللفظي وتجميعات 1447" : "Adaptive quantitative & verbal prep"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#008688] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

          {/* Platform 3: Tahsili */}
          <ScrollReveal delay={180} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/tahsili"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg bg-white/5 border border-[#38BDF8]/30 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                  <Image
                    src="/platforms/tahsili.webp"
                    alt="Tahsili Platform"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#38BDF8] font-bold uppercase tracking-wider">
                    {isAr ? "التحصيلي العلمي" : "SCIENCE EXAM"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {isAr ? "منصة تحصيلي" : "Tahsili"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "شامل المواد العلمية الأربع مع محاكي قياس" : "Science & math 4-subject mastery"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#38BDF8] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

          {/* Platform 4: Bawsalati */}
          <ScrollReveal delay={270} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/busalati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-lg bg-white/5 border border-[#A855F7]/30 p-1.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-[0_0_12px_rgba(168,85,247,0.2)]">
                  <Image
                    src="/platforms/bawsalati.webp"
                    alt="Bawsalati Assessment"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#A855F7] font-bold uppercase tracking-wider">
                    {isAr ? "تحديد التخصص" : "CAREER RIASEC"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#A855F7] transition-colors">
                    {isAr ? "منصة بوصلتي" : "Bawsalati"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "مقياس هولاند واختيار التخصص الجامعي" : "Major & career guidance"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#A855F7] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

        </div>

      </section>

      {/* 8. Enterprise Social Proof & Partner Logos (Single Row Across All Devices) */}
      <section id="about" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08]">
        
        {/* Centered Heading */}
        <div className="flex items-center justify-center gap-3 sm:gap-8 w-full mb-8 sm:mb-10">
          <div className="hidden sm:block flex-1 border-t border-white/10" />
          <h4 className="text-xs sm:text-base md:text-lg font-bold text-gray-300 text-center tracking-tight leading-relaxed max-w-xl">
            {isAr ? (
              <>موثوق من مؤسسات رائدة في المملكة العربية السعودية</>
            ) : (
              <>Trusted by leading organizations across Saudi Arabia</>
            )}
          </h4>
          <div className="hidden sm:block flex-1 border-t border-white/10" />
        </div>

        {/* Sharp White/Teal Container Box - Single Horizontal Row (3 Columns) */}
        <div className="rounded-md bg-white/[0.96] backdrop-blur-2xl border border-white/20 py-5 px-4 sm:py-7 sm:px-8 shadow-lg max-w-4xl mx-auto transition-all duration-300">
          <div className="grid grid-cols-3 items-center justify-items-center gap-2 sm:gap-6 md:gap-12 w-full">
            
            {/* Logo 1: Zana */}
            <div className="relative h-9 w-20 sm:h-12 sm:w-32 md:h-14 md:w-36 transition-transform duration-300 hover:scale-105">
              <Image
                src="/partners/partner-1.png"
                alt="Zana - Empowering Startups"
                fill
                sizes="(max-width: 640px) 80px, 144px"
                className="object-contain"
              />
            </div>

            {/* Logo 2: Imam Abdulrahman Bin Faisal University */}
            <div className="relative h-9 w-24 sm:h-14 sm:w-44 md:h-16 md:w-52 transition-transform duration-300 hover:scale-105">
              <Image
                src="/partners/partner-2.svg"
                alt="Imam Abdulrahman Bin Faisal University"
                fill
                sizes="(max-width: 640px) 100px, 208px"
                className="object-contain"
              />
            </div>

            {/* Logo 3: ITQAN */}
            <div className="relative h-9 w-20 sm:h-12 sm:w-32 md:h-14 md:w-36 transition-transform duration-300 hover:scale-105">
              <Image
                src="/partners/partner-3.png"
                alt="ITQAN - Driven by Knowledge"
                fill
                sizes="(max-width: 640px) 80px, 144px"
                className="object-contain"
              />
            </div>

          </div>
        </div>

      </section>

      {/* 9. Testimonials */}
      <section id="testimonials" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-white/[0.01]">
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "آراء العملاء" : "TESTIMONIALS"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-center">
              {isAr ? (
                <>
                  ماذا يقول <span className="text-[#008688]">عملاؤنا</span>
                </>
              ) : (
                <>
                  What Our <span className="text-[#008688]">Clients</span> Say
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal text-center">
              {isAr
                ? "آراء فرق العمل التي تستخدم حلول تحسين للذكاء الاصطناعي في السعودية."
                : "Feedback from teams using Tahseen AI to run their daily operations."}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <ScrollReveal key={t.author} delay={idx * 120} y={45} duration={1100}>
              <div className="p-6 sm:p-8 rounded-md sharp-bento flex flex-col justify-between space-y-6 text-start h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#008688]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#008688]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#008688]/10 text-[#008688] text-[10px] font-mono font-bold">
                      {t.metrics}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-bold text-white text-sm">{t.author}</div>
                  <div className="text-[11px] text-gray-400">{t.role} • {t.company}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1000px] mx-auto w-full border-t border-white/[0.08]">
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {isAr ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isAr ? (
                <>
                  الأسئلة <span className="text-[#008688]">الشائعة</span>
                </>
              ) : (
                <>
                  Frequently Asked <span className="text-[#008688]">Questions</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal">
              {isAr
                ? "إجابات واضحة عن أكثر الأسئلة شيوعاً حول خدماتنا وكيفية عملها."
                : "Clear answers to common questions about our services and how we work."}
            </p>
          </div>
        </ScrollReveal>

        {/* All FAQ items rise together as one single unit after the heading */}
        <ScrollReveal delay={280} y={45} duration={1100}>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-md sharp-bento overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-start font-bold text-xs sm:text-base text-white hover:text-[#008688] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#008688] flex-shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#008688] transition-transform duration-300 flex-shrink-0 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 12. Final CTA Banner - Full Screen Width Band Matching Reference Size */}
      <section
        id="cta"
        className="cta-dark-band relative z-10 w-full overflow-hidden bg-gradient-to-r from-[#060913] via-[#091822] to-[#060913] border-y border-[#008688]/35 shadow-[0_10px_60px_rgba(0,134,136,0.15)] text-white py-12 sm:py-16 lg:py-18 px-4 sm:px-8"
      >
        {/* Radial Ambient Luminous Teal Glow in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[260px] bg-[#008688]/15 rounded-full blur-[100px] pointer-events-none -z-0" />

        {/* Faint Architectural Gridlines Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 85%)",
          }}
        />

        <ScrollReveal y={35} duration={1100}>
          <div className="relative z-10 max-w-2xl mx-auto w-full text-center space-y-4">
            
            {/* Live Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#008688]/10 border border-[#008688]/30 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#008688]" />
              </span>
              <span className="text-[#5eead4] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
                {isAr ? "جاهز للبدء؟" : "READY TO START?"}
              </span>
            </div>

            {/* Display Headline */}
            <h2 className="text-2xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.12] text-white">
              {isAr ? (
                <>
                  <span className="text-white">جاهز لأتمتة</span>{" "}
                  <span className="text-[#008688]">أعمالك؟</span>
                </>
              ) : (
                <>
                  <span className="text-white">Ready to Automate</span>{" "}
                  <span className="text-[#008688]">Your Business?</span>
                </>
              )}
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-gray-300 leading-relaxed font-normal max-w-lg mx-auto">
              {isAr
                ? "تحدث معنا لنحدد لك أين يمكن للذكاء الاصطناعي توفير وقت فريقك."
                : "Tell us about your workflow, and we'll show you where AI can save you time."}
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-lg bg-[#008688] text-white hover:brightness-110 shadow-[0_4px_25px_rgba(0,134,136,0.6)] hover:shadow-[0_6px_35px_rgba(0,134,136,0.85)] transition-all cursor-pointer group hover:scale-105"
              >
                <span>{isAr ? "تحدث مع فريقنا" : "TALK TO OUR TEAM"}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </Link>
            </div>

          </div>
        </ScrollReveal>
      </section>
      </div>

      {/* 13. Global Master Footer */}
      <Footer lang={lang} />

    </div>
  );
}
