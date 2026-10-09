import { useState, useCallback } from 'react';
import './styles.css';
import BrowserShell from './components/BrowserShell';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import WebViewPage from './pages/WebViewPage';

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, type: 'home', title: 'GX Search', url: 'gx://home', history: ['gx://home'], historyIndex: 0, query: '' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabIdCounter, setTabIdCounter] = useState(2);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const getPageType = useCallback((url) => {
    if (url === 'gx://home') {
      return { type: 'home', title: 'GX Search' };
    } else if (url.startsWith('gx://search')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const query = params.get('q') || '';
      return { type: 'results', title: `Search: ${query}`, query };
    } else if (url === 'gx://dashboard') {
      return { type: 'dashboard', title: 'GX Dashboard' };
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        const urlObj = new URL(url);
        return { type: 'webview', title: urlObj.hostname || url };
      } catch {
        return { type: 'webview', title: url };
      }
    }
    return { type: 'home', title: 'GX Search' };
  }, []);

  const addTab = useCallback((type = 'home', title = 'New Tab', url = 'gx://home', query = '') => {
    const newTab = {
      id: tabIdCounter,
      type,
      title,
      url,
      query,
      history: [url],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(tabIdCounter);
    setTabIdCounter(prev => prev + 1);
  }, [tabIdCounter]);

  const closeTab = useCallback((tabId) => {
    setTabs(prev => {
      if (prev.length === 1) return prev;
      const newTabs = prev.filter(tab => tab.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabId(newTabs[0].id);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const updateTab = useCallback((tabId, updates) => {
    setTabs(prev => prev.map(tab => {
      if (tab.id === tabId) {
        const updated = { ...tab, ...updates };
        // Update history if URL changed
        if (updates.url && updates.url !== tab.url) {
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(updates.url);
          updated.history = newHistory;
          updated.historyIndex = newHistory.length - 1;
        }
        return updated;
      }
      return tab;
    }));
  }, []);

  const goBack = useCallback(() => {
    if (!activeTab || activeTab.historyIndex <= 0) return;
    const newIndex = activeTab.historyIndex - 1;
    const url = activeTab.history[newIndex];
    const pageInfo = getPageType(url);
    setTabs(prev => prev.map(tab =>
      tab.id === activeTabId
        ? { ...tab, historyIndex: newIndex, url, ...pageInfo }
        : tab
    ));
  }, [activeTab, activeTabId, getPageType]);

  const goForward = useCallback(() => {
    if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;
    const newIndex = activeTab.historyIndex + 1;
    const url = activeTab.history[newIndex];
    const pageInfo = getPageType(url);
    setTabs(prev => prev.map(tab =>
      tab.id === activeTabId
        ? { ...tab, historyIndex: newIndex, url, ...pageInfo }
        : tab
    ));
  }, [activeTab, activeTabId, getPageType]);

  const reload = useCallback(() => {
    // Reload triggers a re-render with the same URL
    if (activeTab) {
      setTabs(prev => [...prev]); // Trigger re-render
    }
  }, [activeTab]);

  const handleSearch = useCallback((query) => {
    const newUrl = `gx://search?q=${encodeURIComponent(query)}`;
    const pageInfo = getPageType(newUrl);
    updateTab(activeTabId, {
      url: newUrl,
      ...pageInfo
    });
  }, [activeTabId, getPageType, updateTab]);

  const handleNavigate = useCallback((url) => {
    const pageInfo = getPageType(url);
    updateTab(activeTabId, {
      url,
      ...pageInfo
    });
  }, [activeTabId, getPageType, updateTab]);

  const handleOpenInNewTab = useCallback((url) => {
    const pageInfo = getPageType(url);
    addTab(pageInfo.type, pageInfo.title, url, pageInfo.query || '');
  }, [addTab, getPageType]);

  const handleUrlBarSubmit = useCallback((url) => {
    let processedUrl = url.trim();
    
    if (!processedUrl) return;
    
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://') && !processedUrl.startsWith('gx://')) {
      // Check if it looks like a domain
      if (processedUrl.includes('.') && !processedUrl.includes(' ')) {
        processedUrl = 'https://' + processedUrl;
      } else {
        // It's a search query
        return handleSearch(processedUrl);
      }
    }
    
    handleNavigate(processedUrl);
  }, [handleSearch, handleNavigate]);

  const renderPageContent = () => {
    if (!activeTab) return null;
    
    switch (activeTab.type) {
      case 'home':
        return <HomePage onSearch={handleSearch} onNavigate={handleNavigate} onOpenNewTab={handleOpenInNewTab} />;
      case 'results':
        return <ResultsPage query={activeTab.query} onNavigate={handleNavigate} onOpenNewTab={handleOpenInNewTab} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onSearch={handleSearch} onOpenNewTab={handleOpenInNewTab} />;
      case 'webview':
        return <WebViewPage url={activeTab.url} key={`${activeTab.id}-${activeTab.url}`} />;
      default:
        return <HomePage onSearch={handleSearch} onNavigate={handleNavigate} onOpenNewTab={handleOpenInNewTab} />;
    }
  };

  return (
    <BrowserShell
      tabs={tabs}
      activeTabId={activeTabId}
      onSelectTab={setActiveTabId}
      onCloseTab={closeTab}
      onNewTab={addTab}
      onUrlBarSubmit={handleUrlBarSubmit}
      onBack={goBack}
      onForward={goForward}
      onReload={reload}
      currentUrl={activeTab?.url || 'gx://home'}
      canGoBack={activeTab && activeTab.historyIndex > 0}
      canGoForward={activeTab && activeTab.historyIndex < activeTab.history.length - 1}
    >
      {renderPageContent()}
    </BrowserShell>
  );
}

export default App;
