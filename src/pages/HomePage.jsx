import { useState } from 'react';

const quickLinks = [
  { label: 'YouTube', icon: '▶', accent: 'pink', url: 'https://youtube.com' },
  { label: 'Discord', icon: '◯', accent: 'purple', url: 'https://discord.com' },
  { label: 'GitHub', icon: '⌘', accent: 'cyan', url: 'https://github.com' },
  { label: 'Spotify', icon: '♫', accent: 'green', url: 'https://spotify.com' },
  { label: 'Google', icon: '🔍', accent: 'purple', url: 'https://google.com' },
  { label: 'Reddit', icon: '◈', accent: 'pink', url: 'https://reddit.com' },
];

function HomePage({ onSearch, onNavigate }) {
  const [query, setQuery] = useState('');

  const performSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google or type a URL"
            aria-label="Search"
            autoFocus
          />
          <button type="button" className="icon-button" aria-label="Voice search" title="Voice search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a1 1 0 112 0 7 7 0 01-6 6.93V21h-2v-2.07A7 7 0 017 12a1 1 0 112 0 5 5 0 0010 0zm-5 9a9 9 0 01-9-9 1 1 0 112 0 7 7 0 0014 0 1 1 0 112 0 9 9 0 01-9 9z" />
            </svg>
          </button>
          <button type="button" className="icon-button" aria-label="Search by image" title="Search by image">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2 0v14h12V5H6zm2.5 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm8 9.5l-3-3.5-2.5 2.9-1.8-2.1-2.7 3.7h10.0z" />
            </svg>
          </button>
        </div>

        <div className="button-row">
          <button type="submit" className="primary-action">Google Search</button>
          <button type="button" className="secondary-action" onClick={() => onNavigate('gx://dashboard')}>
            I'm Feeling Lucky
          </button>
        </div>
      </form>

      <div className="quick-links-section">
        <h3 className="section-title">Quick Links</h3>
        <div className="links-grid">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              className={`quick-link-card ${link.accent}`}
              onClick={() => onNavigate(link.url)}
              title={`Open ${link.label}`}
            >
              <span className="link-icon">{link.icon}</span>
              <span className="link-label">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default HomePage;
