"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroRing3DProps {
  mirrored?: boolean;
}

export default function HeroRing3D({ mirrored = false }: HeroRing3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const initialW = container.clientWidth || window.innerWidth;
    const initialH = container.clientHeight || 550;
    const isMobileInitial = initialW < 640;

    const camera = new THREE.PerspectiveCamera(
      isMobileInitial ? 46 : 36,
      initialW / initialH,
      0.1,
      1000
    );
    camera.position.set(0, 0, isMobileInitial ? 11.8 : 10.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(initialW, initialH);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // --- 2. Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0x020712, 1.2);
    scene.add(ambientLight);

    const textKeyLight = new THREE.PointLight(0x00f5d4, 15.0, 50, 1.1);
    textKeyLight.position.set(mirrored ? 6.0 : -6.0, -3.0, 1.2);
    textKeyLight.castShadow = true;
    scene.add(textKeyLight);

    const textDirLight = new THREE.DirectionalLight(0x38bdf8, 3.8);
    textDirLight.position.set(mirrored ? 6.0 : -6.0, -1.5, 1.5);
    scene.add(textDirLight);

    const rightRimLight = new THREE.PointLight(0x06b6d4, 8.5, 35);
    rightRimLight.position.set(mirrored ? -6.0 : 6.0, 5.0, 2.0);
    scene.add(rightRimLight);

    const topHighlight = new THREE.DirectionalLight(0xe0ffff, 2.2);
    topHighlight.position.set(mirrored ? -4.0 : 4.0, 8.0, 6.0);
    scene.add(topHighlight);

    // --- 3. 3D Ring Construction (Elevated & Refined Scaling) ---
    const heroGroup = new THREE.Group();
    const width = window.innerWidth;
    const isDesktop = width >= 1024;
    const isTablet = width >= 640 && width < 1024;
    
    const ringBaseX = 3.91;
    const ringBaseY = 0.90;
    const ringBaseZ = 0.0;
    const ringBaseScale = 0.78;

    heroGroup.position.set(
      isDesktop ? (mirrored ? -ringBaseX : ringBaseX) : 0,
      isDesktop ? ringBaseY : isTablet ? 0.75 : 0.65,
      ringBaseZ
    );
    heroGroup.scale.setScalar(isDesktop ? ringBaseScale : isTablet ? 0.62 : 0.50);
    scene.add(heroGroup);

    const baseRotX = -0.59;
    const baseRotY = -0.66;
    const baseRotZ = -0.99;
    heroGroup.rotation.set(
      baseRotX,
      mirrored ? -baseRotY : baseRotY,
      mirrored ? -baseRotZ : baseRotZ
    );

    // --- Custom Hollow Ring Perimeter Glow Shader ---
    const glowUniforms = {
      glowColor: { value: new THREE.Color(0x00f5d4) },
      intensity: { value: 0.15 },
      innerRadius: { value: 0.36 },
      outerRadius: { value: 1.1 },
      glowSoftness: { value: 3.5 },
      pulseTime: { value: 0.0 },
    };

    const ringGlowShader = new THREE.ShaderMaterial({
      uniforms: glowUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 glowColor;
        uniform float intensity;
        uniform float innerRadius;
        uniform float outerRadius;
        uniform float glowSoftness;
        uniform float pulseTime;

        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center) * 2.0;
          
          float midRadius = (innerRadius + outerRadius) * 0.5;
          float halfWidth = (outerRadius - innerRadius) * 0.5;
          float distFromMid = abs(dist - midRadius);
          
          float alpha = smoothstep(halfWidth, 0.0, distFromMid);
          alpha = pow(alpha, glowSoftness);
          
          float pulse = 1.0 + sin(pulseTime * 2.5) * 0.12;
          float finalAlpha = alpha * intensity * pulse;

          gl_FragColor = vec4(glowColor, clamp(finalAlpha, 0.0, 1.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const ringGlowGeom = new THREE.PlaneGeometry(8.2, 8.2);
    const ringGlowMesh = new THREE.Mesh(ringGlowGeom, ringGlowShader);
    ringGlowMesh.position.set(0, 0, -0.08);
    heroGroup.add(ringGlowMesh);

    // --- Materials (Switched for Arabic RTL when mirrored) ---
    const illuminatedColor = mirrored ? 0x00d2b4 : 0x00f5d4;
    const shadedColor = mirrored ? 0x00f5d4 : 0x00d2b4;

    const illuminatedMaterial = new THREE.MeshPhysicalMaterial({
      color: illuminatedColor,
      emissive: 0x003830,
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 0.95,
      side: THREE.DoubleSide,
    });

    const shadedMaterial = new THREE.MeshPhysicalMaterial({
      color: shadedColor,
      emissive: 0x002c25,
      emissiveIntensity: 0.18,
      roughness: 0.16,
      metalness: 0.48,
      clearcoat: 0.6,
      side: THREE.DoubleSide,
    });

    const sideCapMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00f5d4,
      emissive: 0x00e5be,
      emissiveIntensity: 0.4,
      roughness: 0.12,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });

    // --- Lathe Geometry ---
    const innerR = 1.8;
    const outerR = 2.6;
    const ringDepth = 0.74;
    const halfDepth = ringDepth / 2;
    const bevel = 0.03;

    const profilePoints = [
      new THREE.Vector2(innerR, -halfDepth + bevel),
      new THREE.Vector2(innerR + bevel, -halfDepth),
      new THREE.Vector2(outerR - bevel, -halfDepth),
      new THREE.Vector2(outerR, -halfDepth + bevel),
      new THREE.Vector2(outerR, halfDepth - bevel),
      new THREE.Vector2(outerR - bevel, halfDepth),
      new THREE.Vector2(innerR + bevel, halfDepth),
      new THREE.Vector2(innerR, halfDepth - bevel),
      new THREE.Vector2(innerR, -halfDepth + bevel),
    ];

    const segments = 64;
    const gapAngle = 0.06;
    const arcLength = Math.PI - gapAngle;

    // Top Half
    const topGeom = new THREE.LatheGeometry(
      profilePoints,
      segments,
      gapAngle / 2,
      arcLength
    );
    topGeom.computeVertexNormals();
    const topMesh = new THREE.Mesh(topGeom, shadedMaterial);
    topMesh.rotation.x = Math.PI / 2;
    topMesh.position.set(0, 0.025, 0);
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    heroGroup.add(topMesh);

    // Bottom Half
    const botGeom = new THREE.LatheGeometry(
      profilePoints,
      segments,
      Math.PI + gapAngle / 2,
      arcLength
    );
    botGeom.computeVertexNormals();
    const botMesh = new THREE.Mesh(botGeom, illuminatedMaterial);
    botMesh.rotation.x = Math.PI / 2;
    botMesh.position.set(0, 0.015, 0);
    botMesh.castShadow = true;
    botMesh.receiveShadow = true;
    heroGroup.add(botMesh);

    // End Caps
    const capWidth = outerR - innerR;
    const capHeight = ringDepth;
    const capGeom = new THREE.PlaneGeometry(capWidth, capHeight);
    const midR = (innerR + outerR) / 2;

    function createCutCap(angle: number) {
      const cap = new THREE.Mesh(capGeom, sideCapMaterial);
      cap.position.set(midR * Math.cos(angle), 0, midR * Math.sin(angle));
      cap.rotation.y = -angle + Math.PI / 2;
      return cap;
    }

    topMesh.add(createCutCap(gapAngle / 2));
    topMesh.add(createCutCap(Math.PI - gapAngle / 2));
    botMesh.add(createCutCap(Math.PI + gapAngle / 2));
    botMesh.add(createCutCap(Math.PI * 2 - gapAngle / 2));

    const glowPulseSpeed = 1.7;

    // --- 4. Digital Particle Wave (Tuned to HBD Reference) ---
    const numStrands = 43;
    const ptsPerStrand = 270;
    const totalParticles = numStrands * ptsPerStrand;

    const waveGeom = new THREE.BufferGeometry();
    let lineGeom: THREE.BufferGeometry | null = null;
    const positions = new Float32Array(totalParticles * 3);
    const alphas = new Float32Array(totalParticles);
    const sizes = new Float32Array(totalParticles);

    const strandSpread = 15.0;
    const waveArcHeight = 1.4;
    const waveArcCenter = isMobileInitial ? 0.1 : -0.5;
    const waveTwist = 0.8;
    const gridWidth = 81.0;

    const sparkleChance = 0.07;
    const sparkleSizeMult = 3.8;
    const filamentSize = 0.16;
    const sparkleBrightness = 0.9;
    const filamentBrightness = 0.85;

    const leftFadeStart = -0.1;
    const leftFadeEnd = -0.1;
    const leftFadePower = 1.95;

    const rightFadeStart = 0.2;
    const rightFadeEnd = 1.0;
    const rightFadePower = 1.5;

    const waveElevationY = isMobileInitial ? -1.85 : -2.35;
    const waveAmplitude = isMobileInitial ? 0.68 : 0.65;
    const waveSpeed = 0.6;
    const depthFadePower = 0.5;

    function computeLeftFade(uNorm: number) {
      if (leftFadeEnd <= leftFadeStart) {
        return uNorm >= leftFadeEnd ? 1.0 : 0.0;
      }
      if (uNorm <= leftFadeStart) return 0.0;
      if (uNorm >= leftFadeEnd) return 1.0;
      const t = (uNorm - leftFadeStart) / (leftFadeEnd - leftFadeStart);
      const smooth = t * t * (3.0 - 2.0 * t);
      return Math.pow(Math.max(0.0, Math.min(1.0, smooth)), leftFadePower);
    }

    function computeRightFade(uNorm: number) {
      if (rightFadeEnd <= rightFadeStart) {
        return uNorm <= rightFadeStart ? 1.0 : 0.0;
      }
      if (uNorm <= rightFadeStart) return 1.0;
      if (uNorm >= rightFadeEnd) return 0.0;
      const t = (rightFadeEnd - uNorm) / (rightFadeEnd - rightFadeStart);
      const smooth = t * t * (3.0 - 2.0 * t);
      return Math.pow(Math.max(0.0, Math.min(1.0, smooth)), rightFadePower);
    }

    function getHorizontalFade(uNorm: number) {
      return uNorm < 0.0 ? computeLeftFade(uNorm) : computeRightFade(uNorm);
    }

    function pseudoRandom(seed: number) {
      const x = Math.sin(seed * 9999) * 10000;
      return x - Math.floor(x);
    }

    const buildWavePositions = (mobile: boolean) => {
      const elevation = mobile ? -1.85 : -2.35;
      const amp = mobile ? 0.68 : 0.65;
      const arcCenter = mobile ? 0.1 : -0.5;

      let pIdx = 0;
      for (let s = 0; s < numStrands; s++) {
        const vNorm = (s / (numStrands - 1)) * 2.0 - 1.0;
        const strandZOffset = vNorm * (strandSpread * 0.5) - 3.8;

        for (let p = 0; p < ptsPerStrand; p++) {
          const uNorm = (p / (ptsPerStrand - 1)) * 2.0 - 1.0;
          const uZeroToOne = p / (ptsPerStrand - 1);

          const x = (mirrored ? -uNorm : uNorm) * (gridWidth * 0.5);

          const zCurve = Math.sin(uZeroToOne * Math.PI) * 2.8;
          const z = strandZOffset + zCurve;

          const fadeX = getHorizontalFade(uNorm);

          const fadeZ = Math.cos(vNorm * Math.PI * 0.5);
          const depthFade = Math.pow(Math.max(0.0, fadeZ), depthFadePower);

          const totalEdgeFade = fadeX * depthFade;

          const arcPhase = (x - (mirrored ? -arcCenter : arcCenter)) / 18.0;
          const risingArch = Math.exp(-arcPhase * arcPhase) * waveArcHeight;

          const undulatingWave =
            Math.sin(p * 0.08 + s * 0.22) * amp +
            Math.cos(s * 0.16) * 0.45;

          const strandTwist = vNorm * waveTwist * Math.sin(uZeroToOne * Math.PI);
          const diagonalLift = (uNorm + 0.3) * 1.25;

          const y = elevation + (risingArch + undulatingWave + strandTwist + diagonalLift) * totalEdgeFade;

          positions[pIdx * 3] = x;
          positions[pIdx * 3 + 1] = y;
          positions[pIdx * 3 + 2] = z;

          const randVal = pseudoRandom(pIdx * 17 + s * 131 + p * 3);
          const isSparkle = randVal < sparkleChance;

          if (isSparkle) {
            alphas[pIdx] = totalEdgeFade * sparkleBrightness;
            sizes[pIdx] = Math.max(0.08, totalEdgeFade * filamentSize * sparkleSizeMult);
          } else {
            alphas[pIdx] = totalEdgeFade * filamentBrightness;
            sizes[pIdx] = Math.max(0.02, totalEdgeFade * filamentSize);
          }

          pIdx++;
        }
      }

      if (waveGeom.attributes.position) {
        waveGeom.attributes.position.needsUpdate = true;
        waveGeom.attributes.alpha.needsUpdate = true;
        waveGeom.attributes.size.needsUpdate = true;
      }
      if (lineGeom && lineGeom.attributes.position) {
        lineGeom.attributes.position.needsUpdate = true;
        lineGeom.attributes.alpha.needsUpdate = true;
      }
    };

    buildWavePositions(isMobileInitial);

    waveGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeom.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
    waveGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const pCanvas = document.createElement("canvas");
    pCanvas.width = 128;
    pCanvas.height = 128;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const pGrad = pCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      pGrad.addColorStop(0.00, "rgba(255, 255, 255, 1.0)");
      pGrad.addColorStop(0.18, "rgba(0, 245, 212, 1.0)");
      pGrad.addColorStop(0.42, "rgba(0, 180, 216, 0.85)");
      pGrad.addColorStop(0.70, "rgba(0, 134, 136, 0.35)");
      pGrad.addColorStop(1.00, "rgba(0, 0, 0, 0.0)");
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, 128, 128);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const waveShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: pTexture },
        uTime: { value: 0.0 },
        uWaveSpeed: { value: waveSpeed },
      },
      vertexShader: `
        attribute float alpha;
        attribute float size;
        varying float vAlpha;
        uniform float uTime;
        uniform float uWaveSpeed;
        
        void main() {
          vAlpha = alpha;
          
          vec3 pos = position;
          float wave = sin(pos.x * 0.22 + uTime * uWaveSpeed * 1.1 + pos.z * 0.14) * 0.38 +
                       cos(pos.z * 0.20 + uTime * uWaveSpeed * 0.85) * 0.25;
          pos.y += wave * (0.25 + alpha * 0.75);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (390.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          if (texColor.a < 0.02) discard;
          gl_FragColor = vec4(texColor.rgb, texColor.a * vAlpha * 0.98);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveParticleSystem = new THREE.Points(waveGeom, waveShaderMaterial);
    scene.add(waveParticleSystem);

    // --- 4b. Faint Architectural Gridlines in Between Particles ---
    const lineIndices: number[] = [];

    // Longitudinal gridlines (along each strand)
    for (let s = 0; s < numStrands; s++) {
      for (let p = 0; p < ptsPerStrand - 1; p++) {
        const idx1 = s * ptsPerStrand + p;
        const idx2 = s * ptsPerStrand + p + 1;
        lineIndices.push(idx1, idx2);
      }
    }

    // Transverse cross-gridlines (across adjacent strands every 3 points)
    const crossStep = 3;
    for (let p = 0; p < ptsPerStrand; p += crossStep) {
      for (let s = 0; s < numStrands - 1; s++) {
        const idx1 = s * ptsPerStrand + p;
        const idx2 = (s + 1) * ptsPerStrand + p;
        lineIndices.push(idx1, idx2);
      }
    }

    lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", waveGeom.getAttribute("position"));
    lineGeom.setAttribute("alpha", waveGeom.getAttribute("alpha"));
    lineGeom.setIndex(lineIndices);

    const lineShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uWaveSpeed: { value: waveSpeed },
        uLineColor: { value: new THREE.Color(0x00d2b4) },
        uLineOpacity: { value: 0.14 },
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        uniform float uTime;
        uniform float uWaveSpeed;
        
        void main() {
          vAlpha = alpha;
          
          vec3 pos = position;
          float wave = sin(pos.x * 0.22 + uTime * uWaveSpeed * 1.1 + pos.z * 0.14) * 0.38 +
                       cos(pos.z * 0.20 + uTime * uWaveSpeed * 0.85) * 0.25;
          pos.y += wave * (0.25 + alpha * 0.75);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uLineColor;
        uniform float uLineOpacity;
        varying float vAlpha;
        
        void main() {
          if (vAlpha < 0.02) discard;
          gl_FragColor = vec4(uLineColor, vAlpha * uLineOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const waveLineMesh = new THREE.LineSegments(lineGeom, lineShaderMaterial);
    scene.add(waveLineMesh);

    // --- 5. Cursor Parallax Tracking ---
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Screen-wide normalized mouse coordinates [-1, 1]
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX = Math.max(-1, Math.min(1, x));
      mouseY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- 6. Resize Observer with Adaptive Viewport for Mobile, Tablet, Laptop & 4K ---
    let isCurrentDesktop = window.innerWidth >= 1024;
    let isCurrentTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    let responsiveScale = ringBaseScale;
    let responsiveBaseX = ringBaseX;
    let responsiveBaseY = ringBaseY;

    let lastWasMobile = isMobileInitial;

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 550;
      const isMobile = w < 640;
      isCurrentDesktop = w >= 1024;
      isCurrentTablet = w >= 640 && w < 1024;

      if (isMobile !== lastWasMobile) {
        lastWasMobile = isMobile;
        buildWavePositions(isMobile);
      }

      camera.fov = isMobile ? 46 : isCurrentTablet ? 40 : 36;
      camera.position.set(0, 0, isMobile ? 11.8 : isCurrentTablet ? 11.0 : 10.5);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate safe visible boundaries to prevent edge clipping on 1024px-1366px screens
      const halfVisibleWidth = camera.aspect * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const maxSafeX = Math.max(2.2, halfVisibleWidth - 1.55);

      if (isCurrentDesktop) {
        responsiveBaseX = Math.min(ringBaseX, maxSafeX);
        responsiveBaseY = ringBaseY;
        responsiveScale = ringBaseScale;
      } else if (isCurrentTablet) {
        responsiveBaseX = 0.55;
        responsiveBaseY = -0.10;
        responsiveScale = 0.52;
      } else {
        // Mobile phone coordinates: in Arabic, center ring in open lower area to prevent text overlap
        responsiveBaseX = mirrored ? 0.0 : 0.5;
        responsiveBaseY = mirrored ? -1.10 : 0.75;
        responsiveScale = 0.44;
      }

      heroGroup.scale.setScalar(responsiveScale);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    handleResize();

    // --- 7. Animation Loop with In-Place Circular Orbit & Parallax ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      waveShaderMaterial.uniforms.uTime.value = elapsedTime;
      lineShaderMaterial.uniforms.uTime.value = elapsedTime;
      glowUniforms.pulseTime.value = elapsedTime * glowPulseSpeed;

      // 1. Smooth In-Place Circular Motion (Orbit in XY plane)
      const orbitSpeed = 1.15;
      const totalOrbitAngle = elapsedTime * orbitSpeed;
      
      const inPlaceCircleX = Math.cos(totalOrbitAngle) * 0.16;
      const inPlaceCircleY = Math.sin(totalOrbitAngle) * 0.20;

      // Gyroscopic in-place subtle tilt
      const inPlaceTiltX = Math.sin(totalOrbitAngle) * 0.04;
      const inPlaceTiltY = Math.cos(totalOrbitAngle) * 0.04;

      // 2. Cursor Parallax + In-Place Circular Rotation (Mirrored angle in RTL)
      const activeRotX = baseRotX;
      const activeRotY = mirrored ? -baseRotY : baseRotY;
      const activeRotZ = mirrored ? -baseRotZ : baseRotZ;

      const targetRotX = activeRotX + (-mouseY * 0.26) + inPlaceTiltX;
      const targetRotY = activeRotY + (mouseX * 0.30 * (mirrored ? -1 : 1)) + inPlaceTiltY * (mirrored ? -1 : 1);
      const targetRotZ = activeRotZ + (-mouseX * 0.10 * (mirrored ? -1 : 1)) + inPlaceCircleX * 0.15 * (mirrored ? -1 : 1);

      // 3. Position: Base Position + In-Place Circular Movement + Cursor Parallax (NO Z pushback)
      const baseX = mirrored ? -responsiveBaseX : responsiveBaseX;
      const baseY = responsiveBaseY;
      
      const targetPosX = baseX + inPlaceCircleX + (mouseX * 0.30);
      const targetPosY = baseY + inPlaceCircleY + (-mouseY * 0.22);
      const targetPosZ = ringBaseZ;

      // 4. Smooth Damped Interpolation (Lerp)
      heroGroup.rotation.x += (targetRotX - heroGroup.rotation.x) * 0.06;
      heroGroup.rotation.y += (targetRotY - heroGroup.rotation.y) * 0.06;
      heroGroup.rotation.z += (targetRotZ - heroGroup.rotation.z) * 0.06;

      heroGroup.position.x += (targetPosX - heroGroup.position.x) * 0.06;
      heroGroup.position.y += (targetPosY - heroGroup.position.y) * 0.06;
      heroGroup.position.z += (targetPosZ - heroGroup.position.z) * 0.06;

      // Apply dynamic scale
      heroGroup.scale.setScalar(responsiveScale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      waveGeom.dispose();
      waveShaderMaterial.dispose();
      lineGeom.dispose();
      lineShaderMaterial.dispose();
      ringGlowGeom.dispose();
      ringGlowShader.dispose();
      pTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mirrored]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
