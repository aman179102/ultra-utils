/**
 * Color utility functions - 10+ functions
 * Color manipulation, conversion, and generation utilities
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color (with or without #)
 * @returns {Object} RGB object {r, g, b}
 */
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  return { r, g, b };
}

/**
 * Convert RGB to hex color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} Hex color
 */
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert RGB to HSL
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {Object} HSL object {h, s, l}
 */
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Convert HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {Object} RGB object {r, g, b}
 */
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Generate random color
 * @param {string} format - Output format (hex, rgb, hsl)
 * @returns {string|Object} Random color
 */
function randomColor(format = 'hex') {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  
  switch (format) {
    case 'rgb':
      return { r, g, b };
    case 'hsl':
      return rgbToHsl(r, g, b);
    default:
      return rgbToHex(r, g, b);
  }
}

/**
 * Lighten a color
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to lighten (0-100)
 * @returns {string} Lightened hex color
 */
function lighten(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newL = Math.min(100, l + amount);
  const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL);
  return rgbToHex(newR, newG, newB);
}

/**
 * Darken a color
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to darken (0-100)
 * @returns {string} Darkened hex color
 */
function darken(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newL = Math.max(0, l - amount);
  const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL);
  return rgbToHex(newR, newG, newB);
}

/**
 * Saturate a color
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to saturate (0-100)
 * @returns {string} Saturated hex color
 */
function saturate(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newS = Math.min(100, s + amount);
  const { r: newR, g: newG, b: newB } = hslToRgb(h, newS, l);
  return rgbToHex(newR, newG, newB);
}

/**
 * Desaturate a color
 * @param {string} hex - Hex color
 * @param {number} amount - Amount to desaturate (0-100)
 * @returns {string} Desaturated hex color
 */
function desaturate(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newS = Math.max(0, s - amount);
  const { r: newR, g: newG, b: newB } = hslToRgb(h, newS, l);
  return rgbToHex(newR, newG, newB);
}

/**
 * Get complementary color
 * @param {string} hex - Hex color
 * @returns {string} Complementary hex color
 */
function complement(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const newH = (h + 180) % 360;
  const { r: newR, g: newG, b: newB } = hslToRgb(newH, s, l);
  return rgbToHex(newR, newG, newB);
}

/**
 * Generate color palette
 * @param {string} baseColor - Base hex color
 * @param {number} count - Number of colors in palette
 * @returns {Array} Array of hex colors
 */
function generatePalette(baseColor, count = 5) {
  const { r, g, b } = hexToRgb(baseColor);
  const { h, s, l } = rgbToHsl(r, g, b);
  const palette = [];
  
  for (let i = 0; i < count; i++) {
    const newH = (h + (360 / count) * i) % 360;
    const { r: newR, g: newG, b: newB } = hslToRgb(newH, s, l);
    palette.push(rgbToHex(newR, newG, newB));
  }
  
  return palette;
}

/**
 * Calculate color contrast ratio
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio
 */
function contrastRatio(color1, color2) {
  const getLuminance = (hex) => {
    const { r, g, b } = hexToRgb(hex);
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color is light
 * @param {string} hex - Hex color
 * @returns {boolean} True if light color
 */
function isLight(hex) {
  const { r, g, b } = hexToRgb(hex);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

/**
 * Check if color is dark
 * @param {string} hex - Hex color
 * @returns {boolean} True if dark color
 */
function isDark(hex) {
  return !isLight(hex);
}

/**
 * Mix two colors
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @param {number} weight - Weight of first color (0-100)
 * @returns {string} Mixed hex color
 */
function mix(color1, color2, weight = 50) {
  const { r: r1, g: g1, b: b1 } = hexToRgb(color1);
  const { r: r2, g: g2, b: b2 } = hexToRgb(color2);
  
  const w = weight / 100;
  const r = Math.round(r1 * w + r2 * (1 - w));
  const g = Math.round(g1 * w + g2 * (1 - w));
  const b = Math.round(b1 * w + b2 * (1 - w));
  
  return rgbToHex(r, g, b);
}


module.exports.hexToRgb = hexToRgb;
module.exports.rgbToHex = rgbToHex;
module.exports.rgbToHsl = rgbToHsl;
module.exports.hslToRgb = hslToRgb;
module.exports.randomColor = randomColor;
module.exports.lighten = lighten;
module.exports.darken = darken;
module.exports.saturate = saturate;
module.exports.desaturate = desaturate;
module.exports.complement = complement;
module.exports.generatePalette = generatePalette;
module.exports.contrastRatio = contrastRatio;
module.exports.isLight = isLight;
module.exports.isDark = isDark;
module.exports.mix = mix;