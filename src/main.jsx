import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Play,
  Info,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Check,
  X,
  ExternalLink
} from "lucide-react";

import catalog from "./content.json";
import "./styles.css";

// const iconMap = { Github, Linkedin, Mail, ExternalLink, Code2, Sparkles };

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header-solid" : ""}`}>
      <a className="brand" href="#home" aria-label="Ritesh home">
        Ritesh<span className="brand-dot">.</span>
      </a>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#featured">Featured Projects</a>
        <a href="#projects">All Projects</a>
        <a href="#blogs">Blogs</a>
        <a href="#connect">Connect</a>
      </nav>

      <div className="header-actions">
        <Search size={19} />
        <Bell size={19} />

        <div className="avatar">
          <img
            src="/images/ritesh-avatar.png"
            alt="Ritesh Chavan"
          />
        </div>

        <ChevronDown size={15} />
      </div>
    </header>
  );
}



function Hero({ onMore, videoSrc = "/videos/ritesh-hero.mp4" }) {
  const hero = catalog.hero;

  return (
    <section className="hero" id="home">
      <div className="hero-video-wrap">
<video
  className="hero-video"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  onEnded={(e) => {
    e.currentTarget.currentTime = 0;
    e.currentTarget.play().catch(() => {});
  }}
>
  <source
    src="/videos/ritesh-hero.mp4"
    type="video/mp4"
  />
</video>

        <div
          className="hero-still"
          style={{ backgroundImage: `url("${hero.image}")` }}
        />
      </div>

      <div className="hero-shade" />
      <div className="hero-bottom-shade" />

      <div className="hero-content">
        <div className="eyebrow">
          <span className="n-mark">N</span>
          RITESH CHAVAN · DEVELOPER PORTFOLIO
        </div>

        <h1>{hero.title}</h1>

        <div className="hero-meta">
          <span className="match">Full Stack Developer</span>
          <span>{hero.year}</span>
          <span className="quality">PORTFOLIO</span>
          <span>{hero.duration}</span>
        </div>

        <p className="hero-description">{hero.description}</p>

        <div className="hero-buttons">
          <a
            className="btn btn-light"
            href={hero.primaryUrl || "#projects"}
          >
            <Play size={21} fill="currentColor" />
            {hero.primaryLabel || "Explore Projects"}
          </a>

          <button
            className="btn btn-muted"
            onClick={() => onMore(hero)}
          >
            <Info size={22} />
            More About Me
          </button>
        </div>

        <div className="hero-tags">
          {hero.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <div className="age-rating">
        <span>DEV</span>
        Open to opportunities
      </div>
    </section>
  );
}


function PosterCard({ item, onClick }) {
  return (
    <button
      className="poster-card"
      onClick={() => onClick(item)}
      aria-label={`Open ${item.title}`}
    >
      <div className="poster-image-wrap">
        <div
          className="poster-fallback"
          style={{
            background:
              item.color ||
              "linear-gradient(135deg, #292929, #090909)",
          }}
        >
          <span>{item.mark || item.title.slice(0, 2).toUpperCase()}</span>
        </div>

        {item.image && (
          <img
            className="poster-image"
            src={item.image}
            alt={`${item.title} project thumbnail`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <div className="poster-hover">
          <div className="poster-controls">
            <span className="circle-play">
              <Play size={16} fill="currentColor" />
            </span>
            <span className="circle-icon">
              <Plus size={17} />
            </span>
            <span className="circle-icon">
              <Info size={17} />
            </span>
          </div>

          <div className="poster-title">{item.title}</div>

          <div className="poster-subline">
            <span>{item.year || "Featured"}</span>
            <span className="mini-tag">{item.type || "Project"}</span>
          </div>
        </div>
      </div>

      <span className="poster-caption">{item.title}</span>
    </button>
  );
}

function Row({ id, title, subtitle, items, onClick }) {
  if (!items?.length) return null;
  return <section className="content-row" id={id}>
    <div className="row-heading"><div><h2>{title}<span className="row-arrow">›</span></h2>{subtitle && <p>{subtitle}</p>}</div></div>
    <div className="poster-track">{items.map(item=><PosterCard key={item.id} item={item} onClick={onClick}/>)}</div>
  </section>;
}

function Modal({ item, onClose }) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!item) return;
    const onKey = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [item, onClose]);
  if (!item) return null;
  const isLink = item.type === "Connect" || item.type === "Blog";
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget) onClose();}}>
    <article className="detail-modal">
      <button className="modal-close" onClick={onClose} aria-label="Close"><X size={22}/></button>
      <div className="modal-media">
        {item.video ? <video autoPlay muted loop controls playsInline poster={item.image}><source src={item.video} type="video/mp4"/></video> :
          <div className="modal-art" style={{backgroundImage:`linear-gradient(0deg,#141414 0%,transparent 70%),url("${item.image}")`}}/>}
        <div className="modal-media-title"><div className="modal-kicker"><span className="n-mark">N</span> {item.type || "FEATURED TITLE"}</div><h2>{item.title}</h2>
          <div className="modal-actions">{item.url && <a className="btn btn-light" href={item.url} target="_blank" rel="noreferrer"><Play size={19} fill="currentColor"/> {item.actionLabel || (isLink ? "Open Link" : "View Project")}</a>}
          <button className="btn btn-outline" onClick={()=>setAdded(!added)}>{added?<Check size={19}/>:<Plus size={19}/>} {added?"Added to My List":"My List"}</button></div>
        </div>
      </div>
      <div className="modal-body">
        <div className="modal-main"><div className="modal-meta"><span className="match">98% Match</span><span>{item.year || "2026"}</span><span className="quality">HD</span></div>
          <p className="modal-description">{item.description}</p>
          {item.highlights?.length > 0 && <><h3>Highlights</h3><ul className="highlights">{item.highlights.map(h=><li key={h}>{h}</li>)}</ul></>}
        </div>
        <aside className="modal-side"><p><span>Tech stack:</span> {(item.tech || []).join(" · ") || "Creative work"}</p>{item.role && <p><span>Role:</span> {item.role}</p>}{item.category && <p><span>Category:</span> {item.category}</p>}{item.github && <p><span>Source:</span> <a href={item.github} target="_blank" rel="noreferrer">GitHub <ExternalLink size={12}/></a></p>}</aside>
      </div>
    </article>
  </div>;
}

function ProfileScreen({ onEnter }) {
  return (
    <main className="profile-screen">
      <div className="profile-content">
        <div className="profile-brand">
          RITESH<span>.</span>
        </div>

        <h1>Who's watching?</h1>
        <p className="profile-subtitle">
          Choose your experience
        </p>

        <button
          className="profile-card"
          onClick={onEnter}
          aria-label="Enter Ritesh Chavan's portfolio"
        >
          <div className="profile-avatar">
            <img
              src="/images/ritesh-avatar.png"
              alt=""
            />
          </div>

          <span className="profile-name">Ritesh</span>
          <span className="profile-role">Developer</span>
        </button>

        <button
          className="manage-profiles"
          onClick={onEnter}
        >
          ENTER PORTFOLIO
        </button>

        <p className="profile-footer">
          FULL STACK DEVELOPMENT · AI · CREATIVE TECHNOLOGY
        </p>
      </div>
    </main>
  );
}

function TudumIntro({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2400);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="tudum-intro" aria-label="Ritesh portfolio intro">
      <div className="tudum-glow" />

      <div className="tudum-mark">
        <img src="/images/ritesh-avatar.png" alt="" />
      </div>

      <div className="tudum-wordmark">
        RITESH CHAVAN
      </div>
    </div>
  );
}


function App() {
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [introFinished, setIntroFinished] = useState(false);
  const [entered, setEntered] = useState(false);

  const close = () => setSelected(null);

  const filtered = catalog.projects.filter((p) =>
    `${p.title} ${p.description} ${(p.tech || []).join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // 1. Show the cinematic intro first.
  if (!introFinished) {
    return (
      <TudumIntro
        onComplete={() => setIntroFinished(true)}
      />
    );
  }

  // 2. Then show the profile-selection screen.
  if (!entered) {
    return (
      <ProfileScreen
        onEnter={() => setEntered(true)}
      />
    );
  }

  // 3. Finally render the portfolio.
  return (
    <div className="app">
      <Header />

      <Hero onMore={setSelected} />

      <main className="rows-area">
        <Row
          id="featured"
          title="Featured Projects"
          subtitle="The titles everyone's talking about"
          items={catalog.featured
            .map((id) => catalog.projects.find((p) => p.id === id))
            .filter(Boolean)}
          onClick={setSelected}
        />

        <div className="all-projects-heading" id="projects">
          <div>
            <h2>All Projects</h2>
            <p>Explore the full collection</p>
          </div>

          <label className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech"
            />
          </label>
        </div>

        <div className="poster-track all-projects-track">
          {filtered.map((item) => (
            <PosterCard
              key={item.id}
              item={item}
              onClick={setSelected}
            />
          ))}
        </div>

        {!filtered.length && (
          <p className="empty">
            No titles found. Try another search.
          </p>
        )}

        <Row
          id="blogs"
          title="Blogs & Notes"
          subtitle="Thoughts, learnings, and behind-the-scenes"
          items={catalog.blogs}
          onClick={setSelected}
        />

        <Row
          id="connect"
          title="Connect with Me"
          subtitle="Pick your next destination"
          items={catalog.connect}
          onClick={setSelected}
        />
      </main>

      <footer className="footer">
        <div className="footer-brand">
          Ritesh<span className="brand-dot">.</span>
        </div>

        <p>Building useful things. One commit at a time.</p>

        <div className="footer-links">
          {catalog.connect.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.title}
            </a>
          ))}
        </div>

        <small>
          © {new Date().getFullYear()} Ritesh · Made for the curious.
        </small>
      </footer>

      <Modal item={selected} onClose={close} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App/>);
