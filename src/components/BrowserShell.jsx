import React, { useState, useEffect } from 'react';

function BrowserShell({ tabs, activeTabId, onSelectTab, onCloseTab, onNewTab, onUrlBarSubmit, onBack, onForward, onReload, currentUrl, canGoBack, canGoForward, children }) {
  const [urlInput, setUrlInput] = useState(currentUrl);

  useEffect(() => {
    setUrlInput(currentUrl);
  }, [currentUrl]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    onUrlBarSubmit(urlInput);
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleForwardClick = () => {
    onForward();
  };

  const handleReloadClick = () => {
    onReload();
  };

  return (
    <div className="browser-shell">
      {/* Browser Chrome */}
      <div className="browser-chrome">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="browser-controls">
            <button 
              className={`control-btn ${!canGoBack ? 'disabled' : ''}`}
              onClick={handleBackClick}
              disabled={!canGoBack}
              title="Back (Alt + Left Arrow)"
            >
              ←
            </button>
            <button 
              className={`control-btn ${!canGoForward ? 'disabled' : ''}`}
              onClick={handleForwardClick}
              disabled={!canGoForward}
              title="Forward (Alt + Right Arrow)"
            >
              →
            </button>
            <button 
              className="control-btn"
              onClick={handleReloadClick}
              title="Reload (Ctrl + R)"
            >
              ⟳
            </button>
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

          <button className="menu-btn" title="Menu" onClick={() => alert('Menu opened')}>
            ⋮
          </button>
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
                  title="Close tab"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button className="new-tab-btn" onClick={() => onNewTab('home', 'New Tab')} title="Open new tab">
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
