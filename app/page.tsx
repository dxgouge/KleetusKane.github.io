import React from "react";
import {
  Phone, MapPin, Clock, Check, ArrowRight,
  Droplet, Droplets, Disc3, Gauge, Activity, CircleDot,
} from "lucide-react";

// ── Real shop details — change here if anything updates ──────────────
const SHOP = {
  name: "Kleetus Kane Transport",
  tagline: "Performance and Maintenance",
  addr1: "225 S. Hamilton St",
  addr2: "Eden, NC 27288",
  phoneText: "336-635-8008",
  phoneTel: "tel:3366358008",
};

const services = [
  { icon: Droplet, name: "Oil & filter changes", body: "Conventional, blend, or full synthetic — done quick and clean." },
  { icon: Disc3, name: "Brake service", body: "Pads, rotors, and fluid. Inspected and fixed right." },
  { icon: Droplets, name: "Fluid services", body: "Transmission, coolant, and more — flushed before they fail." },
  { icon: Gauge, name: "Performance & tuning", body: "Upgrades and tuning to dial in real, reliable power." },
  { icon: Activity, name: "Diagnostics", body: "Check-engine lights and hard-to-find gremlins, sorted." },
  { icon: CircleDot, name: "Tires & upkeep", body: "Rotation, balancing, and the routine work that keeps it healthy." },
];

const values = [
  { title: "Skilled, hands-on techs", body: "People who know performance and maintenance and do the job properly the first time." },
  { title: "Fair, upfront pricing", body: "An honest quote before we touch anything. No surprise add-ons, ever." },
  { title: "Reliable, on-time work", body: "We respect your time — service done right and ready when we say." },
];

// ── Honeycomb backdrop generator (flat-top hexes) ───────────────────
function hexPoints(cx: number, cy: number, R: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i);
    pts.push(`${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}
function honeycomb(w: number, h: number, R: number): string[] {
  const dx = 1.5 * R;
  const dy = Math.sqrt(3) * R;
  const cells: string[] = [];
  let c = 0;
  for (let x = 0; x <= w + R; x += dx, c++) {
    const yoff = (c % 2) * (dy / 2);
    for (let y = -dy; y <= h + dy; y += dy) cells.push(hexPoints(x, y + yoff, R));
  }
  return cells;
}
const HEXES = honeycomb(1200, 620, 34);

function Brand({ size = 1.15 }: { size?: number }) {
  return (
    <span className="kk-brand" style={{ fontSize: `${size}rem` }}>
      <span className="chrome">KLEETUS KANE</span>{" "}
      <span className="kk-orange">TRANSPORT</span>
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="kk-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,600;0,700;0,800;1,700;1,800&family=Barlow:wght@400;500;600;700&display=swap');
        .kk-root{
          --bg:#0B0B0C; --bg2:#141416; --panel:#1A1A1D; --line:rgba(255,255,255,.10);
          --orange:#ED7A1C; --orange-deep:#C85F0E; --text:#F2F1EF; --text-soft:#A7A5A0;
          --display:'Kanit',sans-serif; --body:'Barlow',sans-serif;
          font-family:var(--body); background:var(--bg); color:var(--text);
          -webkit-font-smoothing:antialiased; line-height:1.6; overflow-x:hidden;
        }
        .kk-root *{box-sizing:border-box; margin:0; padding:0;}
        .kk-wrap{max-width:1140px; margin:0 auto; padding:0 24px;}
        .kk-kicker{font-family:var(--body); font-weight:600; font-size:.72rem; letter-spacing:.32em; text-transform:uppercase; color:var(--orange);}

        .kk-brand{font-family:var(--display); font-weight:800; font-style:italic; letter-spacing:-.01em; white-space:nowrap; line-height:1;}
        .chrome{background:linear-gradient(180deg,#ffffff 0%,#e9e9ec 32%,#98989c 54%,#f4f4f6 70%,#b6b6ba 100%);
          -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent;
          filter:drop-shadow(0 2px 2px rgba(0,0,0,.55));}
        .kk-orange{color:var(--orange); text-shadow:0 0 20px rgba(237,122,28,.35);}

        .kk-btn{display:inline-flex; align-items:center; gap:8px; font-family:var(--display); font-weight:700; font-style:italic; font-size:1rem; letter-spacing:.01em; padding:13px 24px; border-radius:4px; cursor:pointer; border:1px solid transparent; transition:all .18s ease; text-decoration:none;}
        .kk-btn-primary{background:var(--orange); color:#120a03; box-shadow:0 0 24px rgba(237,122,28,.28);}
        .kk-btn-primary:hover{background:#ff8a2a; transform:translateY(-1px);}
        .kk-btn-ghost{background:transparent; color:var(--text); border-color:var(--line);}
        .kk-btn-ghost:hover{border-color:var(--orange); color:var(--orange);}

        .kk-hex{width:42px; height:42px; flex-shrink:0; display:grid; place-items:center;
          clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%); background:var(--orange); color:#120a03;}
        .kk-hex.outline{background:var(--panel); color:var(--orange); position:relative;}
        .kk-hex.outline::before{content:""; position:absolute; inset:0; clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);
          background:linear-gradient(135deg,var(--orange),transparent); opacity:.22;}

        .kk-nav{position:sticky; top:0; z-index:30; background:rgba(11,11,12,.82); backdrop-filter:blur(10px); border-bottom:1px solid var(--line);}
        .kk-nav-in{display:flex; align-items:center; justify-content:space-between; height:68px;}
        .kk-nav-links{display:flex; align-items:center; gap:28px;}
        .kk-nav-links a{font-weight:600; font-size:.9rem; color:var(--text-soft); text-decoration:none; transition:color .15s;}
        .kk-nav-links a:hover{color:var(--text);}
        .kk-nav-links a.kk-btn{color:#120a03;}

        .kk-hero{position:relative; overflow:hidden; border-bottom:1px solid var(--line);}
        .kk-hero-bg{position:absolute; inset:0; z-index:0; width:100%; height:100%;
          -webkit-mask-image:radial-gradient(ellipse 90% 80% at 25% 40%,#000 0%,transparent 78%);
          mask-image:radial-gradient(ellipse 90% 80% at 25% 40%,#000 0%,transparent 78%);}
        .kk-hero-glow{position:absolute; inset:0; z-index:0; pointer-events:none;
          background:radial-gradient(circle at 12% 30%,rgba(237,122,28,.16),transparent 42%);}
        .kk-hero-in{position:relative; z-index:1; display:grid; grid-template-columns:1.15fr .85fr; gap:52px; align-items:center; padding:78px 0 70px;}
        .kk-hero h1{margin:18px 0 10px;}
        .kk-hero .line1{display:block; font-family:var(--display); font-weight:800; font-style:italic; font-size:clamp(2.6rem,6vw,4.8rem); line-height:.92; letter-spacing:-.02em;}
        .kk-hero .line2{display:block; font-family:var(--display); font-weight:800; font-style:italic; font-size:clamp(2.6rem,6vw,4.8rem); line-height:.92; letter-spacing:-.02em; margin-top:2px;}
        .kk-sub{font-size:1.1rem; color:var(--text-soft); max-width:40ch; margin:20px 0 30px;}
        .kk-cta-row{display:flex; gap:12px; flex-wrap:wrap; margin-bottom:30px;}
        .kk-trust{display:flex; gap:22px; flex-wrap:wrap;}
        .kk-trust span{display:flex; align-items:center; gap:7px; font-size:.86rem; color:var(--text-soft); font-weight:500;}
        .kk-trust svg{color:var(--orange); flex-shrink:0;}

        .kk-contact{background:var(--panel); border:1px solid var(--line); border-radius:10px; overflow:hidden;}
        .kk-contact-top{padding:16px 20px; border-bottom:1px solid var(--line); background:#0f0f11;}
        .kk-contact-row{display:flex; align-items:center; gap:14px; padding:18px 20px;}
        .kk-contact-row + .kk-contact-row{border-top:1px solid var(--line);}
        .kk-contact-row .lbl{font-size:.66rem; letter-spacing:.18em; text-transform:uppercase; color:var(--text-soft); font-weight:600;}
        .kk-contact-row .val{font-family:var(--display); font-weight:700; font-size:1.12rem;}
        .kk-contact-row a.val{color:var(--text); text-decoration:none;}

        .kk-section{padding:80px 0;}
        .kk-sec-head{margin-bottom:44px; max-width:640px;}
        .kk-sec-head .kk-kicker{display:block; margin-bottom:14px;}
        h2.kk-h2{font-family:var(--display); font-weight:800; font-style:italic; font-size:clamp(1.8rem,3.6vw,2.7rem); line-height:1.02; letter-spacing:-.02em;}
        .kk-sec-sub{font-size:1.04rem; color:var(--text-soft); margin-top:14px;}

        .kk-grid3{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
        .kk-card{background:var(--bg2); border:1px solid var(--line); border-radius:10px; padding:24px; transition:transform .18s ease,border-color .18s ease;}
        .kk-card:hover{transform:translateY(-3px); border-color:var(--orange);}
        .kk-card .kk-hex{margin-bottom:16px;}
        .kk-card h3{font-family:var(--display); font-weight:700; font-size:1.14rem; margin-bottom:7px;}
        .kk-card p{font-size:.93rem; color:var(--text-soft);}

        .kk-why{background:var(--bg2); border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
        .kk-ben{display:grid; grid-template-columns:repeat(3,1fr); gap:32px;}
        .kk-ben-item h3{font-family:var(--display); font-weight:700; font-size:1.16rem; margin-bottom:9px; display:flex; align-items:flex-start; gap:11px;}
        .kk-ben-item h3 .chk{display:grid; place-items:center; width:24px; height:24px; flex-shrink:0; margin-top:2px;
          clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%); background:var(--orange); color:#120a03;}
        .kk-ben-item p{font-size:.95rem; color:var(--text-soft);}

        .kk-visit{position:relative; overflow:hidden;}
        .kk-visit-bg{position:absolute; inset:0; z-index:0; width:100%; height:100%;
          -webkit-mask-image:radial-gradient(ellipse 80% 90% at 80% 50%,#000 0%,transparent 75%);
          mask-image:radial-gradient(ellipse 80% 90% at 80% 50%,#000 0%,transparent 75%);}
        .kk-visit-in{position:relative; z-index:1; text-align:center; padding:86px 0;}
        .kk-visit h2{font-family:var(--display); font-weight:800; font-style:italic; font-size:clamp(2rem,4.4vw,3.2rem); letter-spacing:-.02em; margin-bottom:14px;}
        .kk-visit .addr{font-size:1.05rem; color:var(--text-soft); margin-bottom:6px;}
        .kk-visit .hours{font-size:.92rem; color:var(--text-soft); margin-bottom:28px;}
        .kk-visit-cta{display:flex; gap:12px; justify-content:center; flex-wrap:wrap;}

        .kk-foot{border-top:1px solid var(--line); padding:46px 0; background:#0a0a0b;}
        .kk-foot-grid{display:flex; flex-wrap:wrap; gap:30px; justify-content:space-between; align-items:flex-start;}
        .kk-foot-col h4{font-size:.64rem; letter-spacing:.2em; text-transform:uppercase; color:var(--text-soft); font-weight:600; margin-bottom:13px;}
        .kk-foot-col .ln{display:flex; align-items:center; gap:9px; font-size:.92rem; color:var(--text-soft); margin-bottom:9px;}
        .kk-foot-col .ln a{color:var(--text-soft); text-decoration:none;}
        .kk-foot-col .ln svg{color:var(--orange);}
        .kk-foot-tag{font-size:.85rem; color:var(--text-soft); margin-top:12px; max-width:280px;}
        .kk-foot-bot{margin-top:34px; padding-top:18px; border-top:1px solid var(--line); font-size:.72rem; letter-spacing:.04em; color:var(--text-soft); display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;}

        .reveal{opacity:0; animation:kkUp .7s cubic-bezier(.2,.7,.2,1) forwards;}
        @keyframes kkUp{from{opacity:0; transform:translateY(16px);} to{opacity:1; transform:none;}}
        @media (prefers-reduced-motion:reduce){.reveal{animation:none; opacity:1;}}

        @media (max-width:880px){
          .kk-hero-in{grid-template-columns:1fr; gap:40px;}
          .kk-sub{max-width:none;}
          .kk-grid3,.kk-ben{grid-template-columns:1fr;}
          .kk-nav-links a:not(.kk-btn){display:none;}
        }
      `}</style>

      <nav className="kk-nav">
        <div className="kk-wrap kk-nav-in">
          <Brand size={1.15} />
          <div className="kk-nav-links">
            <a href="#services">Services</a>
            <a href="#why">Why us</a>
            <a href={SHOP.phoneTel} className="kk-btn kk-btn-primary" style={{ padding: "9px 18px", fontSize: ".9rem" }}>
              <Phone size={15} /> Call
            </a>
          </div>
        </div>
      </nav>

      <header className="kk-hero">
        <svg className="kk-hero-bg" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {HEXES.map((pts, i) => (
            <polygon key={i} points={pts} fill="none" stroke="rgba(237,122,28,.16)" strokeWidth="1.4" />
          ))}
        </svg>
        <div className="kk-hero-glow" aria-hidden="true" />
        <div className="kk-wrap kk-hero-in">
          <div>
            <span className="kk-kicker reveal" style={{ animationDelay: ".05s" }}>{SHOP.tagline}</span>
            <h1 className="reveal" style={{ animationDelay: ".12s" }}>
              <span className="line1 chrome">KLEETUS KANE</span>
              <span className="line2 kk-orange">TRANSPORT</span>
            </h1>
            <p className="kk-sub reveal" style={{ animationDelay: ".2s" }}>
              Performance work and honest maintenance in Eden, NC — done by people who care about doing it right, at a price that's upfront.
            </p>
            <div className="kk-cta-row reveal" style={{ animationDelay: ".28s" }}>
              <a href={SHOP.phoneTel} className="kk-btn kk-btn-primary"><Phone size={16} /> Call {SHOP.phoneText}</a>
              <a href="#services" className="kk-btn kk-btn-ghost">See our services <ArrowRight size={16} /></a>
            </div>
            <div className="kk-trust reveal" style={{ animationDelay: ".36s" }}>
              <span><Check size={16} strokeWidth={2.6} /> Performance & maintenance</span>
              <span><Check size={16} strokeWidth={2.6} /> Upfront pricing</span>
              <span><Check size={16} strokeWidth={2.6} /> Walk-ins welcome</span>
            </div>
          </div>

          <div className="kk-contact reveal" style={{ animationDelay: ".3s" }}>
            <div className="kk-contact-top"><Brand size={1} /></div>
            <div className="kk-contact-row">
              <span className="kk-hex"><MapPin size={20} strokeWidth={2.2} /></span>
              <div>
                <div className="lbl">Visit us</div>
                <div className="val">{SHOP.addr1}</div>
                <div className="val" style={{ fontWeight: 400, fontSize: "1rem" }}>{SHOP.addr2}</div>
              </div>
            </div>
            <div className="kk-contact-row">
              <span className="kk-hex"><Phone size={20} strokeWidth={2.2} /></span>
              <div>
                <div className="lbl">Call the shop</div>
                <a className="val" href={SHOP.phoneTel}>{SHOP.phoneText}</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="services" className="kk-section">
        <div className="kk-wrap">
          <div className="kk-sec-head">
            <span className="kk-kicker">/ performance &amp; maintenance</span>
            <h2 className="kk-h2">Everything your vehicle needs, one shop.</h2>
            <p className="kk-sec-sub">From routine upkeep to real performance work — handled by people who know what they're doing.</p>
          </div>
          <div className="kk-grid3">
            {services.map((s) => {
              const Ic = s.icon;
              return (
                <div className="kk-card" key={s.name}>
                  <span className="kk-hex"><Ic size={20} strokeWidth={2.1} /></span>
                  <h3>{s.name}</h3>
                  <p>{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why" className="kk-section kk-why">
        <div className="kk-wrap">
          <div className="kk-sec-head">
            <span className="kk-kicker">/ why kleetus kane</span>
            <h2 className="kk-h2">Real work. Fair prices. No runaround.</h2>
          </div>
          <div className="kk-ben">
            {values.map((b) => (
              <div className="kk-ben-item" key={b.title}>
                <h3><span className="chk"><Check size={14} strokeWidth={3} /></span>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="kk-visit">
        <svg className="kk-visit-bg" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {HEXES.map((pts, i) => (
            <polygon key={i} points={pts} fill="none" stroke="rgba(237,122,28,.10)" strokeWidth="1.4" />
          ))}
        </svg>
        <div className="kk-wrap kk-visit-in">
          <h2>Ready when you are.</h2>
          <p className="addr">{SHOP.addr1}, {SHOP.addr2}</p>
          <p className="hours">Mon–Fri 8a–6p · Sat 9a–2p · Walk-ins always welcome</p>
          <div className="kk-visit-cta">
            <a href={SHOP.phoneTel} className="kk-btn kk-btn-primary"><Phone size={16} /> Call {SHOP.phoneText}</a>
          </div>
        </div>
      </section>

      <footer className="kk-foot">
        <div className="kk-wrap">
          <div className="kk-foot-grid">
            <div>
              <Brand size={1.15} />
              <p className="kk-foot-tag">{SHOP.tagline} — done right, priced fair, in Eden, NC.</p>
            </div>
            <div className="kk-foot-col">
              <h4>Visit the shop</h4>
              <div className="ln"><MapPin size={15} /> {SHOP.addr1}</div>
              <div className="ln" style={{ paddingLeft: 24 }}>{SHOP.addr2}</div>
              <div className="ln"><Phone size={15} /> <a href={SHOP.phoneTel}>{SHOP.phoneText}</a></div>
            </div>
            <div className="kk-foot-col">
              <h4>Hours</h4>
              <div className="ln"><Clock size={15} /> Mon–Fri · 8a–6p</div>
              <div className="ln"><Clock size={15} /> Sat · 9a–2p</div>
              <div className="ln"><Clock size={15} /> Sun · Closed</div>
            </div>
            <div className="kk-foot-col">
              <h4>More</h4>
              <div className="ln"><a href="#services">Services</a></div>
              <div className="ln"><a href="#why">Why choose us</a></div>
            </div>
          </div>
          <div className="kk-foot-bot">
            <span>© {new Date().getFullYear()} {SHOP.name} · All rights reserved</span>
            <span>Verify services &amp; hours before launch</span>
          </div>
        </div>
      </footer>
    </div>
  );
}