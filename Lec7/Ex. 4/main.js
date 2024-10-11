function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function logMouseCoordinates(event) {
  console.log(`Mouse stopped at: X=${event.clientX}, Y=${event.clientY}`);
}

const debouncedLogMouseCoordinates = debounce(logMouseCoordinates);

document.addEventListener("mousemove", debouncedLogMouseCoordinates);
