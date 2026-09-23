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
  Globe,
  Terminal,
  Zap,
  Activity,
  Cpu,
  Layers,
  CheckCircle2,
  ArrowUpRight,
  Lock,
  MessageSquare,
  Database,
  Calendar,
  Send,
  Sliders,
  Menu,
  X
} from "lucide-react";

export default function Preview2Page() {
  const [isAr, setIsAr] = useState(true);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      num: "01",
      title: isAr ? "استقبال المحادثة والتأهيل" : "Inbound Qualification",
      agent: isAr ? "وكيل خدمة وتأهيل المبيعات" : "Sales Intake Agent",
      channel: "WhatsApp & Web Chat",
      desc: isAr
        ? "يستقبل الوكيل الذكي استفسار العميل خلال ثانية واحدة، يحلل الاحتياج، ويستخرج تفاصيل الميزانية ونطاق المشروع."
        : "Autonomous intake qualifies prospects in sub-second speed, extracting budget, timeline, and exact scope.",
      icon: <MessageSquare className="w-5 h-5 text-[#00f5d4]" />,
    },
    {
      num: "02",
      title: isAr ? "الاستعلام ومطابقة الأنظمة" : "ERP & Database Query",
      agent: isAr ? "محرك الأتمتة المباشرة" : "Integration Engine",
      channel: "ERP / CRM / Database",
      desc: isAr
        ? "يتصل الوكيل مباشرة بقواعد بياناتك، يفحص الجداول المتاحة، ويطابق الأسعار والمخزون في الوقت الفعلي بلا خطأ بشري."
        : "Direct two-way queries against live ERP and CRM records to check inventory, pricing, and availability.",
      icon: <Database className="w-5 h-5 text-[#00f5d4]" />,
    },
    {
      num: "03",
      title: isAr ? "حجز التقويم وإغلاق الصفقة" : "Automated Closing",
      agent: isAr ? "وكيل إدارة المواعيد" : "Calendar & Booking Agent",
      channel: "Google Calendar & CRM Deal",
      desc: isAr
        ? "يحجز موعد الاجتماع المناسب مباشرة على تقويم فريقك، ويرسل إشعاراً لـ CRM مع ملخص ذكي كامل للمكالمة."
        : "Schedules meetings directly on sales reps' calendars and pushes enriched briefing cards to CRM.",
      icon: <Calendar className="w-5 h-5 text-[#00f5d4]" />,
    },
  ];

  const platforms = [
    {
      name: isAr ? "تحسين التعليمية" : "Tahseen Education",
      subtitle: isAr ? "المنظومة التعليمية الكبرى" : "Flagship Ecosystem",
      desc: isAr ? "البوابة الوطنية الشاملة لإعداد الطلاب لاختبارات قياس والقبول الجامعي" : "Comprehensive student platform for Qiyas prep and higher education",
      logo: "/platforms/tahseen-edu.png",
      href: "https://edutahseen.com",
      badge: isAr ? "المظلة الرسمية" : "FLAGSHIP",
      color: "from-[#008688]/30 to-transparent",
    },
    {
      name: isAr ? "منصة قدرات" : "Qudurat",
      subtitle: isAr ? "اختبار القدرات العامة" : "General Aptitude Test",
      desc: isAr ? "تدريب تكيفي ذكي لقسمي الكمي واللفظي مع أحدث تجميعات ١٤٤٧ المعتمدة" : "Adaptive quantitative & verbal training with real 1447 exam models",
      logo: "/platforms/qudurat.webp",
      href: "https://edutahseen.com/qudurat",
      badge: isAr ? "تجميعات ١٤٤٧" : "1447 EXAMS",
      color: "from-[#00b4b6]/30 to-transparent",
    },
    {
      name: isAr ? "منصة تحصيلي" : "Tahsili",
      subtitle: isAr ? "التحصيلي العلمي" : "Scientific Achievement Test",
      desc: isAr ? "إتقان شامل للمواد الأربع (رياضيات، فيزياء، كيمياء، أحياء) مع محاكي قياس" : "Complete 4-subject mastery: Math, Physics, Chemistry, Biology with test engine",
      logo: "/platforms/tahsili.webp",
      href: "https://edutahseen.com/tahsili",
      badge: isAr ? "٤ مواد علمية" : "4 SUBJECTS",
      color: "from-[#38BDF8]/30 to-transparent",
    },
    {
      name: isAr ? "منصة بوصلتي" : "Bawsalati",
      subtitle: isAr ? "تحديد التخصص الجامعي" : "College Major Assessment",
      desc: isAr ? "مقياس هولاند العلمي (RIASEC) لتوجيه الطلاب لأفضل التخصصات الواعدة" : "Scientific Holland RIASEC assessment guiding students to optimal career majors",
      logo: "/platforms/bawsalati.webp",
      href: "https://edutahseen.com/busalati",
      badge: isAr ? "مقياس هولاند" : "RIASEC TEST",
      color: "from-[#A855F7]/30 to-transparent",
    },
  ];

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="min-h-screen bg-[#020408] text-white font-sans selection:bg-[#00f5d4]/20 selection:text-[#00f5d4] overflow-x-hidden relative"
    >
      {/* Laser Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-gradient-to-b from-[#008688]/15 via-[#00f5d4]/5 to-transparent blur-[160px]" />
        <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-[#008688]/10 rounded-full blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00f5d4 1px, transparent 1px), linear-gradient(to bottom, #00f5d4 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Top Banner: Variant 2 Flag */}
      <div className="relative z-50 bg-[#00f5d4]/10 border-b border-[#00f5d4]/25 py-2 px-4 text-xs font-mono text-[#00f5d4] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse" />
          <span>{isAr ? "نموذج العرض الثاني (Concept 02): The Sovereign Kinetic" : "Design Variant 02: The Sovereign Kinetic"}</span>
        </div>
        <Link href="/" className="underline text-gray-300 hover:text-white transition-colors">
          {isAr ? "← العودة للموقع الحالي" : "← Back to Live Site"}
        </Link>
      </div>

      {/* Titanium Minimalist Header */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-[#020408]/90 border-b border-white/[0.08]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-4 flex items-center justify-between">
          <Link href="/preview-2" className="flex items-center">
            <div className="relative h-10 w-44 sm:h-11 sm:w-52">
              <Image src="/tahseen-logo.png?v=4" alt="Tahseen AI" fill priority className="object-contain object-left" />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 text-xs font-mono tracking-widest uppercase text-gray-400">
            <a href="#kinetic-engine" className="hover:text-[#00f5d4] transition-colors">{isAr ? "محرك الأتمتة" : "HOW IT WORKS"}</a>
            <a href="#capabilities" className="hover:text-[#00f5d4] transition-colors">{isAr ? "القدرات" : "CAPABILITIES"}</a>
            <a href="#youth" className="hover:text-[#00f5d4] transition-colors text-white font-bold">{isAr ? "تمكين الشباب" : "YOUTH EMPOWERMENT"}</a>
            <a href="#partners" className="hover:text-[#00f5d4] transition-colors">{isAr ? "الشركاء" : "PARTNERS"}</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAr(!isAr)}
              className="px-3 py-1.5 rounded border border-white/10 hover:border-[#00f5d4]/40 bg-white/[0.02] text-xs font-mono text-gray-300 hover:text-white transition-all"
            >
              {isAr ? "EN" : "عربي"}
            </button>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#008688] hover:bg-[#00a8aa] text-white font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_25px_rgba(0,134,136,0.4)]"
            >
              <span>{isAr ? "ابدأ التحول" : "DEPLOY AI"}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero: Bold Editorial Kinetic */}
      <section className="relative z-10 pt-20 sm:pt-28 lg:pt-36 pb-24 px-6 lg:px-16 max-w-[1440px] mx-auto">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f5d4] tracking-widest uppercase mb-6 bg-[#00f5d4]/5 border border-[#00f5d4]/20 px-3 py-1 rounded">
            <Terminal className="w-3.5 h-3.5" />
            <span>{isAr ? "الجيل الجديد من أنظمة العمل الذكية" : "NEXT-GEN AUTONOMOUS ENTERPRISE"}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05]">
            {isAr ? (
              <>
                الذكاء الاصطناعي.. <br />
                <span className="text-[#00f5d4]">بحجم طموح أعمالك.</span>
              </>
            ) : (
              <>
                Autonomous AI. <br />
                <span className="text-[#00f5d4]">At Enterprise Velocity.</span>
              </>
            )}
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed font-normal">
            {isAr
              ? "نبني وكلاء رقميين مستقلين ينهون المهام المعقدة، ويربطون أنظمتك المؤسسية، ويوفرون مئات ساعات العمل شهرياً."
              : "We deploy autonomous agents that resolve complex business workflows, bridge enterprise databases, and eliminate hundreds of manual hours every month."}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008688] to-[#00f5d4] text-[#020408] font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(0,245,212,0.35)] hover:shadow-[0_0_50px_rgba(0,245,212,0.6)] transition-all hover:scale-105"
            >
              <span>{isAr ? "احجز عرضاً تقنياً حياً" : "SCHEDULE TECHNICAL DEMO"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>

            <a
              href="#youth"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 hover:border-[#00f5d4]/50 bg-white/[0.02] text-white font-mono text-sm transition-all"
            >
              <span>{isAr ? "مبادرة تمكين الشباب" : "YOUTH EMPOWERMENT"}</span>
              <ArrowUpRight className="w-4 h-4 text-[#00f5d4]" />
            </a>
          </div>
        </div>

        {/* Live Interactive Workflow Console: Shows AI in Real Action */}
        <div id="kinetic-engine" className="mt-24 rounded-2xl bg-[#070d18] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-gray-400">
                tahseen-agent-engine // v3.4-live
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f5d4]">
              <span className="w-2 h-2 rounded-full bg-[#00f5d4] animate-ping" />
              <span>{isAr ? "محاكاة حية لمسار عمل آلي" : "LIVE PIPELINE EXECUTION"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.num}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-6 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeWorkflowStep === idx
                    ? "bg-[#008688]/15 border-[#00f5d4] shadow-[0_0_30px_rgba(0,245,212,0.15)]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#00f5d4]">{step.num}</span>
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                  <div className="text-[11px] font-mono text-[#00f5d4] mb-3">{step.agent}</div>
                  <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-gray-400 flex items-center justify-between">
                  <span>{step.channel}</span>
                  <span className="text-[#00f5d4]">OK [0.4s]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section id="capabilities" className="relative z-10 py-20 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-[#00f5d4] tracking-widest uppercase">
              {isAr ? "الركائز المؤسسية" : "CORE SYSTEM PILLARS"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-2">
              {isAr ? "منظومات الأداء العالي" : "High-Performance AI"}
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            {isAr
              ? "لا نعتمد على نماذج عامة؛ بل نبني منظومات مخصصة تفهم لغة عملك وتلتزم بسياساتك المؤسسية."
              : "We do not deploy generic toys. Every solution is custom-trained to respect your enterprise data boundaries."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <UserCheck className="w-6 h-6 text-[#00f5d4]" />,
              title: isAr ? "الوكلاء الأذكياء" : "AI Agents",
              desc: isAr ? "رد فوري، تأهيل الصفقات، ودعم عملاء 24/7 دون أخطاء." : "Instant response, deal qualification, and 24/7 support.",
            },
            {
              icon: <Workflow className="w-6 h-6 text-[#00f5d4]" />,
              title: isAr ? "أتمتة العمليات" : "Process Automation",
              desc: isAr ? "ربط الأنظمة وقواعد البيانات والـ ERP لإلغاء أي إدخال يدوي." : "System and ERP integrations that eliminate repetitive manual entries.",
            },
            {
              icon: <Compass className="w-6 h-6 text-[#00f5d4]" />,
              title: isAr ? "الاستشارات الاستراتيجية" : "AI Consulting",
              desc: isAr ? "خارطة طريق مدروسة لتطبيق الذكاء الاصطناعي بعائد استثماري فوري." : "Strategic roadmaps prioritizing high-ROI automation deployments.",
            },
            {
              icon: <Code2 className="w-6 h-6 text-[#00f5d4]" />,
              title: isAr ? "التطوير المخصص" : "Custom Engineering",
              desc: isAr ? "تطبيقات ومنصات ويب متطورة وقابلة للتوسع بأعلى معايير الأمان." : "Scalable web and mobile applications tailored to your growth.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00f5d4]/60 transition-all hover:-translate-y-2 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#008688]/15 border border-[#008688]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* YOUTH EMPOWERMENT: Saudi National Strategic Impact */}
      <section id="youth" className="relative z-10 py-24 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-18 bg-gradient-to-br from-[#04121a] via-[#050a14] to-[#02050b] border border-[#00f5d4]/30 shadow-[0_0_80px_rgba(0,245,212,0.12)]">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00f5d4] tracking-widest uppercase mb-3 bg-[#00f5d4]/10 border border-[#00f5d4]/30 px-3 py-1 rounded">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? "رؤية السعودية ٢٠٣٠ • مبادرة تمكين الشباب" : "KSA VISION 2030 • YOUTH EMPOWERMENT"}</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
                {isAr ? "تمكين الشباب السعودي" : "Youth Empowerment"}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                {isAr
                  ? "منظومة تحسين التعليمية: تأهيل الجيل الصاعد لاختبارات قياس والقبول الجامعي الأفضل ومطابقة التخصص المهني المستقبلي."
                  : "Empowering Saudi youth with adaptive test prep, top college admissions, and data-driven major discovery under Tahseen Education."}
              </p>
            </div>

            <a
              href="https://edutahseen.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#008688] to-[#00f5d4] text-[#020408] font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,245,212,0.35)] hover:scale-105 transition-all flex-shrink-0"
            >
              <span>{isAr ? "زيارة edutahseen.com" : "VISIT EDUTAHSEEN.COM"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* 4 Interactive Platforms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {platforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#00f5d4]/70 transition-all duration-300 hover:-translate-y-2 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center overflow-hidden">
                      <Image src={p.logo} alt={p.name} width={42} height={42} className="object-contain" />
                    </div>
                    <span className="font-mono text-[10px] text-[#00f5d4] border border-[#00f5d4]/30 px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#00f5d4] transition-colors">{p.name}</h3>
                  <div className="text-xs text-gray-400 font-mono mt-0.5 mb-3">{p.subtitle}</div>
                  <p className="text-xs text-gray-300 leading-relaxed">{p.desc}</p>
                </div>

                <div className="mt-8 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-[#00f5d4] transition-colors">
                  <span>{isAr ? "دخول المنصة" : "Launch"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Core Strengths */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs text-gray-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00f5d4] flex-shrink-0" />
              <span>{isAr ? "معلم ذكي (الخوارزمي وابن الهيثم) لشرح المسائل خطوة بخطوة" : "Smart AI tutor with step-by-step breakdown"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00f5d4] flex-shrink-0" />
              <span>{isAr ? "تجميعات ١٤٤٧ المحدثة مطابقة لمعايير قياس الرسمية" : "Official 1447 Qiyas test standard models"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#00f5d4] flex-shrink-0" />
              <span>{isAr ? "حساب موحد يربط القدرات والتحصيلي وبوصلتي بسلاسة" : "Single unified sign-on across all platforms"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partners: Strict Single Row */}
      <section id="partners" className="relative z-10 py-16 px-6 lg:px-16 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
            {isAr ? "شراكات وموثوقية في المملكة العربية السعودية" : "TRUSTED SAUDI PARTNERSHIPS"}
          </span>
        </div>

        <div className="rounded-2xl bg-white/[0.97] border border-white/20 py-6 px-8 max-w-4xl mx-auto shadow-2xl">
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

      {/* Kinetic CTA */}
      <section className="relative z-10 py-24 px-6 lg:px-16 max-w-[1440px] mx-auto">
        <div className="rounded-3xl p-10 sm:p-16 bg-[#07131e] border-2 border-[#00f5d4]/40 text-center space-y-6 shadow-[0_0_100px_rgba(0,245,212,0.15)]">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            {isAr ? "جاهز لنقل عملياتك للمستقبل؟" : "Ready to Automate at Scale?"}
          </h2>
          <p className="text-base text-gray-300 max-w-xl mx-auto">
            {isAr
              ? "تواصل مع مهندسينا لنبني معاً منظومة الأتمتة التي تضاعف أرباحك وتلغي المهام المتكررة."
              : "Connect with our engineering team to architect autonomous workflows that multiply output."}
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-[#008688] to-[#00f5d4] text-[#020408] font-black text-xs uppercase tracking-widest shadow-[0_0_35px_rgba(0,245,212,0.4)] hover:scale-105 transition-all"
            >
              <span>{isAr ? "تحدث مع مهندسينا الآن" : "START YOUR TRANSFORMATION"}</span>
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#020306] py-12 px-6 lg:px-16 text-xs font-mono text-gray-400">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-36">
              <Image src="/tahseen-logo.png?v=4" alt="Tahseen AI" fill className="object-contain object-left" />
            </div>
            <span className="text-gray-500">© 2026 Tahseen AI Group</span>
          </div>
          <div className="flex items-center gap-6 text-gray-400">
            <span>Riyadh, Kingdom of Saudi Arabia</span>
            <span className="text-[#00f5d4]">Saudi Vision 2030</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
