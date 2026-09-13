"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Mail,
  Activity,
  BarChart3,
  TrendingUp,
  Quote,
  Star,
  Bot,
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
  Check,
} from "lucide-react";
import HeroRing3D from "@/components/HeroRing3D";
import Footer from "@/components/Footer";
import AmbientWaveParticles from "@/components/AmbientWaveParticles";
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
          const sectionIds = ["about", "education", "solutions", "insights", "services", "home"];
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
        { name: "التحليلات", href: "#insights" },
        { name: "الحلول", href: "#solutions" },
        { name: "تحسين التعليمية", href: "#education" },
        { name: "من نحن", href: "#about" },
        { name: "اتصل بنا", href: contactHref },
      ]
    : [
        { name: "HOME", href: "#home" },
        { name: "SERVICES", href: "#services" },
        { name: "INSIGHTS", href: "#insights" },
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
          tag: "العمليات الذاتية",
          title: "وكلاء الذكاء الاصطناعي للمبيعات والتسويق",
          subtitle: "ذكاء اصطناعي تفاعلي متعدد القنوات لتأهيل العملاء وإغلاق الصفقات على مدار الساعة.",
          desc: "انشر وكلاء أذكياء عبر الواتساب والموقع الإلكتروني والبريد للإجابة على الاستفسارات المعقدة، وحجز الاجتماعات في تقويمك، وتحويل العملاء المؤهلين مباشرة.",
          metrics: [
            { label: "نمو أداء المبيعات", val: "٣ أضعاف" },
            { label: "سرعة الاستجابة", val: "< ١٠ ثوانٍ" },
            { label: "التوافر والجاهزية", val: "٢٤/٧ / ٣٦٥" },
          ],
          features: [
            "تكامل مباشر مع الواتساب وبوابات المحادثة الحية",
            "جدولة تلقائية للاجتماعات وتحديث التقويم",
            "تأهيل دقيق للعملاء المحتملين وتمرير البيانات للـ CRM",
          ],
          icon: <Bot className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-02",
          step: "٠٢",
          total: "٠٣",
          tag: "أتمتة العمليات",
          title: "أتمتة العمليات المؤسسية الشاملة",
          subtitle: "القضاء التام على الاختناقات اليدوية عبر مختلف الأقسام والفرق.",
          desc: "اربط أنظمة تخطيط الموارد (ERP)، وقواعد البيانات، والدعم الفني، وبوابات الدفع بقواعد ذكية ذاتية المعالجة تقلص المهام اليدوية بأكثر من ٤٠٪.",
          metrics: [
            { label: "تقليص العمل اليدوي", val: "-٤٢٪" },
            { label: "دقة معالجة البيانات", val: "٩٩.٩٪" },
            { label: "سرعة التدشين", val: "١٤ يوماً" },
          ],
          features: [
            "معالجة واستخراج بيانات المستندات والفواتير آلياً",
            "مزامنة مستمرة مع قواعد بيانات Oracle و SAP",
            "سلاسل موافقات ذكية مع توثيق تدقيق كامل",
          ],
          icon: <Workflow className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-03",
          step: "٠٣",
          total: "٠٣",
          tag: "متابعة فورية",
          title: "المتابعة اللحظية والبيانات الميدانية",
          subtitle: "رؤية كاملة لجميع التفاعلات المؤتمتة وأداء الحملات بدقة عالية.",
          desc: "لوحات تحليلات مباشرة ترصد كفاءة الحملات، ورضا العملاء، ودقة الوكلاء، ونسب التحويل في الوقت الفعلي دون أي تكهنات.",
          metrics: [
            { label: "سرعة الاستجابة", val: "~٠.٤ ثانية" },
            { label: "نسبة التوافر", val: "٩٩.٩٨٪" },
            { label: "الامتثال", val: "١٠٠٪" },
          ],
          features: [
            "لوحات تحكم تفاعلية لرصد كفاءة كل مسار عمل",
            "تنبيهات فورية عند رصد أي اختناق تشغيلي",
            "تحليلات تنبؤية لتحسين تجربة العملاء ونمو الإيرادات",
          ],
          icon: <LineChart className="w-6 h-6 text-[#008688]" />,
        },
      ]
    : [
        {
          id: "solution-01",
          step: "01",
          total: "03",
          tag: "AUTONOMOUS OPERATIONS",
          title: "AI Agents for Sales & Marketing",
          subtitle: "Autonomous multi-channel intelligence that qualifies leads and converts 24/7.",
          desc: "Deploy intelligent agents across WhatsApp, website chat, and email that answer complex inquiries, schedule meetings directly into your calendar, and hand off qualified leads with full context.",
          metrics: [
            { label: "Sales Boost", val: "3X Growth" },
            { label: "Response Time", val: "< 10s" },
            { label: "Availability", val: "24/7 / 365" },
          ],
          features: [
            "Native WhatsApp and live-chat integrations",
            "Automated calendar booking and CRM synchronization",
            "Multi-channel contextual lead qualification",
          ],
          icon: <Bot className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-02",
          step: "02",
          total: "03",
          tag: "WORKFLOW AUTOMATION",
          title: "End-to-End Enterprise Automation",
          subtitle: "Eliminate repetitive manual bottlenecks across cross-functional operations.",
          desc: "Connect your ERP, databases, customer support, and payment gateways with intelligent rules and self-healing automated logic that reduces manual processing by over 40%.",
          metrics: [
            { label: "Manual Work Reduced", val: "-42%" },
            { label: "Data Accuracy", val: "99.9%" },
            { label: "Deployment Speed", val: "14 Days" },
          ],
          features: [
            "Automated document, RFP, and invoice ingestion",
            "Seamless two-way sync with ERP systems",
            "Smart approval chains with complete audit trails",
          ],
          icon: <Workflow className="w-6 h-6 text-[#008688]" />,
        },
        {
          id: "solution-03",
          step: "03",
          total: "03",
          tag: "REAL-TIME TELEMETRY",
          title: "Live Oversight & Actionable Data",
          subtitle: "Complete visibility over every automated interaction and campaign performance.",
          desc: "Live analytics dashboards that track campaign throughput, customer sentiment, agent accuracy, and conversion metrics in real time with zero guesswork.",
          metrics: [
            { label: "Latency", val: "~0.4s" },
            { label: "Uptime", val: "99.98%" },
            { label: "Compliance", val: "100%" },
          ],
          features: [
            "Real-time operational visibility across all workflows",
            "Proactive bottleneck and anomaly alerts",
            "Continuous conversion rate optimization metrics",
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
          quote: "ساهمت تحسين في تبسيط عملياتنا الداخلية — قلصنا أكثر من ٤٠٪ من المهام اليدوية خلال أسابيع قليلة.",
          author: "أحمد المطيري",
          role: "مدير العمليات",
          company: "FutureTech KSA",
          metrics: "تقليص ٤٠٪ من العمل اليدوي",
        },
        {
          quote: "أتمتة الذكاء الاصطناعي كانت سهلة التدشين وساعدتنا على خدمة عملائنا في المملكة بسرعة وثبات فائقين.",
          author: "سارة الحربي",
          role: "رئيسة النمو",
          company: "DataPlus",
          metrics: "٣ أضعاف سرعة الرد",
        },
        {
          quote: "الوكلاء الأذكياء وفروا تجربة تفاعلية مميزة لعملائنا ورفعوا معدلات التحويل المالي بأكثر من ٤٥٪.",
          author: "خالد الغامدي",
          role: "الرئيس التنفيذي",
          company: "CloudSphere",
          metrics: "+٤٥٪ زيادة المبيعات",
        },
      ]
    : [
        {
          quote: "Tahseen streamlined our operations end-to-end — we eliminated repetitive manual workflows in just weeks.",
          author: "Ahmed Al-Mutairi",
          role: "Head of Operations",
          company: "FutureTech KSA",
          metrics: "-42% Manual Workload",
        },
        {
          quote: "The autonomous agent deployment was seamless and allows us to serve enterprise clients across KSA with speed and precision.",
          author: "Sarah Al-Harbi",
          role: "Growth Director",
          company: "DataPlus",
          metrics: "3X Lead Response Time",
        },
        {
          quote: "Tahseen AI delivers incredible ROI and enterprise clarity. Their intelligent workflows increased our conversion rates significantly.",
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
          q: "ما هي مجموعة تحسين للذكاء الاصطناعي (Tahseen AI)؟",
          a: "تحسين هي شركة تقنية سعودية رائدة متخصصة في إعادة تعريف وتطوير العمليات المؤسسية عبر حلول الذكاء الاصطناعي المتقدمة، وأتمتة مسارات العمل، ونظم الوكلاء الأذكياء المستقلة.",
        },
        {
          q: "ما هي أبرز الخدمات التي تقدمها تحسين للذكاء الاصطناعي؟",
          a: "نقدم استشارات واستراتيجيات الذكاء الاصطناعي، وتطوير مواقع وتطبيقات الجوال الذكية، وبناء وكلاء ذكاء اصطناعي للمبيعات والتسويق، وحلول مراكز الاتصال الذكية، وأتمتة العمليات المتكاملة.",
        },
        {
          q: "لماذا تحتاج منشأتي إلى حلول تحسين للذكاء الاصطناعي؟",
          a: "توفر تحسين قيمة استثنائية عبر تقليص أكثر من ٤٠٪ من المهام اليدوية المتكررة، ومضاعفة سرعة الاستجابة للعملاء، ونشر أنظمة ذكية ذاتية التشغيل ومصممة خصيصاً لتحقيق أهدافك.",
        },
        {
          q: "هل يمكن تخصيص حلول تحسين لتتطابق مع هوية ونبرة علامتي التجارية؟",
          a: "بالتأكيد. كل وكيل ذكي ونظام أتمتة يتم تدريبه وتخصيصه بالكامل ليتوافق مع هوية منشأتك، ونبرة مخاطبة عملائك، وقواعد بياناتك الداخلية.",
        },
        {
          q: "هل توفر تحسين خدماتها للشركات الناشئة ورواد الأعمال؟",
          a: "نعم. بالإضافة إلى الحلول المؤسسية الكبرى (Enterprise)، نوفر حلولاً مخصصة وعالية الأثر للشركات الناشئة ورواد الأعمال لمساعدتهم على النمو المتسارع.",
        },
      ]
    : [
        {
          q: "What is Tahseen AI?",
          a: "Tahseen AI is a pioneering Saudi Arabian startup poised to redefine B2B operations across SMEs through cutting-edge artificial intelligence, workflow automation, and custom intelligent agent systems.",
        },
        {
          q: "What are Tahseen AI's primary services?",
          a: "We provide AI Consultation & Strategy, Full-stack Web & Mobile Development, AI Agents for Sales & Marketing, Corporate AI Training & Workshops, AI Chat & Call Centre Solutions, and End-to-End Workflow Automation.",
        },
        {
          q: "Why do I need Tahseen AI solutions?",
          a: "Tahseen AI delivers unparalleled value by reducing repetitive manual tasks by over 40%, accelerating response times, and deploying scalable autonomous systems tailored specifically to your business goals.",
        },
        {
          q: "Can I customize Tahseen AI to fit my brand?",
          a: "Absolutely. Every AI agent, workflow, and web platform is fully tailored to match your brand identity, tone of voice, internal databases, and operational requirements.",
        },
        {
          q: "Does Tahseen AI provide services to individuals and startups?",
          a: "Yes. In addition to enterprise B2B solutions, Tahseen AI provides adaptable, high-impact AI solutions tailored for growing startups, entrepreneurs, and professional teams.",
        },
      ];

  const basePillsRow1 = isAr
    ? [
        "تقارير فورية مباشرة",
        "تفاعل مخصص وذكي",
        "الحفاظ على العملاء",
        "تكامل سلس مع الأنظمة",
        "بث بيانات مباشر",
        "دقة معالجة استثنائية",
      ]
    : [
        "Real-Time Reports",
        "Personalized Engagement",
        "Customer Retention",
        "Seamless Integrations",
        "Live Telemetry Stream",
        "High-Assurance AI",
      ];

  const basePillsRow2 = isAr
    ? [
        "زيادة الكفاءة التشغيلية",
        "اقتصادي ومجدٍ",
        "إنفاق مالي ذكي",
        "قرارات مدفوعة بالبيانات",
        "تدفقات عمل مؤتمتة",
      ]
    : [
        "Increased Efficiency",
        "Cost-Effective",
        "Smart Spending",
        "Data-Driven Decisions",
        "Automated Workflows",
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

      {/* Ambient Wave Particles Scattered Across Webpage */}
      <AmbientWaveParticles />

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
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <nav className="flex items-center gap-4 lg:gap-6 text-xs font-semibold tracking-wider text-gray-300">
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
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 text-xs font-bold tracking-widest uppercase rounded-lg btn-teal-outline cursor-pointer"
            >
              <span>{isAr ? "تحدث معنا" : "LET'S TALK"}</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Language & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-md bg-white/[0.04] border border-white/10 text-gray-200 hover:text-[#008688]"
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

        {/* Mobile Slide-Down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0d1426]/98 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
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
            <ScrollReveal y={35} duration={1100} delay={100}>
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
            <ScrollReveal y={35} duration={1100} delay={250}>
              <p className="text-sm sm:text-base lg:text-[17px] text-gray-300 leading-[1.65] font-normal max-w-sm sm:max-w-md">
                {isAr
                  ? "نبتكر ونبني وكلاء ذكاء اصطناعي وأنظمة أتمتة متطورة تمكّن الشركات والمؤسسات من العمل بذكاء وسرعة وإنتاجية مضاعفة."
                  : "We build agents and automation systems that help businesses work smarter, faster, and more efficiently."}
              </p>
            </ScrollReveal>

            {/* Primary CTA Button */}
            <ScrollReveal y={35} duration={1100} delay={380}>
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isAr ? "خدماتنا الأساسية" : "OUR CORE SERVICES"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {isAr ? (
                <>
                  حلول ذكاء اصطناعي مصممة <span className="text-[#008688]">للأثر الواقعي</span>
                </>
              ) : (
                <>
                  Core AI Capabilities <span className="text-[#008688]">Engineered for Impact</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal">
              {isAr
                ? "نبتكر ونبني وكلاء ذكاء اصطناعي وأنظمة أتمتة متطورة تمكّن الشركات والمؤسسات من العمل بذكاء وسرعة وإنتاجية مضاعفة."
                : "We design and deploy autonomous systems, intelligent workflows, and custom digital platforms that scale your business."}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Sharp Bento Service Cards with Clean Solid Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: AI Agents */}
          <ScrollReveal delay={0} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "وكلاء أذكياء يعملون بشكل مستقل لأتمتة وتوسيع نطاق عملياتك على مدار الساعة."
                  : "Intelligent autonomous agents that qualify leads, handle support, and scale operations."}
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
                  ? "تبسيط مسارات العمل وربط الـ ERP والتخلص من المهام اليدوية المتكررة."
                  : "Streamline enterprise pipelines, connect ERPs, and eliminate manual bottlenecks."}
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
                  ? "استراتيجيات وخارطة طريق ذكية متوافقة مع أهدافك المؤسسية."
                  : "Strategic AI roadmaps and operational auditing aligned with business ROI."}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4: Development */}
          <ScrollReveal delay={360} y={45} duration={1100}>
            <div className="w-full p-6 sm:p-7 sharp-bento space-y-4 group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 cursor-default h-full">
              <div className="w-12 h-12 rounded-md bg-[#008688]/10 border border-[#008688]/20 flex items-center justify-center text-[#008688] transition-all duration-300 group-hover:scale-105 mx-auto">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight text-center group-hover:text-[#008688] transition-colors duration-200">
                {isAr ? "التطوير المخصص" : "Development"}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-[240px] text-center mx-auto">
                {isAr
                  ? "حلول برمجية وذكاء اصطناعي مصممة خصيصاً لتحقيق أثر واقعي وملموس."
                  : "Full-stack web and mobile systems built for high-assurance real-world impact."}
              </p>
            </div>
          </ScrollReveal>

        </div>

      </section>

      {/* 4. Comprehensive Insights Section */}
      <section id="insights" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08]">
        
        {/* Header */}
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <Activity className="w-3.5 h-3.5" />
              <span>{isAr ? "رؤى تشغيلية ومؤشرات لحظية" : "REAL-TIME INSIGHTS & ACTIONABLE DATA"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {isAr ? (
                <>
                  تحليلات شاملة تقود <span className="text-[#008688]">النمو والريادة</span>
                </>
              ) : (
                <>
                  Comprehensive Insights That Drive <span className="text-[#008688]">Growth</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
              {isAr
                ? "تتبّع كل حملة، ووكيل ذكي، وتفاعل مع العملاء بشكل فوري لتطوير استراتيجياتك والتخلص من التخمين."
                : "Track every campaign, automated agent, and customer interaction in real time to refine engagement strategies and eliminate guesswork."}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Sharp Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Lead Velocity & Autonomous Qualification */}
          <ScrollReveal delay={0} y={45} duration={1100}>
            <div className="p-6 sm:p-8 sharp-bento space-y-5 text-start h-full">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-md bg-[#008688]/10 border border-[#008688]/30 flex items-center justify-center text-[#008688]">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[#008688] font-bold">
                  {isAr ? "استجابة فورية" : "Instant Ingestion"}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {isAr ? "تأهيل العملاء وإغلاق الصفقات آلياً" : "Autonomous Lead Routing & Engagement"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed font-normal">
                  {isAr
                    ? "يتولى الوكلاء الأذكياء الرد الفوري على الاستفسارات، وفحص المتطلبات وتأهيلها، وتحديد المواعيد مباشرة في تقويم فريقك."
                    : "Intelligent agents qualify inquiries across WhatsApp, chat, and email, mapping context directly into your CRM."}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008688] flex-shrink-0" />
                  <span>{isAr ? "رد فوري في أقل من ١٠ ثوانٍ على مدار الساعة" : "Sub-10s multi-channel customer response time"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#008688] flex-shrink-0" />
                  <span>{isAr ? "مضاعفة معدلات تحويل العملاء المحتملين ٣ أضعاف" : "3X increase in qualified deal pipeline speed"}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Operations & Data Synchronization */}
          <ScrollReveal delay={160} y={45} duration={1100}>
            <div className="p-6 sm:p-8 sharp-bento space-y-5 text-start h-full">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                  <Workflow className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-[#38BDF8] font-bold">
                  99.9% Data Accuracy
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {isAr ? "مزامنة العمليات المؤسسية وسلاسل العمل" : "Zero-Friction Enterprise Integration"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed font-normal">
                  {isAr
                    ? "ربط فوري بين أنظمة تخطيط الموارد (ERP)، واستخراج المستندات، والتوافق الضريبي دون أي حاجة لتدخل يدوي متكرر."
                    : "Connect databases, payment gateways, and ERP systems with self-healing automation logic."}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>{isAr ? "تقليص أكثر من ٤٠٪ من الأعباء اليدوية الروتينية" : "Over 40% reduction in manual processing tasks"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>{isAr ? "توافق تام مع التشريعات والمعايير المحلية في المملكة" : "Strict compliance with regional data regulations"}</span>
                </div>
              </div>
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
                  <span>{isAr ? "مُصمم للتوسع المؤسسي عالي الكفاءة" : "BUILT FOR HIGH-ASSURANCE SCALE"}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  {isAr ? (
                    <>
                      حلول ذكاء اصطناعي مصممة <br className="hidden sm:inline" />
                      <span className="text-[#008688]">لقطاعك</span>
                    </>
                  ) : (
                    <>
                      AI Solutions Built for <br className="hidden sm:inline" />
                      <span className="text-[#008688]">Your Industry</span>
                    </>
                  )}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                  {isAr
                    ? "تصفح حلولنا المتخصصة والمصممة للقضاء على القيود التشغيلية وتسريع نمو المؤسسات السعودية."
                    : "Scroll through our specialized intelligence offerings engineered to eliminate manual friction and scale Saudi enterprise operations."}
                </p>
              </div>
            </ScrollReveal>

            {/* Interactive Step Jump Buttons */}
            <div className="space-y-2 pt-2">
              {showcaseSolutions.map((sol, idx) => (
                <button
                  key={sol.id}
                  onClick={() => scrollToSolution(sol.id, idx)}
                  className={`w-full p-3.5 rounded-md border text-start transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    activeSolutionIdx === idx
                      ? "bg-white/[0.06] border-[#008688] text-white shadow-[0_0_15px_rgba(0,134,136,0.15)]"
                      : "bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#008688]">{sol.step}</span>
                    <span className="text-xs font-bold font-sans">{sol.title}</span>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 text-[#008688] transition-transform ${activeSolutionIdx === idx ? "translate-x-1" : "opacity-40"} ${isAr ? "rotate-180" : ""}`} />
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
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-center font-mono">
                  {sol.metrics.map((m) => (
                    <div key={m.label} className="p-2.5 rounded-md bg-white/[0.02] border border-white/10">
                      <div className="text-xs sm:text-sm font-bold text-[#008688]">{m.val}</div>
                      <div className="text-[9px] text-gray-400 truncate mt-0.5">{m.label}</div>
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
              <span>{isAr ? "الذراع التعليمي • مجموعة تحسين للذكاء الاصطناعي" : "EDUCATIONAL DIVISION • TAHSEEN AI GROUP"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isAr ? (
                <>
                  تحسين التعليمية • <span className="text-[#008688]">منظومة التفوق والتوجيه الجامعي</span>
                </>
              ) : (
                <>
                  Tahseen Education • <span className="text-[#008688]">AI-Powered High School Excellence</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-base text-gray-400 leading-relaxed font-normal max-w-2xl mx-auto">
              {isAr
                ? "المنظومة التعليمية الذكية الشاملة لطلاب المرحلة الثانوية في المملكة العربية السعودية — ثلاث محطات متتالية، حساب واحد، ومسار واضح حتى باب الجامعة."
                : "The unified AI learning ecosystem for Saudi high school students — three sequential stations, one account, and a clear pathway to top university admission."}
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
                  {isAr ? "المنصة الرئيسية • edutahseen.com" : "MAIN PLATFORM • EDUTAHSEEN.COM"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "٤,٣٠٠+ طالب وطالبة" : "4,300+ Active Students"}
                </span>
                <span className="px-3 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-medium">
                  {isAr ? "معايير قياس وهيئة تقويم التعليم (ETEC)" : "Saudi ETEC & Qiyas Standards"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                  {isAr
                    ? "منظومة واحدة متكاملة تغنيك عن الدروس الخصوصية"
                    : "One Unified Platform Replacing Private Tutoring"}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                  {isAr
                    ? "صُممت تحسين لتكون بيئة تدريب منضبطة تضمن استثمار وقت الطالب وتركيزه على ما يحتاجه فعلياً. يعتمد نظامنا على المعلم الذكي التفاعلي الذي يشرح طريقة التفكير خطوة بخطوة، مع تقارير مستوى دورية لأولياء الأمور وتوجيه دراسي متكامل."
                    : "Tahseen Education is built to provide high school students with disciplined, adaptive practice powered by our interactive AI Smart Tutor. Includes instant step-by-step reasoning breakdown, comprehensive parent diagnostics, and integrated academic roadmaps."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "المعلم الذكي التفاعلي" : "AI Smart Tutor"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "يشرح طريقة التفكير وحل المسائل خطوة بخطوة" : "Breaks down problem-solving logic step by step"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "تقارير مستوى دورية" : "Parent Diagnostics"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "متابعة دقيقة لنقاط القوة والضعف في كل مادة" : "Detailed tracking of strengths & skill gaps per subject"}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#008688] font-bold text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isAr ? "محتوى معتمد وموثوق" : "ETEC & Qiyas Aligned"}</span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {isAr ? "بنوك أسئلة متوافقة مع أحدث معايير قياس" : "Up-to-date question banks matching actual exams"}
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

        {/* 3 Sharp Sub-Mentions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <ScrollReveal delay={0} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/qudurat"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#008688]/10 border border-[#008688]/30 flex items-center justify-center text-[#008688] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#008688] font-semibold uppercase">
                    {isAr ? "المحطة الأولى" : "Station 01"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#008688] transition-colors">
                    {isAr ? "قدرات AI (Qudurat)" : "Qudurat AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "تدريب تكيفي للكمي واللفظي" : "Adaptive Quantitative & Verbal Prep"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#008688] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={120} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/tahsili"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#38BDF8] font-semibold uppercase">
                    {isAr ? "المحطة الثانية" : "Station 02"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                    {isAr ? "تحصيلي AI (Tahsili)" : "Tahsili AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "إتقان المواد العلمية الأربع" : "4-Subject Science Mastery"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#38BDF8] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={240} y={45} duration={1100}>
            <a
              href="https://edutahseen.com/busalati"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-md sharp-bento flex items-center justify-between gap-3 text-start group cursor-pointer h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#A855F7] font-semibold uppercase">
                    {isAr ? "المحطة الثالثة" : "Station 03"}
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#A855F7] transition-colors">
                    {isAr ? "بوصلتي (Bausalty)" : "Bausalty AI"}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {isAr ? "مقياس الميول والتوجيه الجامعي" : "RIASEC Major Matching Engine"}
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#A855F7] flex-shrink-0 transition-colors" />
            </a>
          </ScrollReveal>

        </div>

      </section>

      {/* 8. Enterprise Social Proof & Partner Logos (Positioned after Tahseen Education) */}
      <section id="about" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full scroll-mt-24 sm:scroll-mt-28 border-t border-white/[0.08]">
        
        {/* Centered Heading */}
        <div className="flex items-center justify-center gap-3 sm:gap-8 w-full mb-8 sm:mb-10">
          <div className="hidden sm:block flex-1 border-t border-white/10" />
          <h4 className="text-xs sm:text-base md:text-lg font-bold text-gray-300 text-center tracking-tight leading-relaxed max-w-xl">
            {isAr ? (
              <>
                معتمد وموثوق من قِبل كبرى المؤسسات الرائدة <br className="hidden sm:inline" />
                في المملكة العربية السعودية
              </>
            ) : (
              <>
                Adopted by renowned, trusted, and leading enterprises <br className="hidden sm:inline" />
                in Saudi Arabia
              </>
            )}
          </h4>
          <div className="hidden sm:block flex-1 border-t border-white/10" />
        </div>

        {/* Sharp White/Teal Container Box */}
        <div className="rounded-md bg-white/[0.96] backdrop-blur-2xl border border-white/20 p-6 sm:p-8 md:p-10 shadow-lg flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 transition-all duration-300">
          
          {/* Logo 1: Zana */}
          <div className="relative h-12 w-28 sm:h-14 sm:w-36 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-1.png"
              alt="Zana - Empowering Startups"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain"
            />
          </div>

          {/* Logo 2: Imam Abdulrahman Bin Faisal University */}
          <div className="relative h-12 w-36 sm:h-16 sm:w-52 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-2.svg"
              alt="Imam Abdulrahman Bin Faisal University"
              fill
              sizes="(max-width: 640px) 144px, 208px"
              className="object-contain"
            />
          </div>

          {/* Logo 3: ITQAN */}
          <div className="relative h-12 w-28 sm:h-14 sm:w-36 transition-transform duration-300 hover:scale-105">
            <Image
              src="/partners/partner-3.png"
              alt="ITQAN - Driven by Knowledge"
              fill
              sizes="(max-width: 640px) 112px, 144px"
              className="object-contain"
            />
          </div>

        </div>

      </section>

      {/* 9. Testimonials */}
      <section id="testimonials" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto w-full border-t border-white/[0.08] bg-white/[0.01]">
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? "مُجرب وموثوق على مستوى المملكة" : "TESTED & TRUSTED NATIONWIDE"}</span>
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
                ? "آراء وتجارب مباشرة من قادة ومؤسسي الأعمال في السعودية الذين سرّعوا أعمالهم مع تحسين للذكاء الاصطناعي."
                : "Hear directly from founders and enterprise leaders across Saudi Arabia accelerating workflows with Tahseen AI."}
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

      {/* 10. Saudi Ehsan Platform 1% Social Pledge Banner */}
      <section id="ehsan" className="relative z-10 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto w-full">
        <ScrollReveal y={45} duration={1100}>
          <div className="ehsan-pledge-card p-8 sm:p-12 rounded-md bg-gradient-to-r from-[#071f1b] via-[#060913] to-[#071f1b] border-2 border-[#008688] shadow-[0_16px_50px_-10px_rgba(0,134,136,0.28)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-md bg-[#008688]/15 border border-[#008688]/40 flex items-center justify-center text-[#008688] flex-shrink-0 shadow-[0_0_15px_rgba(0,134,136,0.3)]">
              <HeartHandshake className="w-7 h-7 text-[#008688]" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono text-[#008688] font-bold uppercase tracking-wider">
                {isAr ? "الأثر المجتمعي المستدام" : "SOCIAL IMPACT PLEDGE"}
              </div>
              <h3 className="text-lg sm:text-xl font-bold !text-white">
                {isAr ? "نتبرع بنسبة ١٪ من أرباح أعمالنا لمنصة إحسان" : "We Donate 1% of Proceeds to the Ehsan Platform"}
              </h3>
              <p className="text-xs sm:text-sm !text-gray-300 font-normal">
                {isAr ? "التزاماً منا بالمسؤولية الاجتماعية ودعماً للقطاع الخيري وغير الربحي في المملكة العربية السعودية." : "Committed to sustainable social responsibility and empowering non-profit growth across Saudi Arabia."}
              </p>
            </div>
          </div>

          <Link
            href={contactHref}
            className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-lg bg-[#008688] text-white hover:brightness-110 font-sans font-extrabold shadow-[0_4px_20px_rgba(0,134,136,0.4)] flex-shrink-0 cursor-pointer transition-all hover:scale-105"
          >
            <span>{isAr ? "تواصل معنا" : "GET IN TOUCH"}</span>
          </Link>
        </div>
        </ScrollReveal>
      </section>

      {/* 11. FAQ Section */}
      <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 max-w-[1000px] mx-auto w-full border-t border-white/[0.08]">
        <ScrollReveal y={40} duration={1100}>
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {isAr ? "استفساراتك بإجابات واضحة" : "FREQUENTLY ASKED QUESTIONS"}
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
                ? "كل ما تود معرفته حول خدمات تحسين للذكاء الاصطناعي وكيف نساعد منشأتك على التوسع الذكي."
                : "Everything you need to know about our AI systems, implementation speed, and enterprise integration."}
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

      {/* 12. Final CTA Banner - Full Screen Width & Center-Docked Layout */}
      <section id="cta" className="cta-dark-band relative z-10 w-full overflow-hidden bg-gradient-to-r from-[#060913] via-[#091822] to-[#060913] border-y border-[#008688]/35 shadow-[0_10px_60px_rgba(0,134,136,0.15)] text-white py-4 sm:py-6 lg:py-7 px-4 sm:px-8">
        <ScrollReveal y={45} duration={1100}>
          <div className="max-w-[1120px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Heading & CTA (Shifted to the Right towards Center) */}
            <div className={`lg:col-span-6 space-y-3 sm:space-y-3.5 text-start ${isAr ? "lg:pr-12 xl:pr-16" : "lg:pl-12 xl:pl-16"} flex flex-col justify-center`}>
              <span className="text-[#008688] text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase block">
                {isAr ? "ابدأ رحلة التحول الذكي اليوم" : "START YOUR INTELLIGENT TRANSFORMATION"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight !text-white">
                {isAr ? (
                  <>
                    <span className="!text-white">ابنِ حلول الذكاء الاصطناعي</span> <br className="hidden sm:inline" />
                    <span className="text-[#008688]">لمنشأتك الآن!</span>
                  </>
                ) : (
                  <>
                    <span className="!text-white">Build Your AI-Powered</span> <br className="hidden sm:inline" />
                    <span className="text-[#008688]">Solution Now!</span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm !text-gray-300 leading-relaxed font-normal max-w-md">
                {isAr
                  ? "تواصل مع فريقنا الهندسي اليوم لتقييم فرص الأتمتة ونشر أنظمة ووكلاء الذكاء الاصطناعي المخصصة لأعمالك."
                  : "Connect directly with our engineering team to assess automation opportunities and deploy custom intelligent agents."}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4">
                <Link
                  href={contactHref}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-lg bg-[#008688] text-white hover:brightness-110 shadow-[0_4px_25px_rgba(0,134,136,0.6)] transition-all cursor-pointer group"
                >
                  <span>{isAr ? "احجز استشارتك المجانية" : "SCHEDULE FREE CONSULTATION"}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </Link>
              </div>
            </div>

            {/* Right Column: Animated Large Elaborate AI Solution Graphic (Floating & Borderless) */}
            <div className="lg:col-span-6 flex items-center justify-center w-full">
              <div className="relative w-full h-[220px] sm:h-[270px] lg:h-[310px] max-w-[540px] flex items-center justify-center group animate-cta-float">
                <div className="absolute inset-0 bg-[#008688]/10 rounded-full blur-[60px] pointer-events-none animate-cta-glow -z-10" />
                <Image
                  src="/cta-ai-solution.png"
                  alt="Build Your AI-Powered Solution"
                  fill
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_35px_rgba(0,134,136,0.35)]"
                  priority
                />
              </div>
            </div>

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
