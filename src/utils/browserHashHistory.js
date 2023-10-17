export const pushHashState = hashedKey => {
  // Prevent pushing duplicate hash URL to browser history
  if (window.location.hash === hashedKey) {
    return;
  }

  if (typeof window.history.pushState === 'function') {
    window.history.pushState(null, document.title, hashedKey);
  } else {
    window.location.hash = hashedKey;
  }
};

export const resetHashState = (goBack = false) => {
  if (typeof window.history.replaceState === 'function') {
    window.history.replaceState(
      null,
      document.title,
      window.location.pathname + window.location.search,
    );
  } else {
    window.location.hash = '';
  }

  // Optionally go back history by 1
  if (goBack) {
    window.history.back();
  }
};
