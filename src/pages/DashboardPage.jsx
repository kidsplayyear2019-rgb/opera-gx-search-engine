import { useState } from 'react';

const quickLinks = [
  { label: 'YouTube', icon: '▶', accent: 'pink', url: 'https://youtube.com' },
  { label: 'Discord', icon: '◉', accent: 'purple', url: 'https://discord.com' },
  { label: 'GitHub', icon: '∎', accent: 'cyan', url: 'https://github.com' },
  { label: 'Spotify', icon: '♫', accent: 'green', url: 'https://spotify.com' },
];

const trendingTopics = [
  'Opera GX themes',
  'Neon UI inspiration',
  'Google homepage redesign',
  'Custom browser dashboard',
  'Dark mode search UI',
];

function DashboardPage({ onNavigate, onSearch, onOpenNewTab }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleTrendingClick = (topic) => {
    onSearch(topic);
  };

  return (
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
              <button
                key={link.label}
                type="button"
                className={`quick-link ${link.accent}`}
                onClick={() => onOpenNewTab(link.url)}
                title={`Open ${link.label}`}
              >
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
              <li key={topic} onClick={() => handleTrendingClick(topic)} role="button" tabIndex="0">
                {topic}
              </li>
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
            <form className="search-summary-box" onSubmit={handleSearch}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Dashboard search"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
