import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Settings, Play, Pause, Zap } from 'lucide-react';
import { SKILLS } from '../constants';

interface BackgroundAnimationProps {
  darkMode: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ darkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [intensity, setIntensity] = useState(0.5);
  const [speed, setSpeed] = useState(0.4);
  const [showControls, setShowControls] = useState(false);
  
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const tesseractRef = useRef<THREE.Group | null>(null);
  const orbsRef = useRef<THREE.Group | null>(null);
  const wakeRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>(0);
  const clockRef = useRef(new THREE.Clock());

  // Helper: Create Text Sprites for Skills
  const createTextSprite = (text: string, color: string, subtext?: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.font = 'bold 32px monospace';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fillText(text, 128, 60);
      if (subtext) {
        ctx.font = '20px monospace';
        ctx.fillStyle = color + '88';
        ctx.fillText(subtext, 128, 90);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(1.5, 0.75, 1);
    return sprite;
  };

  // Helper: Create Wake Particle
  const createWakeParticle = (char: string, color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = color;
      ctx.font = 'bold 40px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(char, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.8 });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.2, 0.2, 0.2);
    return sprite;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Theme Palette
    const palette = darkMode 
      ? { 
          bg: 0x05050a, 
          grid: 0x1e293b, 
          tesseract: 0x6366f1, 
          accent: 0x06b6d4,
          Languages: 0x3b82f6,
          Frontend: 0x10b981,
          'Backend & DB': 0xf59e0b,
          'Cloud & Platforms': 0x8b5cf6,
          'AI/ML': 0xec4899,
          Tools: 0x94a3b8
        }
      : { 
          bg: 0xf8fafc, 
          grid: 0xe2e8f0, 
          tesseract: 0x4f46e5, 
          accent: 0x0ea5e9,
          Languages: 0x2563eb,
          Frontend: 0x059669,
          'Backend & DB': 0xd97706,
          'Cloud & Platforms': 0x7c3aed,
          'AI/ML': 0xdb2777,
          Tools: 0x64748b
        };

    // Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(palette.bg, 0.15);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Infinite 3D Grid
    const gridHelper = new THREE.GridHelper(100, 50, palette.grid, palette.grid);
    gridHelper.position.y = -5;
    scene.add(gridHelper);

    const ceilingGrid = gridHelper.clone();
    ceilingGrid.position.y = 15;
    scene.add(ceilingGrid);

    // 4D Tesseract Projection (Hypercube)
    const tesseract = new THREE.Group();
    const cube1 = new THREE.BoxGeometry(2, 2, 2);
    const cube2 = new THREE.BoxGeometry(4, 4, 4);
    const wireMat = new THREE.MeshBasicMaterial({ color: palette.tesseract, wireframe: true, transparent: true, opacity: 0.4 });
    
    const innerCube = new THREE.Mesh(cube1, wireMat);
    const outerCube = new THREE.Mesh(cube2, wireMat.clone());
    outerCube.material.opacity = 0.2;
    
    tesseract.add(innerCube);
    tesseract.add(outerCube);

    // Connecting lines for 4D effect
    const points1 = [
      new THREE.Vector3(-1,-1,-1), new THREE.Vector3(1,-1,-1), new THREE.Vector3(1,1,-1), new THREE.Vector3(-1,1,-1),
      new THREE.Vector3(-1,-1,1), new THREE.Vector3(1,-1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(-1,1,1)
    ];
    const points2 = points1.map(p => p.clone().multiplyScalar(2));
    
    points1.forEach((p, i) => {
      const lineGeom = new THREE.BufferGeometry().setFromPoints([p, points2[i]]);
      const line = new THREE.Line(lineGeom, wireMat);
      tesseract.add(line);
    });

    scene.add(tesseract);
    tesseractRef.current = tesseract;

    // Skill Orbs
    const orbs = new THREE.Group();
    SKILLS.forEach((skill, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const radius = 6 + Math.sin(i) * 2;
      const colorHex = (palette as any)[skill.category] || palette.accent;
      const colorStr = `#${colorHex.toString(16).padStart(6, '0')}`;
      
      const orbGroup = new THREE.Group();
      
      const geom = new THREE.SphereGeometry(0.15, 16, 16);
      const mat = new THREE.MeshBasicMaterial({ color: colorHex });
      const mesh = new THREE.Mesh(geom, mat);
      
      const label = createTextSprite(skill.name, colorStr, `${skill.level}%`);
      label.position.y = 0.4;
      
      orbGroup.add(mesh);
      orbGroup.add(label);
      
      // Orbit parameters
      (orbGroup as any).orbitData = {
        angle: angle,
        radius: radius,
        speed: (0.1 + Math.random() * 0.2) * (i % 2 === 0 ? 1 : -1),
        yOffset: (Math.random() - 0.5) * 5
      };
      
      orbs.add(orbGroup);
    });
    scene.add(orbs);
    orbsRef.current = orbs;

    // Cursor Wake Group
    const wake = new THREE.Group();
    scene.add(wake);
    wakeRef.current = wake;

    camera.position.z = 10;
    camera.position.y = 2;

    // Animation Loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (isPaused) return;

      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      // Animate Tesseract
      if (tesseractRef.current) {
        tesseractRef.current.rotation.x += 0.01 * speed;
        tesseractRef.current.rotation.y += 0.015 * speed;
        tesseractRef.current.rotation.z += 0.005 * speed;
        const s = 1 + Math.sin(time) * 0.1;
        tesseractRef.current.scale.set(s, s, s);
      }

      // Animate Orbs
      if (orbsRef.current) {
        orbsRef.current.children.forEach((orb: any) => {
          const data = orb.orbitData;
          data.angle += data.speed * 0.05 * speed;
          orb.position.x = Math.cos(data.angle) * data.radius;
          orb.position.z = Math.sin(data.angle) * data.radius;
          orb.position.y = data.yOffset + Math.sin(time + data.angle) * 0.5;
          
          // Look at camera
          orb.children[1].quaternion.copy(camera.quaternion);
          
          // Pulse scale
          const pulse = 1 + Math.sin(time * 2 + data.angle) * 0.1;
          orb.scale.setScalar(pulse);
        });
      }

      // Handle Cursor Particles (Binary and Brackets)
      if (wakeRef.current) {
        const dx = mouseRef.current.x - mouseRef.current.lastX;
        const dy = mouseRef.current.y - mouseRef.current.lastY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist > 0.02) {
          const chars = ['{', '}', '[', ']', '<', '>', '0', '1', ';', '()'];
          const char = chars[Math.floor(Math.random() * chars.length)];
          const color = darkMode ? '#06b6d4' : '#2563eb';
          const p = createWakeParticle(char, color);
          
          const vector = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
          vector.unproject(camera);
          const dir = vector.sub(camera.position).normalize();
          const distance = -camera.position.z / dir.z;
          const pos = camera.position.clone().add(dir.multiplyScalar(distance));
          
          p.position.copy(pos);
          (p as any).life = 1.0;
          (p as any).velocity = new THREE.Vector3((Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05);
          wakeRef.current.add(p);
          
          mouseRef.current.lastX = mouseRef.current.x;
          mouseRef.current.lastY = mouseRef.current.y;
        }

        wakeRef.current.children.forEach((p: any, i) => {
          p.life -= 0.02;
          p.position.add(p.velocity);
          p.material.opacity = p.life;
          p.scale.setScalar(p.life * 0.3);
          if (p.life <= 0) wakeRef.current?.remove(p);
        });
      }

      // Parallax camera movement
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 2 + 2 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handlers
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, [isPaused, intensity, speed, darkMode]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 -z-10 pointer-events-none transition-all duration-1000"
        aria-hidden="true"
        style={{ 
          background: darkMode ? '#05050a' : '#f8fafc'
        }}
      />
      
      {/* 4D Portal Controls Overlay */}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-2">
        {showControls && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl mb-2 flex flex-col gap-5 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-800 dark:text-slate-200">Portal Core</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Orb Radiance</label>
              <input 
                type="range" min="0" max="1" step="0.1" 
                value={intensity} 
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                className="w-36 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Drift Speed</label>
              <input 
                type="range" min="0" max="2" step="0.1" 
                value={speed} 
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-36 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`
                flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all
                ${isPaused ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}
              `}
            >
              {isPaused ? <><Play size={14} /> Resume Visualization</> : <><Pause size={14} /> Pause Portal</>}
            </button>
          </div>
        )}
        
        <button 
          onClick={() => setShowControls(!showControls)}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
            ${showControls ? 'bg-indigo-600 text-white rotate-90 scale-110 shadow-indigo-500/50 shadow-lg' : 'bg-white/70 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md shadow-lg'}
            border border-slate-200 dark:border-slate-700
          `}
          title="Skills Visualization Settings"
        >
          <Settings size={24} />
        </button>
      </div>
    </>
  );
};

export default BackgroundAnimation;