import { useState } from 'react';
import './styles.css';
import BrowserShell from './components/BrowserShell';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import WebViewPage from './pages/WebViewPage';

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, type: 'home', title: 'GX Search', url: 'gx://home', history: ['gx://home'], historyIndex: 0 }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabIdCounter, setTabIdCounter] = useState(2);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const addTab = (type = 'home', title = 'New Tab', url = 'gx://home') => {
    const newTab = {
      id: tabIdCounter,
      type,
      title,
      url,
      history: [url],
      historyIndex: 0
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(tabIdCounter);
    setTabIdCounter(tabIdCounter + 1);
  };

  const closeTab = (tabId) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const updateTab = (tabId, updates) => {
    setTabs(tabs.map(tab => {
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
  };

  const goBack = () => {
    if (!activeTab) return;
    if (activeTab.historyIndex > 0) {
      const newIndex = activeTab.historyIndex - 1;
      const url = activeTab.history[newIndex];
      setTabs(tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, historyIndex: newIndex, url, ...getPageType(url) }
          : tab
      ));
    }
  };

  const goForward = () => {
    if (!activeTab) return;
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const newIndex = activeTab.historyIndex + 1;
      const url = activeTab.history[newIndex];
      setTabs(tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, historyIndex: newIndex, url, ...getPageType(url) }
          : tab
      ));
    }
  };

  const reload = () => {
    if (!activeTab) return;
    // Reload just re-renders the current page, so nothing special needed
  };

  const getPageType = (url) => {
    if (url === 'gx://home') {
      return { type: 'home', title: 'GX Search' };
    } else if (url.startsWith('gx://search')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const query = params.get('q') || '';
      return { type: 'results', title: `Search: ${query}`, query };
    } else if (url === 'gx://dashboard') {
      return { type: 'dashboard', title: 'GX Dashboard' };
    } else if (url.startsWith('http://') || url.startsWith('https://')) {
      return { type: 'webview', title: url };
    }
    return { type: 'home', title: 'GX Search' };
  };

  const handleSearch = (query) => {
    const newUrl = `gx://search?q=${encodeURIComponent(query)}`;
    updateTab(activeTabId, {
      type: 'results',
      title: `Search: ${query}`,
      url: newUrl,
      query
    });
  };

  const handleNavigate = (url) => {
    const pageInfo = getPageType(url);
    updateTab(activeTabId, {
      url,
      ...pageInfo
    });
  };

  const handleUrlBarSubmit = (url) => {
    let processedUrl = url.trim();
    
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://') && !processedUrl.startsWith('gx://')) {
      if (processedUrl.includes('.') && !processedUrl.includes(' ')) {
        processedUrl = 'https://' + processedUrl;
      } else {
        return handleSearch(processedUrl);
      }
    }
    
    handleNavigate(processedUrl);
  };

  const renderPageContent = () => {
    if (!activeTab) return null;
    
    switch (activeTab.type) {
      case 'home':
        return <HomePage onSearch={handleSearch} onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsPage query={activeTab.query} onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onSearch={handleSearch} />;
      case 'webview':
        return <WebViewPage url={activeTab.url} key={activeTab.url} />;
      default:
        return <HomePage onSearch={handleSearch} onNavigate={handleNavigate} />;
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
