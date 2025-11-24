import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    const points: Point[] = [];
    // Adjust density based on screen size
    const count = Math.floor((w * h) / 12000); 
    
    // Initialize points
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, // Slow movement
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw Points and Connections
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Draw Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(41, 151, 255, 0.6)'; // Neon Blue Nodes
        ctx.fill();

        // Draw Connections
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const threshold = 20000; // Connection distance squared

          if (distSq < threshold) { 
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Calculate opacity based on distance (closer = more opaque)
            const alpha = 1 - (distSq / threshold);
            ctx.lineWidth = 0.8;
            // Gradient line for style
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(41, 151, 255, ${alpha * 0.2})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, ${alpha * 0.2})`); // Purple tint
            
            ctx.strokeStyle = gradient; 
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
       if (!canvas) return;
       w = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
       h = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
       // Re-initialize or add/remove points could be done here, 
       // but keeping existing points within bounds is simpler for now
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default NeuralBackground;