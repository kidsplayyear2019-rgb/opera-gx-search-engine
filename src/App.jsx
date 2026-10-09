import { useMemo, useState } from 'react';

const quickLinks = [
  { label: 'YouTube', icon: '▶', accent: 'pink' },
  { label: 'Discord', icon: '◎', accent: 'purple' },
  { label: 'GitHub', icon: '⌘', accent: 'cyan' },
  { label: 'Spotify', icon: '♫', accent: 'green' },
];

const trendingTopics = [
  'Opera GX themes',
  'Neon UI inspiration',
  'Google homepage redesign',
  'Custom browser dashboard',
  'Dark mode search UI',
];

const resultData = {
  default: [
    {
      title: 'Opera GX: Gaming Browser Features & Neon Experience',
      url: 'opera.com/gx',
      snippet:
        'Discover the GX browser with built-in features for gaming, network control, and a neon-styled interface designed for speed and focus.',
    },
    {
      title: 'Google Search UI Design Patterns for Fast Access',
      url: 'design.google',
      snippet:
        'Learn how search pages use minimal layout, large input controls, and instant actions to create a smooth user journey.',
    },
    {
      title: 'Modern Dark Theme Dashboard Inspiration',
      url: 'dribbble.com',
      snippet:
        'Explore dark-mode dashboard concepts with glass panels, accent colors, and utility widgets tuned for productivity.',
    },
  ],
  'opera gx': [
    {
      title: 'Opera GX Browser - The Gaming Browser',
      url: 'opera.com/gx',
      snippet:
        'Explore GX Control, sound effects, CPU limiter, and browser customization built for gamers and creators.',
    },
    {
      title: 'GX Corner: Customization and Lifestyle',
      url: 'browser.gg',
      snippet:
        'Find themes, wallpapers, and browser tweaks that match your gaming setup and everyday workflow.',
    },
    {
      title: 'Neon UI Design for Browsers and Apps',
      url: 'uxdesign.cc',
      snippet:
        'Learn how to craft cyberpunk-inspired layouts with strong contrast, layered cards, and glowing highlights.',
    },
  ],
  'google search': [
    {
      title: 'Google Search - Official Product Page',
      url: 'google.com/search',
      snippet:
        'Access the official search experience and learn about search technologies, ranking systems, and personalization.',
    },
    {
      title: 'Search Page UX Research',
      url: 'material.io',
      snippet:
        'Read about best practices in minimal interface design, content density, and action placement for search interactions.',
    },
    {
      title: 'How Search Engines Work',
      url: 'wikipedia.org',
      snippet:
        'A summary of crawler indexing, ranking, relevance scoring, and page retrieval behind modern web search systems.',
    },
  ],
};

function App() {
  const [query, setQuery] = useState('Opera GX search');
  const [activeView, setActiveView] = useState('home');

  const results = useMemo(() => {
    const key = query.trim().toLowerCase();
    if (!key) return resultData.default;
    return resultData[key] || resultData.default;
  }, [query]);

  const performSearch = (event) => {
    if (event) event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
    window.open(googleUrl, '_blank', 'noopener,noreferrer');
    setActiveView('results');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <nav className="nav">
          <div className="nav-left">
            <button className={`nav-pill ${activeView === 'home' ? 'active' : ''}`} onClick={() => setActiveView('home')}>
              Home
            </button>
            <button className={`nav-pill ${activeView === 'results' ? 'active' : ''}`} onClick={() => setActiveView('results')}>
              Results
            </button>
            <button className={`nav-pill ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>
              GX Dashboard
            </button>
          </div>
          <div className="nav-right">
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">Gmail</a>
            <a href="https://images.google.com" target="_blank" rel="noreferrer">Images</a>
            <button className="apps-button" aria-label="Google apps">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </button>
            <button className="signin-button">Sign in</button>
          </div>
        </nav>
      </header>

      {activeView === 'home' && (
        <main className="home-view">
          <div className="logo" aria-label="Google wordmark">
            <span className="g-blue">G</span>
            <span className="g-red">o</span>
            <span className="g-yellow">o</span>
            <span className="g-blue">g</span>
            <span className="g-green">l</span>
            <span className="g-red">e</span>
          </div>

          <form className="search-form" onSubmit={performSearch}>
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 2a8 8 0 015.95 13.3l4.37 4.37 1.41-1.41-4.37-4.37A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Google or type a URL"
                aria-label="Search"
              />
              <button type="button" className="icon-button" aria-label="Voice search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a1 1 0 112 0 7 7 0 01-6 6.93V21h-2v-2.07A7 7 0 017 12a1 1 0 112 0 5 5 0 0010 0zm-5 9a9 9 0 01-9-9 1 1 0 112 0 7 7 0 0014 0 1 1 0 112 0 9 9 0 01-9 9z" />
                </svg>
              </button>
              <button type="button" className="icon-button" aria-label="Search by image">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 0v14h12V5H6zm2.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm8 9.5l-3-3.5-2.5 2.9-1.8-2.1-2.7 3.7h10.0z" />
                </svg>
              </button>
            </div>

            <div className="button-row">
              <button type="submit" className="primary-action">Google Search</button>
              <button type="button" className="secondary-action" onClick={() => setActiveView('dashboard')}>
                I’m Feeling Lucky
              </button>
            </div>
          </form>
        </main>
      )}

      {activeView === 'results' && (
        <main className="results-view">
          <div className="results-header">
            <div className="mini-logo">GX</div>
            <form className="mini-search" onSubmit={performSearch}>
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 2a8 8 0 015.95 13.3l4.37 4.37 1.41-1.41-4.37-4.37A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search results"
              />
            </form>
          </div>

          <section className="results-panel">
            <div className="results-stats">About {results.length * 15} results</div>
            {results.map((item) => (
              <article key={item.title} className="result-card">
                <div className="result-domain">{item.url}</div>
                <h3>{item.title}</h3>
                <p>{item.snippet}</p>
                <div className="result-actions">
                  <button type="button">Open</button>
                  <button type="button">Save</button>
                </div>
              </article>
            ))}
          </section>
        </main>
      )}

      {activeView === 'dashboard' && (
        <main className="dashboard-view">
          <aside className="sidebar-panel">
            <div className="panel-header">
              <span className="dot purple" />
              <span className="dot cyan" />
              <span className="dot pink" />
            </div>

            <div className="profile-card">
              <div className="avatar">GX</div>
              <div>
                <strong>GX Mode</strong>
                <span>Gaming Focus</span>
              </div>
            </div>

            <div className="widget-block">
              <h4>Quick Links</h4>
              <div className="link-grid">
                {quickLinks.map((link) => (
                  <button key={link.label} type="button" className={`quick-link ${link.accent}`}>
                    <span>{link.icon}</span>
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="widget-block">
              <h4>Trending</h4>
              <ul className="trend-list">
                {trendingTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="main-panel">
            <div className="hero-metric">
              <div>
                <small>Today</small>
                <h2>3.2k</h2>
              </div>
              <div className="sparkline" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="panel-grid">
              <div className="glass-card">
                <h4>Downloads</h4>
                <div className="metric-row">
                  <strong>1,248</strong>
                  <span className="up">+18.2%</span>
                </div>
              </div>

              <div className="glass-card">
                <h4>Focus Score</h4>
                <div className="metric-row">
                  <strong>89/100</strong>
                  <span className="up">+7 pts</span>
                </div>
              </div>

              <div className="glass-card full-width">
                <h4>Search Summary</h4>
                <div className="search-summary-box">
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Dashboard search"
                  />
                  <button type="button" onClick={() => performSearch()}>Search</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
