import { useEffect, useRef } from 'react';
import { FaPlay, FaCode } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(30, Math.floor(canvas.width / 30));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 2
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const color = isDark ? '99, 102, 241' : '99, 102, 241';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const targetPosition = element.offsetTop - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Master Data Structures & Algorithms</h1>
        <p>Interactive visualizations, code examples, and practice problems to level up your coding skills</p>
        <div className="hero-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => handleScroll('datastructures')}
          >
            <FaPlay /> Start Learning
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleScroll('problems')}
          >
            <FaCode /> Practice Problems
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">12</span>
            <span className="stat-label">Topics</span>
          </div>
          <div className="stat">
            <span className="stat-number">30+</span>
            <span className="stat-label">Problems</span>
          </div>
          <div className="stat">
            <span className="stat-number">4</span>
            <span className="stat-label">Languages</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <canvas ref={canvasRef} id="heroCanvas" />
      </div>
    </section>
  );
};

export default Hero;
