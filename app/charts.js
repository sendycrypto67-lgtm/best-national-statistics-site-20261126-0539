// Canvas charts, no libraries, no network. Every chart redraws on resize
// and exposes its data as text beside the canvas for screen readers.
export function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(280, Math.round(rect.width));
  const h = Math.round(canvas.getAttribute('data-h') || 260);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function axes(ctx, w, h, pad) {
  ctx.strokeStyle = '#d7dee8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.l, pad.t);
  ctx.lineTo(pad.l, h - pad.b);
  ctx.lineTo(w - pad.r, h - pad.b);
  ctx.stroke();
}

function grid(ctx, w, h, pad, max, steps, lo) {
  const base = lo || 0;
  ctx.fillStyle = '#7a8699';
  ctx.font = '11px system-ui, sans-serif';
  ctx.textAlign = 'right';
  for (let i = 0; i <= steps; i++) {
    const v = base + ((max - base) * i) / steps;
    const y = h - pad.b - ((h - pad.t - pad.b) * i) / steps;
    ctx.strokeStyle = '#eef1f5';
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    ctx.fillText(String(Math.round(v * 10) / 10), pad.l - 6, y + 4);
  }
}

export function drawBars(canvas, items, opts) {
  const { ctx, w, h } = setupCanvas(canvas);
  const pad = { l: 48, r: 14, t: 14, b: 34 };
  const max = Math.max(...items.map((d) => d.value)) * 1.08;
  axes(ctx, w, h, pad);
  grid(ctx, w, h, pad, max, 4);
  const slot = (w - pad.l - pad.r) / items.length;
  const barW = Math.min(46, slot * 0.62);
  ctx.font = '11px system-ui, sans-serif';
  items.forEach((d, i) => {
    const bh = ((h - pad.t - pad.b) * d.value) / max;
    const x = pad.l + slot * i + (slot - barW) / 2;
    const y = h - pad.b - bh;
    ctx.fillStyle = opts.color || '#0f5b8f';
    ctx.beginPath();
    ctx.roundRect(x, y, barW, bh, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = '#1c2733';
    ctx.textAlign = 'center';
    ctx.fillText(opts.format(d.value), x + barW / 2, y - 6);
    ctx.fillStyle = '#5b6b7d';
    ctx.fillText(String(d.label), x + barW / 2, h - pad.b + 16);
  });
  canvas.title = items.map((d) => d.label + ': ' + opts.format(d.value)).join(', ');
}

export function drawLine(canvas, items, opts) {
  const { ctx, w, h } = setupCanvas(canvas);
  const pad = { l: 48, r: 26, t: 28, b: 34 };
  const vals = items.map((d) => d.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const lo = min - (max - min) * 0.25 - 0.001;
  const hi = max + (max - min) * 0.25 + 0.001;
  axes(ctx, w, h, pad);
  grid(ctx, w, h, pad, hi, 4, lo);
  const xs = items.map((_, i) => pad.l + ((w - pad.l - pad.r) * i) / (items.length - 1));
  const ys = vals.map((v) => h - pad.b - ((h - pad.t - pad.b) * (v - lo)) / (hi - lo));
  ctx.strokeStyle = opts.color || '#0f5b8f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  xs.forEach((x, i) => { if (i === 0) ctx.moveTo(x, ys[i]); else ctx.lineTo(x, ys[i]); });
  ctx.stroke();
  ctx.font = '11px system-ui, sans-serif';
  items.forEach((d, i) => {
    ctx.fillStyle = opts.color || '#0f5b8f';
    ctx.beginPath(); ctx.arc(xs[i], ys[i], 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(xs[i], ys[i], 1.8, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1c2733';
    const label = opts.format(d.value);
    const tw = ctx.measureText(label).width;
    let lx, lw;
    if (i === 0) { ctx.textAlign = 'left'; lx = xs[i] + 10; }
    else if (i === items.length - 1) { ctx.textAlign = 'right'; lx = xs[i] - 10; }
    else { ctx.textAlign = 'center'; lx = xs[i]; }
    lw = ctx.textAlign === 'center' ? tw / 2 : tw;
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    if (ctx.textAlign === 'left') ctx.fillRect(lx - 2, ys[i] - 26, tw + 4, 15);
    else if (ctx.textAlign === 'right') ctx.fillRect(lx - tw - 2, ys[i] - 26, tw + 4, 15);
    else ctx.fillRect(lx - lw - 2, ys[i] - 26, tw + 4, 15);
    ctx.fillStyle = '#1c2733';
    ctx.fillText(label, lx, ys[i] - 14);
    ctx.fillStyle = '#5b6b7d';
    ctx.textAlign = 'center';
    ctx.fillText(String(d.label), xs[i], h - pad.b + 16);
  });
  canvas.title = items.map((d) => d.label + ': ' + opts.format(d.value)).join(', ');
}

export function drawDonut(canvas, items, opts) {
  const { ctx, w, h } = setupCanvas(canvas);
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 18, inner = r * 0.62;
  const total = items.reduce((s, d) => s + d.value, 0);
  let a = -Math.PI / 2;
  const colors = opts.colors || ['#0f5b8f', '#12836f', '#c98a1b', '#7a5fb0', '#b4433a', '#4a7fb5'];
  items.forEach((d, i) => {
    const sweep = (d.value / total) * Math.PI * 2;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, a, a + sweep);
    ctx.closePath(); ctx.fill();
    a += sweep;
  });
  ctx.fillStyle = '#ffffff';
  ctx.beginPath(); ctx.arc(cx, cy, inner, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1c2733';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(opts.center || '', cx, cy - 2);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#5b6b7d';
  ctx.fillText(opts.centerSub || '', cx, cy + 16);
  canvas.title = items.map((d) => d.label + ': ' + opts.format(d.value)).join(', ');
}

export function drawHbars(canvas, items, opts) {
  const { ctx, w, h } = setupCanvas(canvas);
  const pad = { l: 118, r: 64, t: 8, b: 8 };
  const max = Math.max(...items.map((d) => d.value)) * 1.05;
  const rowH = (h - pad.t - pad.b) / items.length;
  ctx.font = '12px system-ui, sans-serif';
  items.forEach((d, i) => {
    const y = pad.t + rowH * i + rowH * 0.2;
    const bh = rowH * 0.6;
    ctx.fillStyle = '#1c2733';
    ctx.textAlign = 'right';
    ctx.fillText(d.label, pad.l - 8, y + bh / 2 + 4);
    ctx.fillStyle = opts.color || '#12836f';
    const bw = ((w - pad.l - pad.r) * d.value) / max;
    ctx.beginPath();
    ctx.roundRect(pad.l, y, bw, bh, [0, 4, 4, 0]);
    ctx.fill();
    ctx.fillStyle = '#1c2733';
    ctx.textAlign = 'left';
    ctx.fillText(opts.format(d.value), pad.l + bw + 8, y + bh / 2 + 4);
  });
  canvas.title = items.map((d) => d.label + ': ' + opts.format(d.value)).join(', ');
}
