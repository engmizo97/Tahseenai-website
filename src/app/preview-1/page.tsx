"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  UserCheck,
  Workflow,
  Compass,
  Code2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Globe,
  Star,
  Activity,
  ChevronDown,
  Layers,
  Zap,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  Menu,
  X
} from "lucide-react";

export default function Preview1Page() {
  const [isAr, setIsAr] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const platforms = [
    {
      id: "edu",
      name: isAr ? "تحسين التعليمية" : "Tahseen Education",
      tag: isAr ? "المنظومة الأم" : "ECOSYSTEM",
      desc: isAr ? "المنظومة الشاملة لتأهيل الطلاب والقبول الجامعي" : "Comprehensive student and university admissions hub",
      logo: "/platforms/tahseen-edu.png",
      href: "https://edutahseen.com",
      accent: "#008688",
    },
    {
      id: "qudurat",
      name: isAr ? "منصة قدرات" : "Qudurat Platform",
      tag: isAr ? "اختبار القدرات العامة" : "EXAM PREP",
      desc: isAr ? "تدريب تكيفي للكمي واللفظي مع أحدث تجميعات ١٤٤٧" : "Adaptive quantitative & verbal prep with 1447 questions",
      logo: "/platforms/qudurat.webp",
      href: "https://edutahseen.com/qudurat",
      accent: "#00b4b6",
    },
    {
      id: "tahsili",
      name: isAr ? "منصة تحصيلي" : "Tahsili Platform",
      tag: isAr ? "التحصيلي العلمي" : "SCIENCE EXAM",
      desc: isAr ? "شامل المواد العلمية الأربع مع محاكي قياس الذكي" : "Comprehensive 4-subject science mastery with exam simulator",
      logo: "/platforms/tahsili.webp",
      href: "https://edutahseen.com/tahsili",
      accent: "#38BDF8",
    },
    {
      id: "bawsalati",
      name: isAr ? "منصة بوصلتي" : "Bawsalati Assessment",
      tag: isAr ? "تحديد التخصص الجامعي" : "CAREER RIASEC",
      desc: isAr ? "مقياس هولاند العلمي لتحديد التخصص والميول المهنية" : "Scientific Holland RIASEC major & career guidance",
      logo: "/platforms/bawsalati.webp",
      href: "https://edutahseen.com/busalati",
      accent: "#A855F7",
    },
  ];

  const services = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#00b4b6]" />,
      badge: isAr ? "مساعد رقمي معتمد" : "AUTONOMOUS AGENTS",
      title: isAr ? "وكلاء الذكاء الاصطناعي" : "AI Agents",
      desc: isAr
        ? "أعضاء فريق رقميون يعملون 24/7 للرد الفوري، تأهيل العملاء، وتوجيه الصفقات لفريق المبيعات."
        : "Autonomous digital workers operating 24/7 to qualify buyers, answer inquiries, and route deals.",
      metric: isAr ? "استجابة < ٥ ثوانٍ" : "Sub-5s Response",
    },
    {
      icon: <Workflow className="w-6 h-6 text-[#00b4b6]" />,
      badge: isAr ? "أتمتة العمليات" : "WORKFLOW AUTOMATION",
      title: isAr ? "هندسة الأتمتة الشاملة" : "Enterprise Automation",
      desc: isAr
        ? "ربط قواعد البيانات، وأنظمة ERP، وبوابات الدفع لإلغاء أي مهام يدوية متكررة بلا أخطاء."
        : "Seamless bi-directional sync across ERPs, CRMs, and payment gateways with zero manual effort.",
      metric: isAr ? "-٤٥٪ جهد يدوي" : "-45% Manual Effort",
    },
    {
      icon: <Compass className="w-6 h-6 text-[#00b4b6]" />,
      badge: isAr ? "استشارات استراتيجية" : "AI STRATEGY",
      title: isAr ? "الاستشارات وخارطة الطريق" : "Strategic Consulting",
      desc: isAr
        ? "تحديد أولويات تبني الذكاء الاصطناعي في شركتك ووضع خارطة طريق تنفيذية ذات عائد استثماري مؤكد."
        : "High-impact roadmaps identifying where AI yields immediate, measurable ROI for your business.",
      metric: isAr ? "عائد استثماري ملموس" : "Proven Fast ROI",
    },
    {
      icon: <Code2 className="w-6 h-6 text-[#00b4b6]" />,
      badge: isAr ? "تطوير مخصص" : "ENGINEERING",
      title: isAr ? "تطوير البرمجيات والتطبيقات" : "Custom Software",
      desc: isAr
        ? "بناء منصات ويب وتطبيقات سحابية فائقة السرعة والأمان مصممة خصيصاً للتوسع ومواكبة نمو أعمالك."
        : "Ultra-fast, secure cloud web and mobile platforms engineered specifically to scale as you grow.",
      metric: isAr ? "معمارية سحابية ٩٩.٩٪" : "99.9% Uptime SLA",
    },
  ];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#060913] text-gray-100 font-sans selection:bg-[#008688]/30 selection:text-[#00e5be] overflow-x-hidden relative"
    >
      {/* Ambient Lighting & Luxury Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#008688]/20 via-[#008688]/5 to-transparent blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#008688]/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00e5be]/5 rounded-full blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Top Banner: Preview Identifier */}
      <div className="relative z-50 bg-[#008688]/15 border-b border-[#008688]/30 text-center py-2 px-4 text-xs font-mono text-[#00e5be] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00e5be] animate-ping" />
          <span>{isAr ? "نموذج العرض الأول (Concept 01): The Obsidian Sovereign" : "Design Variant 01: The Obsidian Sovereign"}</span>
        </div>
        <Link href="/" className="underline text-gray-300 hover:text-white transition-colors">
          {isAr ? "← العودة للموقع الحالي" : "← Back to Live Site"}
        </Link>
      </div>

      {/* Glass Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#060913]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3.5 flex items-center justify-between">
          <Link href="/preview-1" className="flex items-center gap-3">
            <div className="relative h-9 w-40 sm:h-10 sm:w-48 transition-transform hover:scale-105">
              <Image
                src="/tahseen-logo.png?v=4"
                alt="Tahseen AI"
                fill
                priority
                className={`object-contain ${isAr ? "object-right" : "object-left"}`}
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-300">
            <a href="#services" className="hover:text-[#00e5be] transition-colors">{isAr ? "الخدمات" : "SERVICES"}</a>
            <a href="#solutions" className="hover:text-[#00e5be] transition-colors">{isAr ? "حلول الأعمال" : "SOLUTIONS"}</a>
            <a href="#youth-empowerment" className="hover:text-[#00e5be] transition-colors flex items-center gap-1.5">
              <span>{isAr ? "تمكين الشباب" : "YOUTH EMPOWERMENT"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5be]" />
            </a>
            <a href="#partners" className="hover:text-[#00e5be] transition-colors">{isAr ? "شركاؤنا" : "PARTNERS"}</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAr(!isAr)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#008688] bg-white/[0.03] text-xs font-bold text-gray-300 hover:text-white transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#00e5be]" />
              <span>{isAr ? "English" : "العربية"}</span>
            </button>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#008688] to-[#00b4b6] text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,180,182,0.35)] hover:shadow-[0_0_30px_rgba(0,180,182,0.6)] transition-all hover:scale-105"
            >
              <span>{isAr ? "ابدأ مشروعك" : "START A PROJECT"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Executive Enterprise Grade */}
      <section className="relative z-10 pt-16 sm:pt-24 lg:pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto text-center">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#008688]/10 border border-[#008688]/30 backdrop-blur-md mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5be] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5be]" />
          </span>
          <span className="text-xs font-mono text-gray-200 tracking-wide">
            {isAr ? "متاح لتنفيذ المشاريع التقنية والتحول الذكي Q3/Q4" : "Accepting Enterprise Deployments Q3/Q4"}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
          {isAr ? (
            <>
              حلول ذكاء اصطناعي تصنع <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-[#00e5be] to-[#008688] bg-clip-text text-transparent">
                فارقاً حقيقياً في أرباحك
              </span>
            </>
          ) : (
            <>
              Enterprise AI Built for <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-white via-[#00e5be] to-[#008688] bg-clip-text text-transparent">
                High-Growth Operations
              </span>
            </>
          )}
        </h1>

        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {isAr
            ? "نبني وكلاء أذكياء ومنظومات أتمتة تلغي المهام الروتينية لشركتك وتضاعف سرعة فريقك بدقة وموثوقية."
            : "We engineer autonomous agents and workflows that eliminate routine bottlenecks and accelerate enterprise teams."}
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008688] to-[#00b4b6] text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,180,182,0.4)] hover:shadow-[0_0_45px_rgba(0,180,182,0.7)] transition-all hover:scale-105"
          >
            <span>{isAr ? "احجز جلستك الاستشارية" : "REQUEST CONSULTATION"}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </Link>

          <a
            href="#youth-empowerment"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/15 hover:border-[#008688]/60 bg-white/[0.03] hover:bg-white/[0.06] text-white font-bold text-sm transition-all"
          >
            <span>{isAr ? "استكشف تمكين الشباب" : "YOUTH EMPOWERMENT"}</span>
            <ArrowUpRight className="w-4 h-4 text-[#00e5be]" />
          </a>
        </div>

        {/* Key Metrics Floating Strip */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { val: "24/7", lbl: isAr ? "جاهزية واستجابة مستمرة" : "Continuous Availability" },
            { val: "< ٥ ثوانٍ", lbl: isAr ? "متوسط سرعة الرد والتأهيل" : "Lead Qualification Speed" },
            { val: "+٤٥٪", lbl: isAr ? "ارتفاع معدل إغلاق المبيعات" : "Conversion Lift" },
            { val: "٩٩.٩٪", lbl: isAr ? "دقة البيانات واستقرار الأنظمة" : "System Reliability" },
          ].map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-lg hover:border-[#008688]/40 transition-all text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#00e5be] font-mono">{m.val}</div>
              <div className="text-xs text-gray-400 mt-1 font-medium">{m.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section: Luxury Frosted Bento Grid */}
      <section id="services" className="relative z-10 py-20 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#008688]/10 border border-[#008688]/30 text-[#00e5be] text-xs font-mono font-bold tracking-widest uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{isAr ? "الركائز الأساسية" : "CORE CAPABILITIES"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isAr ? (
              <>حلول متكاملة <span className="text-[#00e5be]">لقطاع الأعمال</span></>
            ) : (
              <>Engineered for <span className="text-[#00e5be]">Scale & Precision</span></>
            )}
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            {isAr ? "برمجيات وأتمتة هندسية مصممة لإلغاء الهدر ورفع كفاءة فريقك." : "Automated systems that remove operational drag and multiply team capacity."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-[#008688]/60 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#008688]/15 border border-[#008688]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="text-[10px] font-mono font-bold text-[#00e5be] uppercase tracking-wider">
                  {s.badge}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00e5be] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-300 font-mono">
                <span>{s.metric}</span>
                <ArrowRight className={`w-3.5 h-3.5 text-[#00e5be] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all ${isAr ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT: Youth Empowerment Section (تمكين الشباب) */}
      <section
        id="youth-empowerment"
        className="relative z-10 py-24 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]"
      >
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-b from-[#0a1424] via-[#070d18] to-[#050811] border-2 border-[#008688]/40 shadow-[0_20px_80px_rgba(0,134,136,0.18)] overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#008688]/15 rounded-full blur-[120px] pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#008688]/20 border border-[#008688]/40 text-[#00e5be] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "مبادرة تحسين الوطنية • تمكين الشباب" : "NATIONAL INITIATIVE • YOUTH EMPOWERMENT"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {isAr ? "تمكين الشباب السعودي" : "Youth Empowerment"}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                {isAr
                  ? "منظومة تحسين التعليمية المتكاملة لتمكين طلاب وطالبات المملكة في اختبارات قياس، وتحديد التخصص الجامعي والمستقبل المهني."
                  : "Tahseen's unified educational ecosystem empowering Saudi students in standardized testing, college admissions, and career discovery."}
              </p>
            </div>

            <a
              href="https://edutahseen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#008688] to-[#00b4b6] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,180,182,0.4)] hover:scale-105 transition-all flex-shrink-0"
            >
              <span>{isAr ? "زيارة منصة تحسين التعليمية" : "VISIT EDUTAHSEEN.COM"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Interactive Platforms Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {platforms.map((p) => (
              <a
                key={p.id}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#00e5be]/60 transition-all duration-300 hover:-translate-y-1.5 group flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden shadow-inner">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#00e5be] tracking-wider uppercase">
                      {p.tag}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00e5be] transition-colors mt-0.5">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-[#00e5be] transition-colors">
                  <span>{isAr ? "دخول المنصة" : "Open Platform"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Proof Badges */}
          <div className="relative z-10 mt-10 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00e5be] flex-shrink-0" />
              <div className="text-xs text-gray-300 font-medium">
                {isAr ? "معلم ذكي (الخوارزمي وابن الهيثم) لشرح المسائل خطوة بخطوة" : "Smart AI tutors with step-by-step problem breakdowns"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00e5be] flex-shrink-0" />
              <div className="text-xs text-gray-300 font-medium">
                {isAr ? "بنوك أسئلة وتجميعات ١٤٤٧ تحاكي معايير قياس الرسمية" : "Question banks updated to official Saudi Qiyas test formats"}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00e5be] flex-shrink-0" />
              <div className="text-xs text-gray-300 font-medium">
                {isAr ? "حساب موحد وسلس يربط القدرات والتحصيلي وبوصلتي" : "Unified single login across Qudurat, Tahsili & Bawsalati"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Social Proof / Partners: Single Crisp Row */}
      <section id="partners" className="relative z-10 py-16 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-8">
          <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest font-mono">
            {isAr ? "موثوق من مؤسسات رائدة في المملكة العربية السعودية" : "TRUSTED BY LEADING SAUDI INSTITUTIONS"}
          </h4>
        </div>

        <div className="rounded-2xl bg-white/[0.97] backdrop-blur-2xl border border-white/20 py-6 px-6 sm:px-12 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-3 items-center justify-items-center gap-4 sm:gap-12 w-full">
            <div className="relative h-10 w-24 sm:h-14 sm:w-36 transition-transform hover:scale-105">
              <Image src="/partners/partner-1.png" alt="Zana" fill className="object-contain" />
            </div>
            <div className="relative h-10 w-28 sm:h-16 sm:w-48 transition-transform hover:scale-105">
              <Image src="/partners/partner-2.svg" alt="IAU" fill className="object-contain" />
            </div>
            <div className="relative h-10 w-24 sm:h-14 sm:w-36 transition-transform hover:scale-105">
              <Image src="/partners/partner-3.png" alt="ITQAN" fill className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Luxury CTA Band */}
      <section className="relative z-10 py-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-[#008688]/20 via-[#071322] to-[#008688]/20 border border-[#008688]/40 shadow-[0_10px_60px_rgba(0,134,136,0.2)] text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {isAr ? "جاهز لنقل أعمالك لمستوى الأتمتة الذكية؟" : "Ready to Automate Your Business?"}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            {isAr
              ? "تواصل مع فريقنا التقني لنحدد لك مسارات الأتمتة التي تختصر ساعات العمل وتضاعف أرباحك."
              : "Talk to our engineering team to uncover automated workflows that save time and increase margins."}
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-xl bg-gradient-to-r from-[#008688] to-[#00b4b6] text-white font-extrabold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,180,182,0.5)] hover:scale-105 transition-all"
            >
              <span>{isAr ? "تحدث مع مهندسينا الآن" : "SCHEDULE A TECHNICAL CALL"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#04060d] py-12 px-6 lg:px-12 text-xs text-gray-400 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-36">
              <Image src="/tahseen-logo.png?v=4" alt="Tahseen AI" fill className="object-contain object-left" />
            </div>
            <span className="text-gray-500 font-mono">© 2026 Tahseen AI Group</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-gray-400">
            <span>Riyadh, KSA</span>
            <span className="text-[#00e5be]">Vision 2030</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
