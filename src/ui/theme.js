const breakpointWidths = {
  s: '768px',
};

// keep in sync with styles/index.css
export default {
  breakpointWidths,
  breakpoints: [breakpointWidths.s],
  fontSizes: {
    xs: '0.75rem',
    s: '0.85rem',
    m: '1rem',
    l: '1.25rem',
    xl: '1.5rem',
  },
  colors: {
    background: '#050511',
    backgroundAlpha: 'rgba(0, 0, 0, 0.8)',
    black: '#000000',
    gray1: '#d2d2d4',
    gray2: '#9f9fa3',
    gray3: '#4a4a4e',
    primary: '#7171a5',
    white: '#ffffff',
  },
  space: ['0.0rem', '0.25rem', '0.5rem', '1rem', '2rem', '3rem'],
  fonts: {
    body: 'Archivo, sans-serif',
    heading: 'inherit',
    monospace: 'Roboto Mono, monospace',
    serif: 'Alegreya, serif',
  },
  fontWeights: {
    body: 400,
    bold: 700,
  },
};
