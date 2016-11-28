import hexRgb from 'hex-rgb';

export const color = {
  mainBackground: '#f5f5f5',
  mainFont: '#4d4d4d',
  mainHorizontalRule: '#c5c5c5',
  primaryLight: '#ffffff',
  altPrimaryLight: '#f6f6f6',
  secondaryLight: '#e6e6e6',
  thirdLight: '#bfbfbf',
  fourthLight: '#ededed',
  fifthLight: '#d9d9d9',
  medium: '#737373',
  secondaryMedium: '#999999',
  primaryDark: '#000000',
  primaryHighlight: '#AF2F2F',
  secondaryHighlight: '#af5b5e',
  thirdHighlight: '#cc9a9a',
  checkLight: '#bddad5',
  checkDark: '#5dc2af',
};

export const rgba = (hex, alpha) => {
  const rgb = hexRgb(hex);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};
