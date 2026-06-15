import React, { useEffect, useRef } from 'react';

interface ParticlesProps {
  className?: string;
  count?: number;
  color?: string;
}

const Particles: React.FC<ParticlesProps> = ({ 
  className = '', 
  count = 50, 
  color = '255, 255, 255' // RGB format without rgba()
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // 0.5px to 2.5px
          speedX: (Math.random() - 0.5) * 0.3, // Very slow horizontal drift
          speedY: (Math.random() - 0.5) * 0.3 - 0.1, // Slowly drifting upwards mostly
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around screen
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [count, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Particles;
