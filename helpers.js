/**
 * AURÉLIA FINE JEWELLERY & GEMS
 * Utility & Helper Functions
 */

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const lerp = (start, end, factor) => start + (end - start) * factor;

/**
 * Normalizes mouse coordinates from -1 to 1 based on window dimensions
 */
export const getNormalizedMousePos = (e) => {
  return {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: -(e.clientY / window.innerHeight) * 2 + 1,
    rawX: e.clientX,
    rawY: e.clientY
  };
};

/**
 * Debounce helper for high-frequency window events
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Detect WebGL availability on the current client
 */
export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};
