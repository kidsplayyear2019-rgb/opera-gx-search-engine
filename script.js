document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".search-form");
  const input = document.querySelector(".search-form input[name='q']");

  if (!form || !input) {
    return;
  }

  const handleSearch = () => {
    if (!input.value.trim()) {
      input.focus();
      return false;
    }
    return true;
  };

  form.addEventListener("submit", handleSearch);

  const voiceButton = document.querySelector(".voice-button");
  const lensButton = document.querySelector(".lens-button");

  if (voiceButton) {
    voiceButton.addEventListener("click", () => {
      input.value = "Opera GX themed search engine";
      input.focus();
    });
  }

  if (lensButton) {
    lensButton.addEventListener("click", () => {
      input.value = "Google search style homepage";
      input.focus();
    });
  }
});
