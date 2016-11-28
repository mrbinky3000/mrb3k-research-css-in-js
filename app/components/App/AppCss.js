import { color, rgba } from '../../common_assets/css';

const styles = {
  hidden: {
    display: 'none',
  },
  todoapp: {
    background: color.primaryLight,
    margin: '130px 0 40px 0',
    position: 'relative',
    boxShadow: `
      0 2px 4px 0 ${rgba(color.primaryDark, 0.2)},
      0 25px 50px 0 ${rgba(color.primaryDark, 0.1)}
    `,
  },
  todoappH1: {
    position: 'absolute',
    top: -155,
    width: '100%',
    fontSize: 100,
    fontWeight: '100',
    textAlign: 'center',
    color: rgba(color.primaryHighlight, 0.15),
    textRendering: 'optimizeLegibility',
  },
  newTodoBase: {
    position: 'relative',
    margin: 0,
    width: '100%',
    fontSize: 24,
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    lineHeight: '1.4em',
    color: 'inherit',
    padding: 6,
    border: `1px solid ${color.secondaryMedium}`,
    boxShadow: `inset 0 -1px 5px 0 ${rgba(color.primaryDark, 0.2)}`,
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  get edit() {
    return this.newTodoBase;
  },
  get newTodo() {
    return Object.assign({}, this.newTodoBase, {
      padding: '16px 16px 16px 60px',
      border: 'none',
      background: rgba(color.primaryDark, 0.003),
      boxShadow: `inset 0 -2px 1px ${rgba(color.primaryDark, 0.03)}`,
    });
  },
  main: {
    position: 'relative',
    zIndex: 2,
    borderTop: `1px solid ${color.secondaryLight}`,
  },
  toggleAll: {
    position: 'absolute',
    top: -66,
    left: -1,
    width: 49,
    height: 60,
    textAlign: 'center',
    border: 'none',
    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      background: 'none',
      WebkitAppearance: 'none',
      appearance: 'none',
    },
  },
  toggleAllLabel: {
    display: 'none',
  },
  toggleAllBefore: {
    position: 'absolute',
    top: -50,
    left: -12,
    width: 60,
    height: 34,
    textAlign: 'center',
    border: 'none',
    fontSize: 22,
    color: color.secondaryLight,
    transform: 'rotate(90deg)',
  },
  toggleAllCheckedBefore: {
    color: color.medium,
  },
  todoList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
};

export default styles;
