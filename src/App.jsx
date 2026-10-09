import { useState } from 'react';
import './styles.css';
import BrowserShell from './components/BrowserShell';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import WebViewPage from './pages/WebViewPage';

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, type: 'home', title: 'GX Search', url: 'gx://home' }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [tabIdCounter, setTabIdCounter] = useState(2);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const addTab = (type = 'home', title = 'New Tab', url = 'gx://home') => {
    const newTab = {
      id: tabIdCounter,
      type,
      title,
      url
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
    setTabs(tabs.map(tab =>
      tab.id === tabId ? { ...tab, ...updates } : tab
    ));
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
    if (url.startsWith('http://') || url.startsWith('https://')) {
      updateTab(activeTabId, {
        type: 'webview',
        title: url,
        url
      });
    } else if (url === 'gx://home') {
      updateTab(activeTabId, {
        type: 'home',
        title: 'GX Search',
        url: 'gx://home'
      });
    } else if (url === 'gx://dashboard') {
      updateTab(activeTabId, {
        type: 'dashboard',
        title: 'GX Dashboard',
        url: 'gx://dashboard'
      });
    }
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
    switch (activeTab.type) {
      case 'home':
        return <HomePage onSearch={handleSearch} onNavigate={handleNavigate} />;
      case 'results':
        return <ResultsPage query={activeTab.query} onNavigate={handleNavigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onSearch={handleSearch} />;
      case 'webview':
        return <WebViewPage url={activeTab.url} />;
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
      currentUrl={activeTab?.url || 'gx://home'}
    >
      {renderPageContent()}
    </BrowserShell>
  );
}

export default App;
