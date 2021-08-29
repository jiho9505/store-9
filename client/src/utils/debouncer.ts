let clickTimer;
export const debounce = (callback) => (e) => {
  if (clickTimer) return;
  callback(e);
  clickTimer = setTimeout(() => {
    clearTimeout(clickTimer);
    clickTimer = null;
  }, 1000);
};
