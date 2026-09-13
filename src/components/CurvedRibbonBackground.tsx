"use client";

import { useEffect, useRef } from "react";

interface PathSample {
  d: number;
  x: number;
  y: number;
}

export default function CurvedRibbonBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const particleSvgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const companionPathRef = useRef<SVGPathElement>(null);
  const particleGroupRef = useRef<SVGGElement>(null);
  const trail1Ref = useRef<SVGCircleElement>(null);
  const trail2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parent = container.parentElement || container;

    let pathLength = 0;
    const lookup: PathSample[] = [];

    const buildPath = () => {
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || 5000;

      if (svgRef.current) {
        svgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }
      if (particleSvgRef.current) {
        particleSvgRef.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      }

      const pRect = parent.getBoundingClientRect();

      // Major sections to flow through top to bottom
      const sectionIds = [
        "services",
        "insights",
        "solutions",
        "education",
        "about",
        "testimonials",
        "ehsan",
        "faq",
        "cta",
      ];

      const points: Array<[number, number]> = [];

      // 1. Entry point right at the top tip of the line (top of services)
      const servicesEl = document.getElementById("services");
      const firstY = servicesEl
        ? servicesEl.getBoundingClientRect().top - pRect.top + 20
        : 35;
      points.push([w * 0.08, Math.max(25, firstY)]);

      sectionIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const topRel = rect.top - pRect.top;
          const midY = topRel + rect.height * 0.50;

          // Snake between right (0.92) and left (0.08) around content boundaries
          const isRight = idx % 2 === 0;
          const xMargin = isRight ? w * 0.92 : w * 0.08;
          points.push([xMargin, midY]);
        } else {
          const frac = (idx + 1) / (sectionIds.length + 1);
          const isRight = idx % 2 === 0;
          points.push([isRight ? w * 0.90 : w * 0.10, h * frac]);
        }
      });

      // Exit point towards footer bottom center
      points.push([w * 0.5, h - 45]);

      // Catmull-Rom to Cubic Bezier spline for flowing curvature
      const n = points.length;
      let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
      let compD = `M ${(points[0][0] + 32).toFixed(1)} ${(points[0][1] - 18).toFixed(1)}`;

      const tension = 0.24;

      for (let i = 0; i < n - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(n - 1, i + 2)];

        // Main curve control points
        const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
        const cp1y = p1[1] + (p2[1] - p0[1]) * tension;
        const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
        const cp2y = p2[1] - (p3[1] - p1[1]) * tension;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;

        // Offset companion path for architectural ribbon contour
        const offset = i % 2 === 0 ? -48 : 48;
        const c_cp1x = cp1x + offset;
        const c_cp2x = cp2x + offset;
        const c_p2x = p2[0] + offset;

        compD += ` C ${c_cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${c_cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${c_p2x.toFixed(1)} ${p2[1].toFixed(1)}`;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", d);
        pathLength = pathRef.current.getTotalLength() || 1;
      }
      if (pathGlowRef.current) {
        pathGlowRef.current.setAttribute("d", d);
      }
      if (companionPathRef.current) {
        companionPathRef.current.setAttribute("d", compD);
      }

      // Precalculate high-density lookup table along the path (500 samples)
      lookup.length = 0;
      if (pathRef.current && pathLength > 0) {
        const sampleCount = 500;
        for (let i = 0; i <= sampleCount; i++) {
          const dist = (i / sampleCount) * pathLength;
          const pt = pathRef.current.getPointAtLength(dist);
          lookup.push({ d: dist, x: pt.x, y: pt.y });
        }
      }
    };

    buildPath();

    // ResizeObserver for dynamic layout updates
    const resizeObserver = new ResizeObserver(() => {
      buildPath();
      updateParticle();
    });
    resizeObserver.observe(parent);

    // Scroll tracking: Starts at the very top of the line, and moves continuously
    // so it is ALWAYS visible on screen as the user scrolls through the sections
    const updateParticle = () => {
      if (
        !pathRef.current ||
        !particleGroupRef.current ||
        pathLength <= 0 ||
        lookup.length === 0
      )
        return;

      const pRect = parent.getBoundingClientRect();
      const scrollDown = -pRect.top; // Pixels user has scrolled into this container
      const hWindow = window.innerHeight || 800;

      // 1. Target Y calculation:
      // When above services or in Hero (scrollDown <= 0):
      // Target Y is strictly the very first point (top of the line).
      // As the user scrolls down, targetY smoothly transitions to optical screen center
      // (hWindow * 0.45), guaranteeing the particle stays VISIBLE on screen the whole journey!
      let targetY: number;
      if (scrollDown <= 0) {
        targetY = lookup[0].y;
      } else {
        const screenOffset = Math.min(hWindow * 0.45, scrollDown * 0.75);
        targetY = Math.min(lookup[lookup.length - 1].y, scrollDown + screenOffset);
      }

      // 2. Find closest sample along the curve with sub-pixel interpolation
      let bestIdx = 0;
      let minDiff = Infinity;
      for (let i = 0; i < lookup.length; i++) {
        const diff = Math.abs(lookup[i].y - targetY);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      }

      let bestDist = lookup[bestIdx].d;
      if (bestIdx > 0 && bestIdx < lookup.length - 1) {
        const nextIdx = lookup[bestIdx].y < targetY ? bestIdx + 1 : bestIdx - 1;
        const p1 = lookup[Math.min(bestIdx, nextIdx)];
        const p2 = lookup[Math.max(bestIdx, nextIdx)];
        const dy = p2.y - p1.y;
        if (Math.abs(dy) > 0.1) {
          const t = Math.max(0, Math.min(1, (targetY - p1.y) / dy));
          bestDist = p1.d + t * (p2.d - p1.d);
        }
      }

      const pt = pathRef.current.getPointAtLength(bestDist);

      particleGroupRef.current.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(1)}, ${pt.y.toFixed(1)})`
      );

      // Trailing subtle dark teal sparkles (follow behind along the curve when moving)
      const isMoving = scrollDown > 20;

      if (trail1Ref.current) {
        if (isMoving) {
          const pt1 = pathRef.current.getPointAtLength(Math.max(0, bestDist - 32));
          trail1Ref.current.setAttribute("cx", pt1.x.toFixed(1));
          trail1Ref.current.setAttribute("cy", pt1.y.toFixed(1));
          trail1Ref.current.style.opacity = "0.55";
        } else {
          trail1Ref.current.style.opacity = "0";
        }
      }

      if (trail2Ref.current) {
        if (isMoving && scrollDown > 60) {
          const pt2 = pathRef.current.getPointAtLength(Math.max(0, bestDist - 64));
          trail2Ref.current.setAttribute("cx", pt2.x.toFixed(1));
          trail2Ref.current.setAttribute("cy", pt2.y.toFixed(1));
          trail2Ref.current.style.opacity = "0.35";
        } else {
          trail2Ref.current.style.opacity = "0";
        }
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParticle();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial position: placed directly at the top of the line
    updateParticle();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
    >
      {/* Faint Big Architectural Gridlines (Rest of Webpage Background, Excludes Hero) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(255, 255, 255, 0.032) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.032) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      {/* 1. Background Route Curves & Halos (Z-0) */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Luminous Line Glow Filter */}
          <filter id="routeGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Continuous Luminous Gradient across the Journey */}
          <linearGradient id="routeGradientStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#008688" stopOpacity="0.4" />
            <stop offset="15%" stopColor="#008688" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#00a8aa" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#008688" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#00a8aa" stopOpacity="0.85" />
            <stop offset="90%" stopColor="#008688" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#008688" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Subtle Ambient Glow Halo along the journey */}
        <path
          ref={pathGlowRef}
          fill="none"
          stroke="#008688"
          strokeWidth="10"
          opacity="0.30"
          filter="url(#routeGlowFilter)"
        />

        {/* Core Luminous Journey Line flowing top to bottom through sections */}
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#routeGradientStroke)"
          strokeWidth="2.6"
        />

        {/* Architectural Dashed Companion Guideline */}
        <path
          ref={companionPathRef}
          fill="none"
          stroke="#008688"
          strokeWidth="1.2"
          strokeDasharray="6 4"
          opacity="0.45"
        />
      </svg>

      {/* 2. Elevated Floating Dark Teal Particle (Z-20, Starts at top of line & stays visible on screen) */}
      <svg
        ref={particleSvgRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Dark Teal Ambient Glow */}
          <filter id="darkTealGlowFilter" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Reduced Brightness Dark Teal Radial Gradient */}
          <radialGradient id="darkTealParticleAura">
            <stop offset="0%" stopColor="#00a8aa" stopOpacity="0.80" />
            <stop offset="35%" stopColor="#008688" stopOpacity="0.55" />
            <stop offset="75%" stopColor="#005a5b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#008688" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Trailing subtle dark teal sparkles */}
        <circle
          ref={trail1Ref}
          r="3.5"
          fill="#008688"
          opacity="0"
          className="transition-opacity duration-300"
        />
        <circle
          ref={trail2Ref}
          r="2.5"
          fill="#008688"
          opacity="0"
          className="transition-opacity duration-300"
        />

        {/* The Traveling Dark Teal Particle (Starts at top of line) */}
        <g ref={particleGroupRef} className="transition-opacity duration-300">
          {/* Soft Dark Teal Ambient Halo */}
          <circle r="22" fill="url(#darkTealParticleAura)" opacity="0.6" />
          {/* Subtle Dark Teal Glow Corona */}
          <circle
            r="8.5"
            fill="#008688"
            opacity="0.8"
            filter="url(#darkTealGlowFilter)"
          />
          {/* Solid Dark Teal Core with Gentle Highlight */}
          <circle r="5" fill="#008688" />
          <circle r="2" fill="#00b4b6" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}
