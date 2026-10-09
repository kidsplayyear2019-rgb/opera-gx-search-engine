import { useMemo } from 'react';

const resultData = {
  default: [
    {
      title: 'Opera GX: Gaming Browser Features & Neon Experience',
      url: 'https://opera.com/gx',
      snippet:
        'Discover the GX browser with built-in features for gaming, network control, and a neon-styled interface designed for speed and focus.',
    },
    {
      title: 'Google Search UI Design Patterns for Fast Access',
      url: 'https://design.google',
      snippet:
        'Learn how search pages use minimal layout, large input controls, and instant actions to create a smooth user journey.',
    },
    {
      title: 'Modern Dark Theme Dashboard Inspiration',
      url: 'https://dribbble.com',
      snippet:
        'Explore dark-mode dashboard concepts with glass panels, accent colors, and utility widgets tuned for productivity.',
    },
  ],
  'opera gx': [
    {
      title: 'Opera GX Browser - The Gaming Browser',
      url: 'https://opera.com/gx',
      snippet:
        'Explore GX Control, sound effects, CPU limiter, and browser customization built for gamers and creators.',
    },
    {
      title: 'GX Corner: Customization and Lifestyle',
      url: 'https://browser.gg',
      snippet:
        'Find themes, wallpapers, and browser tweaks that match your gaming setup and everyday workflow.',
    },
    {
      title: 'Neon UI Design for Browsers and Apps',
      url: 'https://uxdesign.cc',
      snippet:
        'Learn how to craft cyberpunk-inspired layouts with strong contrast, layered cards, and glowing highlights.',
    },
  ],
  'google search': [
    {
      title: 'Google Search - Official Product Page',
      url: 'https://google.com/search',
      snippet:
        'Access the official search experience and learn about search technologies, ranking systems, and personalization.',
    },
    {
      title: 'Search Page UX Research',
      url: 'https://material.io',
      snippet:
        'Read about best practices in minimal interface design, content density, and action placement for search interactions.',
    },
    {
      title: 'How Search Engines Work',
      url: 'https://wikipedia.org',
      snippet:
        'A summary of crawler indexing, ranking, relevance scoring, and page retrieval behind modern web search systems.',
    },
  ],
};

function ResultsPage({ query, onNavigate, onOpenNewTab }) {
  const results = useMemo(() => {
    const key = (query || '').trim().toLowerCase();
    if (!key) return resultData.default;
    return resultData[key] || resultData.default;
  }, [query]);

  const handleCardClick = (url) => {
    onOpenNewTab(url);
  };

  return (
    <main className="results-view">
      <section className="results-panel">
        <div className="results-stats">About {results.length * 15} results for "{query}"</div>
        {results.map((item, idx) => (
          <article 
            key={idx} 
            className="result-card" 
            onClick={() => handleCardClick(item.url)}
            role="button"
            tabIndex="0"
          >
            <div className="result-domain">{item.url}</div>
            <h3>{item.title}</h3>
            <p>{item.snippet}</p>
            <div className="result-actions" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => handleCardClick(item.url)}>Open in Tab</button>
              <button type="button">Save</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ResultsPage;
