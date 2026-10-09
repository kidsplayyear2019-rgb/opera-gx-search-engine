function WebViewPage({ url }) {
  return (
    <div className="webview-container">
      <iframe
        src={url}
        title="Web View"
        className="webview-iframe"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation"
      />
    </div>
  );
}

export default WebViewPage;
