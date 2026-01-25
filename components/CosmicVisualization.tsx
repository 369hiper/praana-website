import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

const NARRATIVE_TEXTS = [
  { title: 'Neural Symphony', subtitle: 'The cosmos begins within your mind' },
  { title: 'Atomic Dance', subtitle: 'Quantum particles weave reality\'s fabric' },
  { title: 'Molecular Poetry', subtitle: 'DNA spirals mirror galactic arms' },
  { title: 'Sacred Patterns', subtitle: 'Ancient geometry in all creation' },
  { title: 'PEMF Resonance', subtitle: 'Healing frequencies of the universe' },
  { title: 'Galactic Unity', subtitle: 'As above, so below — you are stardust' },
];

const CosmicVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Global mouse tracking (works even before Three.js loads)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkThreeJS = () => {
      attempts++;
      if (window.THREE) {
        try {
          initScene();
          setIsLoaded(true);
        } catch (error) {
          console.error('CosmicVisualization: Error initializing scene:', error);
        }
      } else if (attempts < maxAttempts) {
        setTimeout(checkThreeJS, 100);
      } else {
        console.warn('CosmicVisualization: Three.js failed to load after 5 seconds');
      }
    };

    checkThreeJS();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  const initScene = () => {
    const THREE = window.THREE;
    const container = containerRef.current!;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
    container.appendChild(canvas);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 8;

    let time = 0;
    let phase = 0;
    const smoothMouse = { x: 0, y: 0 };

    // ==================== GALAXY (50,000 particles) ====================
    const galaxyCount = 50000;
    const galaxyGeo = new THREE.BufferGeometry();
    const gPos = new Float32Array(galaxyCount * 3);
    const gCol = new Float32Array(galaxyCount * 3);
    const gSize = new Float32Array(galaxyCount);

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.pow(Math.random(), 0.5) * 12;
      const spin = radius * 2.5;
      const branch = (i % 5) * (Math.PI * 2 / 5);
      const scatter = Math.pow(radius / 12, 2) * 3;
      
      gPos[i * 3] = Math.cos(branch + spin) * radius + (Math.random() - 0.5) * scatter;
      gPos[i * 3 + 1] = (Math.random() - 0.5) * scatter * 0.5;
      gPos[i * 3 + 2] = Math.sin(branch + spin) * radius + (Math.random() - 0.5) * scatter;

      const mix = radius / 12;
      gCol[i * 3] = 0 + mix * 0.5;
      gCol[i * 3 + 1] = 1 - mix * 0.3;
      gCol[i * 3 + 2] = 0.8 + mix * 0.2;

      gSize[i] = Math.random() * 0.012 + 0.004;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3));
    galaxyGeo.setAttribute('aSize', new THREE.BufferAttribute(gSize, 1));

    const galaxyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Swirl
          float angle = uTime * 0.12 + length(pos.xz) * 0.25;
          float c = cos(angle), s = sin(angle);
          pos.xz = mat2(c, -s, s, c) * pos.xz;
          
          // Breathing
          pos *= 1.0 + sin(uTime * 0.4 + length(pos) * 0.3) * 0.06;
          
          // Mouse attraction - STRONG effect
          vec3 mousePos = vec3(uMouse.x * 5.0, uMouse.y * 4.0, 0.0);
          vec3 toMouse = mousePos - pos;
          float dist = length(toMouse);
          float attraction = 1.5 / (1.0 + dist * 0.3);
          pos += normalize(toMouse) * attraction;
          
          // Ripple from mouse
          pos.y += sin(dist * 0.8 - uTime * 2.0) * 0.2 * (1.0 / (1.0 + dist * 0.2));
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (280.0 / -mv.z) * uPixelRatio;
          gl_Position = projectionMatrix * mv;
          
          vAlpha = 0.65 + sin(uTime * 0.5) * 0.15;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 1.6);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
    scene.add(galaxy);

    // ==================== DNA HELIX (15,000 x 2) ====================
    const createDNA = (offset: number, c1: number[], c2: number[]) => {
      const count = 15000;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 20;
        const r = 0.6 + Math.sin(t * 0.12) * 0.2;
        
        pos[i * 3] = r * Math.cos(t + offset);
        pos[i * 3 + 1] = (t / (Math.PI * 20)) * 8 - 4;
        pos[i * 3 + 2] = r * Math.sin(t + offset);
        
        const g = i / count;
        col[i * 3] = c1[0] + (c2[0] - c1[0]) * g;
        col[i * 3 + 1] = c1[1] + (c2[1] - c1[1]) * g;
        col[i * 3 + 2] = c1[2] + (c2[2] - c1[2]) * g;
        
        sizes[i] = 0.012 + Math.random() * 0.012;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
      return geo;
    };

    const dnaMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          float angle = uTime * 0.35;
          float c = cos(angle), s = sin(angle);
          pos.xz = mat2(c, -s, s, c) * pos.xz;
          
          pos *= 1.0 + sin(uTime * 2.0 + position.y * 1.5) * 0.03;
          
          // Mouse attraction
          vec3 mousePos = vec3(uMouse.x * 4.0, uMouse.y * 3.0, 0.0);
          vec3 toMouse = mousePos - pos;
          float dist = length(toMouse);
          pos += normalize(toMouse) * 0.8 / (1.0 + dist * 0.4);
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (200.0 / -mv.z) * uPixelRatio;
          gl_Position = projectionMatrix * mv;
          
          vAlpha = 0.7 + sin(uTime * 2.5 + position.y) * 0.3;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 2.0);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const dna1 = new THREE.Points(createDNA(0, [0, 1, 0.7], [0, 0.8, 1]), dnaMat);
    const dna2 = new THREE.Points(createDNA(Math.PI, [0.5, 1, 0.3], [0, 1, 0.5]), dnaMat.clone());
    scene.add(dna1);
    scene.add(dna2);

    // ==================== SACRED GEOMETRY (10,000) ====================
    const sacredCount = 10000;
    const sacredGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(sacredCount * 3);
    const sCol = new Float32Array(sacredCount * 3);
    const sSize = new Float32Array(sacredCount);

    const circles: {x: number, y: number}[] = [{ x: 0, y: 0 }];
    for (let ring = 1; ring <= 2; ring++) {
      for (let i = 0; i < ring * 6; i++) {
        const a = (i / (ring * 6)) * Math.PI * 2;
        circles.push({ x: Math.cos(a) * ring * 1.2, y: Math.sin(a) * ring * 1.2 });
      }
    }

    for (let i = 0; i < sacredCount; i++) {
      const c = circles[Math.floor(Math.random() * circles.length)];
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.2;
      
      sPos[i * 3] = c.x + Math.cos(a) * r;
      sPos[i * 3 + 1] = c.y + Math.sin(a) * r;
      sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      const golden = Math.random() > 0.4;
      sCol[i * 3] = golden ? 1.0 : 0.85;
      sCol[i * 3 + 1] = golden ? 0.85 : 0.65;
      sCol[i * 3 + 2] = golden ? 0.4 : 0.95;
      
      sSize[i] = 0.01 + Math.random() * 0.012;
    }

    sacredGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    sacredGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
    sacredGeo.setAttribute('aSize', new THREE.BufferAttribute(sSize, 1));

    const sacredMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uOpacity: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uOpacity;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          float angle = uTime * 0.18;
          float c = cos(angle), s = sin(angle);
          pos.xy = mat2(c, -s, s, c) * pos.xy;
          
          pos *= 1.0 + sin(uTime * 1.0) * 0.1;
          pos.z += sin(length(pos.xy) * 1.2 - uTime * 1.2) * 0.35;
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (220.0 / -mv.z) * uPixelRatio;
          gl_Position = projectionMatrix * mv;
          
          vAlpha = uOpacity * (0.5 + sin(uTime * 1.2 + length(position.xy)) * 0.5);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 2.2);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const sacred = new THREE.Points(sacredGeo, sacredMat);
    sacred.position.z = -1.5;
    scene.add(sacred);

    // ==================== PEMF TORUS (12,000) ====================
    const pemfCount = 12000;
    const pemfGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pemfCount * 3);
    const pCol = new Float32Array(pemfCount * 3);
    const pSize = new Float32Array(pemfCount);
    const pPhase = new Float32Array(pemfCount);

    for (let i = 0; i < pemfCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const R = 2.2, r = 1.0;
      
      pPos[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
      pPos[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      pPos[i * 3 + 2] = r * Math.sin(v);
      
      const t = (v + Math.PI) / (Math.PI * 2);
      pCol[i * 3] = 0.1 + t * 0.5;
      pCol[i * 3 + 1] = 0.7 + t * 0.15;
      pCol[i * 3 + 2] = 0.65 + (1 - t) * 0.35;
      
      pSize[i] = 0.013 + Math.random() * 0.01;
      pPhase[i] = u + v;
    }

    pemfGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pemfGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    pemfGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1));
    pemfGeo.setAttribute('aPhase', new THREE.BufferAttribute(pPhase, 1));

    const pemfMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uOpacity: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        uniform float uOpacity;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          float pulse = sin(uTime * 3.5 + aPhase);
          pos.xy *= 1.0 + pulse * 0.07;
          pos.z *= 1.0 + pulse * 0.12;
          
          float flow = uTime * 1.2 + aPhase;
          pos.x += sin(flow) * 0.06;
          pos.z += cos(flow) * 0.06;
          
          float angle = uTime * 0.25;
          float c = cos(angle), s = sin(angle);
          pos.xz = mat2(c, -s, s, c) * pos.xz;
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (190.0 / -mv.z) * uPixelRatio * (1.0 + pulse * 0.15);
          gl_Position = projectionMatrix * mv;
          
          vAlpha = uOpacity * (0.4 + pulse * 0.6);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 1.8);
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const pemf = new THREE.Points(pemfGeo, pemfMat);
    scene.add(pemf);

    // ==================== NEURONS (8,000) ====================
    const neuronCount = 8000;
    const neuronGeo = new THREE.BufferGeometry();
    const nPos = new Float32Array(neuronCount * 3);
    const nCol = new Float32Array(neuronCount * 3);
    const nSize = new Float32Array(neuronCount);

    for (let i = 0; i < neuronCount; i++) {
      const cluster = Math.floor(Math.random() * 10);
      const ca = (cluster / 10) * Math.PI * 2;
      const cr = 2 + Math.random() * 2.5;
      
      nPos[i * 3] = Math.cos(ca) * cr + (Math.random() - 0.5) * 1.5;
      nPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      nPos[i * 3 + 2] = Math.sin(ca) * cr + (Math.random() - 0.5) * 1.5;
      
      nCol[i * 3] = 0.3 + Math.random() * 0.2;
      nCol[i * 3 + 1] = 0.5 + Math.random() * 0.3;
      nCol[i * 3 + 2] = 0.9 + Math.random() * 0.1;
      
      nSize[i] = 0.02 + Math.random() * 0.035;
    }

    neuronGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
    neuronGeo.setAttribute('color', new THREE.BufferAttribute(nCol, 3));
    neuronGeo.setAttribute('aSize', new THREE.BufferAttribute(nSize, 1));

    const neuronMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uPixelRatio: { value: renderer.getPixelRatio() },
        uOpacity: { value: 1 },
      },
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vPulse;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        uniform float uOpacity;

        void main() {
          vColor = color;
          vec3 pos = position;
          
          float pulse = sin(uTime * 3.5 + length(position) * 2.5);
          vPulse = pulse;
          pos += normalize(pos) * pulse * 0.06;
          
          // Strong mouse attraction
          vec3 mousePos = vec3(uMouse.x * 5.0, uMouse.y * 4.0, 0.0);
          vec3 toMouse = mousePos - pos;
          float dist = length(toMouse);
          pos += normalize(toMouse) * 1.2 / (1.0 + dist * 0.35);
          
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aSize * (200.0 / -mv.z) * uPixelRatio * (1.0 + pulse * 0.2);
          gl_Position = projectionMatrix * mv;
          
          vAlpha = uOpacity * (0.45 + pulse * 0.55);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vPulse;
        uniform float uTime;
        void main() {
          float r = distance(gl_PointCoord, vec2(0.5));
          if (r > 0.5) discard;
          float glow = pow(1.0 - r * 2.0, 2.2);
          float spark = step(0.9, sin(uTime * 12.0 + vPulse * 15.0)) * 0.3;
          gl_FragColor = vec4(vColor + spark, glow * vAlpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
    });

    const neurons = new THREE.Points(neuronGeo, neuronMat);
    scene.add(neurons);

    // ==================== STARS (20,000) ====================
    const starsCount = 20000;
    const starsGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const radius = 60 + Math.random() * 140;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      
      starPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = radius * Math.cos(phi);
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // ==================== ANIMATION ====================
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.016;

      // Smooth mouse - MORE responsive
      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.12;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.12;

      // Phase cycling (10 seconds per phase)
      const newPhase = Math.floor((Date.now() / 10000) % 6);
      if (newPhase !== phase) {
        phase = newPhase;
        setCurrentPhase(phase);
      }

      // Update all uniforms
      const mouseVec = new THREE.Vector2(smoothMouse.x, smoothMouse.y);
      
      galaxyMat.uniforms.uTime.value = time;
      galaxyMat.uniforms.uMouse.value.copy(mouseVec);

      dnaMat.uniforms.uTime.value = time;
      dnaMat.uniforms.uMouse.value.copy(mouseVec);
      (dna2.material as any).uniforms.uTime.value = time;
      (dna2.material as any).uniforms.uMouse.value.copy(mouseVec);

      neuronMat.uniforms.uTime.value = time;
      neuronMat.uniforms.uMouse.value.copy(mouseVec);

      sacredMat.uniforms.uTime.value = time;
      pemfMat.uniforms.uTime.value = time;

      // Phase-based visibility with smooth fades
      const fade = 0.04;
      
      // Neurons: phases 0, 1
      const nTarget = phase <= 1 ? 1 : 0;
      neuronMat.uniforms.uOpacity.value += (nTarget - neuronMat.uniforms.uOpacity.value) * fade;
      
      // Sacred: phases 3, 4
      const sTarget = (phase >= 3 && phase <= 4) ? 1 : 0;
      sacredMat.uniforms.uOpacity.value += (sTarget - sacredMat.uniforms.uOpacity.value) * fade;
      
      // PEMF: phases 4, 5
      const pTarget = phase >= 4 ? 1 : 0;
      pemfMat.uniforms.uOpacity.value += (pTarget - pemfMat.uniforms.uOpacity.value) * fade;

      // Gentle rotations
      galaxy.rotation.y += 0.0006;
      dna1.rotation.y += 0.0015;
      dna2.rotation.y += 0.0015;
      stars.rotation.y += 0.00012;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    cleanupRef.current = () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(canvas);
      renderer.dispose();
    };
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020108] via-[#080318] to-[#040210]" />
      
      {/* Nebula glow */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 25% 25%, rgba(90, 40, 160, 0.2) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(0, 160, 140, 0.15) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Three.js container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Minimal narrative overlay */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        
        {/* Title */}
        <div className="text-center">
          <div 
            className="inline-block transition-all duration-1000"
            style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)' }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 tracking-wide drop-shadow-lg">
              {NARRATIVE_TEXTS[currentPhase]?.title}
            </h2>
            <p className="text-white/50 text-lg md:text-xl font-light tracking-wider">
              {NARRATIVE_TEXTS[currentPhase]?.subtitle}
            </p>
          </div>
        </div>

        {/* Phase dots */}
        <div className="flex justify-center gap-2.5">
          {NARRATIVE_TEXTS.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-700 ${
                i === currentPhase 
                  ? 'bg-praana-accent w-8 shadow-[0_0_15px_rgba(20,184,166,0.7)]' 
                  : 'bg-white/15 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center">
          <p className="text-white/25 text-xs md:text-sm tracking-[0.25em] uppercase">
            Move your cursor to interact with the cosmos
          </p>
        </div>
      </div>

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)' }}
      />
    </section>
  );
};

export default CosmicVisualization;
