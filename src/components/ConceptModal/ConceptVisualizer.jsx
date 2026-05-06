import { useEffect, useRef, useState } from 'react';
import './ConceptVisualizer.css';

/**
 * ConceptVisualizer — Renders interactive visualisations for concepts
 * Types: array, scatter, bar-chart, tree, formula, distribution, confusion-matrix, neural-layer, comparison, slider
 */
const ConceptVisualizer = ({ type, data, color }) => {
  const canvasRef = useRef(null);
  const [sliderVal, setSliderVal] = useState(data?.defaultValue || 50);

  useEffect(() => {
    if (!canvasRef.current || !type) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    // Array visualiser (e.g. Mean, Median, Mode)
    if (type === 'array') {
      const values = data?.values || [64, 34, 25, 12, 22, 11, 90, 5];
      const highlight = data?.highlight || [];
      const barWidth = Math.min(60, (w - 40) / values.length);
      const maxVal = Math.max(...values);
      const startX = (w - values.length * barWidth) / 2;
      values.forEach((v, i) => {
        const barH = (v / maxVal) * (h - 80);
        const x = startX + i * barWidth;
        const y = h - 40 - barH;
        ctx.fillStyle = highlight.includes(i) ? '#f59e0b' : '#6366f1';
        ctx.fillRect(x, y, barWidth - 4, barH);
        ctx.fillStyle = '#374151';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(v, x + barWidth / 2 - 2, h - 18);
        if (data?.labels?.[i]) {
          ctx.fillStyle = '#dc2626';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(data.labels[i], x + barWidth / 2 - 2, y - 8);
        }
      });
    }

    // Scatter plot (Correlation, Regression)
    if (type === 'scatter') {
      const points = data?.points || [];
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        const x = 40 + (i / 10) * (w - 80);
        const y = 40 + (i / 10) * (h - 80);
        ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, h - 40); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(w - 40, y); ctx.stroke();
      }
      if (data?.regression) {
        ctx.strokeStyle = color || '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, h - 40 - data.regression.slope * 0 + data.regression.intercept);
        ctx.lineTo(w - 40, h - 40 - data.regression.slope * (w - 80) + data.regression.intercept);
        ctx.stroke();
      }
      points.forEach(([px, py]) => {
        const sx = 40 + px * (w - 80);
        const sy = h - 40 - py * (h - 80);
        ctx.fillStyle = '#6366f1';
        ctx.beginPath(); ctx.arc(sx, sy, 5, 0, Math.PI * 2); ctx.fill();
      });
    }

    // Bar chart comparison
    if (type === 'bar-chart') {
      const bars = data?.bars || [{ label: 'A', value: 60 }, { label: 'B', value: 80 }];
      const barW = Math.min(80, (w - 80) / bars.length);
      const maxV = Math.max(...bars.map(b => b.value));
      const startX = (w - bars.length * barW) / 2;
      bars.forEach((b, i) => {
        const bh = (b.value / maxV) * (h - 80);
        const x = startX + i * barW;
        const y = h - 40 - bh;
        ctx.fillStyle = i === 0 ? '#6366f1' : i === 1 ? '#f59e0b' : '#10b981';
        ctx.fillRect(x + 4, y, barW - 8, bh);
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.font = '12px sans-serif';
        ctx.fillText(b.label, x + barW / 2, h - 18);
        ctx.fillText(b.value, x + barW / 2, y - 5);
      });
    }

    // Bell curve / distribution
    if (type === 'distribution') {
      const mean = data?.mean || 0;
      const sigma = data?.std || 1;
      const scaleX = (w - 80) / 6;
      const scaleY = (h - 80) / 0.4;
      const centerX = w / 2;
      const baseY = h - 40;
      ctx.strokeStyle = color || '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = -3; x <= 3; x += 0.05) {
        const pdf = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / sigma, 2));
        const sx = centerX + x * scaleX;
        const sy = baseY - pdf * scaleY;
        if (x === -3) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.fillStyle = 'rgba(99,102,241,0.1)';
      ctx.fill();
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('μ', centerX, baseY + 20);
      ctx.fillText('μ ± σ', centerX + scaleX, baseY + 20);
      ctx.fillText('μ ∓ σ', centerX - scaleX, baseY + 20);
    }

    // Comparison (e.g. Bias vs Variance)
    if (type === 'comparison') {
      const items = data?.items || [
        { label: 'Low Complexity', bias: 80, variance: 20 },
        { label: 'Optimal', bias: 40, variance: 40 },
        { label: 'High Complexity', bias: 20, variance: 80 }
      ];
      const barW = Math.min(100, (w - 80) / items.length);
      const startX = (w - items.length * barW) / 2;
      items.forEach((item, i) => {
        const x = startX + i * barW;
        const bhBias = (item.bias / 100) * (h - 80);
        const bhVar = (item.variance / 100) * (h - 80);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(x + 4, h - 40 - bhBias, barW / 2 - 6, bhBias);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(x + barW / 2 + 2, h - 40 - bhVar, barW / 2 - 6, bhVar);
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.font = '11px sans-serif';
        ctx.fillText(item.label, x + barW / 2, h - 18);
      });
      // Legend
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(w - 100, 20, 12, 12);
      ctx.fillStyle = '#374151';
      ctx.fillText('Bias²', w - 80, 31);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(w - 100, 38, 12, 12);
      ctx.fillStyle = '#374151';
      ctx.fillText('Variance', w - 80, 49);
    }
  }, [type, data, color]);

  if (type === 'slider') {
    return (
      <div className="cv-slider-wrap">
        <canvas ref={canvasRef} className="cv-canvas" style={{ height: 200 }} />
        <div className="cv-slider-controls">
          <label>{data?.label || 'Value'}: <strong>{sliderVal}</strong></label>
          <input
            type="range"
            min={data?.min || 0}
            max={data?.max || 100}
            step={data?.step || 1}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="concept-visualizer">
      <canvas ref={canvasRef} className="cv-canvas" />
    </div>
  );
};

export default ConceptVisualizer;
