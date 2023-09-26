export const getHistory = () => {
  return JSON.parse(localStorage.getItem("searchHistory"));
};

export const saveToHistory = (item) => {
  const history = getHistory() || [];
  if (!history.includes(item)) {
    history.push(item);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
};

export const removeFromHistory = (item) => {
  const history = getHistory();
  const newHistory = history.filter((el) => el !== item);
  localStorage.setItem("searchHistory", JSON.stringify(newHistory));
};

export const waitForRandomTime = (callback) => {
  // Function to create a random delay so search time is not 0 seconds
  const minDelay = 100;
  const maxDelay = 1000;

  const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

  setTimeout(() => {
    callback();
  }, randomDelay);
};
