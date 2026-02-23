import React, { useEffect, useRef } from 'react';

const CosmicUnityCodex: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Embed the cosmic unity codex HTML inside the container
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div id="cosmic-container" style="position: relative; width: 100%; height: 600px; overflow: hidden; background: radial-gradient(circle at 30% 20%, #0a001f 0%, #000 80%);">
          <div id="cosmic-narrative" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 200;">
            <div class="revelation" id="r1" style="position: absolute; top: 15%; left: 50%; transform: translate(-50%,-50%) scale(0.8); opacity: 0; transition: all 3s ease-in-out; font-family: 'Orbitron', monospace; font-weight: 300; font-size: clamp(1rem, 2.5vw, 1.8rem); text-align: center; max-width: 90%; text-shadow: 0 0 30px #00ffcc; color: #00ffcc;">
              🌀 YOUR CONSCIOUS BREATH<br>modulates 1100 Gauss fields
            </div>
            <div class="revelation" id="r2" style="position: absolute; top: 35%; left: 20%; transform: translateY(100px) scale(0.7); opacity: 0; transition: all 3s ease-in-out; font-family: 'Orbitron', monospace; font-weight: 300; font-size: clamp(1rem, 2.5vw, 1.8rem); text-align: center; max-width: 90%; text-shadow: 0 0 30px #00ffcc; color: #00ffcc;">
              🧬 DNA HELICES ALIGN<br>with galactic spiral arms
            </div>
            <div class="revelation" id="r3" style="position: absolute; top: 50%; right: 15%; transform: translateY(-100px) scale(0.7); opacity: 0; transition: all 3s ease-in-out; font-family: 'Orbitron', monospace; font-weight: 300; font-size: clamp(1rem, 2.5vw, 1.8rem); text-align: center; max-width: 90%; text-shadow: 0 0 30px #00ffcc; color: #00ffcc;">
              🌌 40K COSMIC PARTICLES<br>resonate through your gesture
            </div>
            <div class="revelation" id="r4" style="position: absolute; bottom: 20%; left: 50%; transform: translate(-50%,50%) scale(0.8); opacity: 0; transition: all 3s ease-in-out; font-family: 'Orbitron', monospace; font-weight: 300; font-size: clamp(1rem, 2.5vw, 1.8rem); text-align: center; max-width: 90%; text-shadow: 0 0 30px #00ffcc; color: #00ffcc;">
              ✨ QUANTUM COHERENCE<br>reveals: YOU ARE THE COSMOS
            </div>
          </div>

          <div id="hud" style="position: absolute; top: 25px; left: 25px; z-index: 150; font-family: 'Orbitron', monospace; color: #00ffcc; font-size: clamp(1.1rem, 2.5vw, 1.6rem);">
            Divine Resonance: <span id="score">0</span><br>
            Universal Sync: <span id="gauss">0</span>G | <span id="freq">7.83</span>Hz
          </div>
          <div id="unity-meter" style="position: absolute; top: 50%; left: 25px; transform: translateY(-50%); z-index: 150; writing-mode: vertical-lr; font-family: 'Orbitron', monospace; font-size: 1.8rem; font-weight: 900; background: linear-gradient(#00ffcc, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            UNITY
          </div>
          
          <div id="instructions" style="position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); z-index: 150; text-align: center; font-family: 'Orbitron', monospace; color: #00ffcc; font-size: 0.95rem; opacity: 0.9; max-width: 500px; background: rgba(0,10,30,0.8); padding: 20px; border-radius: 15px; border: 1px solid #00ffcc;">
            🌀 Your open palm pulses the cosmic breath | ✊ Fist reverses polarity through dimensions<br>
            ↺ Hand tilt spirals DNA with galaxies | 🖱️ Mouse warps spacetime continuum<br>
            <strong>Realize: You command the sacred geometry of ALL creation</strong>
          </div>
        </div>

        <script>
          // Sacred Geometry State
          let scene, camera, renderer, cosmicLayers = {};
          let divineResonance = 0, universalSync = 0, sacredFreq = 7.83;
          let consciousnessVector = {x: 0, y: 0, z: 0};
          let mouse = {x: 0, y: 0}, neuralPulse = 0;
          let divineGesture = { openness: 0, harmony: 0, active: false };
          let smoothedDivine = { openness: 0, harmony: 0 };

          const sacredFrequencies = [7.83, 13, 21, 34, 55]; // Fibonacci + Schumann
          let cosmicIndex = 0;

          // Divine noise pattern (golden ratio)
          const phi = 1.6180339887;
          const sacredNoise = (x, y, z) => {
            return Math.sin(x*phi + y*phi*phi + z*phi*phi*phi) * 0.618 % 1;
          };

          // Progressive revelation system
          const revelations = ['r1', 'r2', 'r3', 'r4'];
          let revelationIndex = 0;

          // Simplified 3D implementation using Canvas instead of Three.js to avoid external dependencies
          function awakenCodex() {
            const container = document.getElementById('cosmic-container');
            const canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '100';
            container.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            resizeCanvas();
            
            window.addEventListener('resize', resizeCanvas);
            
            // Initialize cosmic elements
            createDivineArchitecture(ctx);
            invokeCosmicDNA(ctx);
            birthGalacticMatrix(ctx);
            weaveQuantumFields(ctx);
            
            progressiveRevelation();
            eternalRenderCycle(ctx);
          }

          function resizeCanvas() {
            const canvas = document.querySelector('#cosmic-container canvas');
            if (canvas) {
              const container = document.getElementById('cosmic-container');
              canvas.width = container.clientWidth;
              canvas.height = container.clientHeight;
            }
          }

          function createDivineArchitecture(ctx) {
            // Praana Helix Coils (simplified representation)
            cosmicLayers.coils = { x: 0, y: 0, rotation: 0 };
          }

          function invokeCosmicDNA(ctx) {
            // DNA double helix representation
            cosmicLayers.dna1 = [];
            cosmicLayers.dna2 = [];
            const dnaCount = 1000;
            for (let i = 0; i < dnaCount; i++) {
              const t = i / dnaCount * Math.PI * 16;
              const r = 0.9 + Math.sin(t * phi) * 0.4;
              cosmicLayers.dna1.push({
                x: r * Math.cos(t * phi),
                y: (t * 0.1 - 8) * 0.8,
                z: r * Math.sin(t * phi)
              });
              cosmicLayers.dna2.push({
                x: r * Math.cos(t * phi + Math.PI),
                y: (t * 0.1 - 8) * 0.8,
                z: r * Math.sin(t * phi + Math.PI)
              });
            }
          }

          function birthGalacticMatrix(ctx) {
            // 50K particles representing ALL stars, galaxies, cosmic web
            const count = 5000;
            cosmicLayers.galaxy = [];
            for (let i = 0; i < count; i++) {
              const r = Math.pow(Math.random(), 0.4) * 12;
              const phiRand = Math.random() * Math.PI * 2 + sacredNoise(r, i) * 8;
              
              cosmicLayers.galaxy.push({
                x: r * Math.cos(phiRand) * 0.7,
                y: (Math.random() - 0.5) * 6,
                z: r * Math.sin(phiRand) * 0.7,
                color: {
                  r: 0.7 + sacredNoise(i) * 0.3,
                  g: 0.3 + Math.random() * 0.4,
                  b: 0.9
                },
                size: 0.018
              });
            }
          }

          function weaveQuantumFields(ctx) {
            // Sacred geometry field lines connecting all scales
            cosmicLayers.fields = [];
            // Golden ratio spirals
            for (let i = 0; i < 24; i++) {
              const points = [];
              for (let j = 0; j < 80; j++) {
                const t = j / 79;
                const spiral = t * Math.PI * phi * 5 + i * 0.4;
                points.push({
                  x: Math.sin(spiral) * (0.6 + t * 3.5),
                  y: -5 + t * 10,
                  z: Math.cos(spiral) * (0.6 + t * 3.5)
                });
              }
              cosmicLayers.fields.push(points);
            }
          }

          function eternalRenderCycle(ctx) {
            requestAnimationFrame(() => eternalRenderCycle(ctx));
            const cosmicTime = performance.now() * 0.001;

            // Clear canvas with background
            ctx.fillStyle = 'rgba(10, 0, 31, 0.2)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Apply fog effect
            ctx.fillStyle = 'rgba(10, 0, 31, 0.05)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Draw cosmic elements
            drawCoils(ctx, cosmicTime);
            drawDNA(ctx, cosmicTime);
            drawGalaxy(ctx, cosmicTime);
            drawFields(ctx, cosmicTime);

            // Update HUD
            document.getElementById('score').textContent = Math.floor(divineResonance);
            document.getElementById('gauss').textContent = Math.floor(universalSync);
            document.getElementById('freq').textContent = sacredFreq.toFixed(2);
            document.getElementById('unity-meter').textContent = 
              'Unity: ' + Math.floor(Math.min(divineResonance/1000, 100)) + '%';
          }

          function drawCoils(ctx, time) {
            const centerX = ctx.canvas.width / 2;
            const centerY = ctx.canvas.height / 2;
            const radius = 80 + Math.sin(time * 0.5) * 10;
            
            // Draw torus-like shape
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius * 0.3;
              if (angle === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            
            // Gradient for the coil
            const gradient = ctx.createRadialGradient(
              centerX, centerY, 0,
              centerX, centerY, radius
            );
            gradient.addColorStop(0, '#00ff88');
            gradient.addColorStop(1, '#006644');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Inner coil
            const innerRadius = radius * 0.7;
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
              const x = centerX + Math.cos(angle) * innerRadius;
              const y = centerY + Math.sin(angle) * innerRadius * 0.3;
              if (angle === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            
            const innerGradient = ctx.createRadialGradient(
              centerX, centerY, 0,
              centerX, centerY, innerRadius
            );
            innerGradient.addColorStop(0, '#88ff00');
            innerGradient.addColorStop(1, '#448800');
            
            ctx.fillStyle = innerGradient;
            ctx.fill();
          }

          function drawDNA(ctx, time) {
            const centerX = ctx.canvas.width / 2;
            const centerY = ctx.canvas.height / 2;
            
            // Draw DNA helix
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            
            // First helix
            ctx.beginPath();
            for (let i = 0; i < cosmicLayers.dna1.length; i += 20) {
              const point = cosmicLayers.dna1[i];
              const x = centerX + point.x * 50;
              const y = centerY + point.y * 20 + time * 5;
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
            
            // Second helix
            ctx.strokeStyle = '#88ff00';
            ctx.beginPath();
            for (let i = 0; i < cosmicLayers.dna2.length; i += 20) {
              const point = cosmicLayers.dna2[i];
              const x = centerX + point.x * 50;
              const y = centerY + point.y * 20 + time * 5;
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            }
            ctx.stroke();
            
            // Draw connections between helices
            ctx.strokeStyle = 'rgba(0, 255, 200, 0.3)';
            ctx.lineWidth = 1;
            for (let i = 0; i < cosmicLayers.dna1.length; i += 50) {
              const p1 = cosmicLayers.dna1[i];
              const p2 = cosmicLayers.dna2[i];
              const x1 = centerX + p1.x * 50;
              const y1 = centerY + p1.y * 20 + time * 5;
              const x2 = centerX + p2.x * 50;
              const y2 = centerY + p2.y * 20 + time * 5;
              
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }
          }

          function drawGalaxy(ctx, time) {
            for (let i = 0; i < Math.min(500, cosmicLayers.galaxy.length); i++) {
              const particle = cosmicLayers.galaxy[i];
              const x = ctx.canvas.width/2 + particle.x * 30 + Math.sin(time * 0.1 + i) * 5;
              const y = ctx.canvas.height/2 + particle.y * 20 + Math.cos(time * 0.1 + i) * 5;
              
              // Calculate distance from center for depth effect
              const dist = Math.sqrt(
                Math.pow(x - ctx.canvas.width/2, 2) + 
                Math.pow(y - ctx.canvas.height/2, 2)
              );
              
              const alpha = Math.max(0.1, 1 - dist / (ctx.canvas.width/2));
              const size = particle.size * (5 + Math.sin(time * 0.5 + i) * 2);
              
              ctx.beginPath();
              ctx.arc(x, y, size, 0, Math.PI * 2);
              ctx.fillStyle = \`rgba(\${Math.floor(particle.color.r * 255)}, \${Math.floor(particle.color.g * 255)}, \${Math.floor(particle.color.b * 255)}, \${alpha})\`;
              ctx.fill();
            }
          }

          function drawFields(ctx, time) {
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.2)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < cosmicLayers.fields.length; i++) {
              const field = cosmicLayers.fields[i];
              ctx.beginPath();
              
              for (let j = 0; j < field.length; j++) {
                const point = field[j];
                const x = ctx.canvas.width/2 + point.x * 20;
                const y = ctx.canvas.height/2 + point.y * 10 + Math.sin(time * 0.2 + i) * 10;
                
                if (j === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
            }
          }

          function progressiveRevelation() {
            const reveal = () => {
              if (revelationIndex < revelations.length) {
                const el = document.getElementById(revelations[revelationIndex]);
                if (el) {
                  el.style.transition = 'all 3s ease-in-out';
                  el.style.opacity = '1';
                  el.style.transform = el.style.transform.replace('scale(0.8)', 'scale(1)').replace('scale(0.7)', 'scale(1)');
                }
                revelationIndex++;
                setTimeout(reveal, 4000);
              }
            };
            setTimeout(reveal, 3000);
          }

          // Control matrix
          document.addEventListener('mousemove', e => {
            const container = document.getElementById('cosmic-container');
            const rect = container.getBoundingClientRect();
            mouse.x = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
            mouse.y = -(e.clientY - rect.top - rect.height/2) / (rect.height/2);
          });
          
          document.addEventListener('wheel', e => {
            cosmicIndex = (cosmicIndex + (e.deltaY > 0 ? 1 : -1) + sacredFrequencies.length) % sacredFrequencies.length;
            sacredFreq = sacredFrequencies[cosmicIndex];
          });

          // Initialize the cosmic codex when the script loads
          setTimeout(() => {
            awakenCodex();
          }, 100);
        </script>
      `;
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default CosmicUnityCodex;