import React, { useState } from 'react';

function BrowserShell({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab, onUrlBarSubmit, currentUrl, children }) {
  const [urlInput, setUrlInput] = useState(currentUrl);

  React.useEffect(() => {
    setUrlInput(currentUrl);
  }, [currentUrl]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    onUrlBarSubmit(urlInput);
  };

  return (
    <div className="browser-shell">
      {/* Browser Chrome */}
      <div className="browser-chrome">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="browser-controls">
            <button className="control-btn" title="Back">←</button>
            <button className="control-btn" title="Forward">→</button>
            <button className="control-btn" title="Reload">⟳</button>
          </div>

          {/* URL Bar */}
          <form className="url-bar" onSubmit={handleUrlSubmit}>
            <svg className="url-icon" viewBox="0 0 24 24">
              <path d="M10 2a8 8 0 015.95 13.3l4.37 4.37 1.41-1.41-4.37-4.37A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
            <input
              type="text"
              className="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search or enter URL"
            />
          </form>

          <button className="menu-btn" title="Menu">⋮</button>
        </div>

        {/* Tabs Bar */}
        <div className="tabs-bar">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab ${tab.id === activeTabId ? 'active' : ''}`}
                onClick={() => onSelectTab(tab.id)}
              >
                <div className="tab-icon">🔍</div>
                <div className="tab-title">{tab.title}</div>
                <button
                  className="tab-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="new-tab-btn" onClick={() => onNewTab('home', 'New Tab')}>
            +
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="browser-content">
        {children}
      </div>
    </div>
  );
}

export default BrowserShell;
