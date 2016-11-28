import { color, rgba } from '../../common_assets/css';

const styles = {
  footer: {
    color: color.medium,
    padding: '10px 15px',
    height: 20,
    textAlign: 'center',
    borderTop: `1px solid ${color.secondaryLight}`,
    boxShadow: `
      0 1px 1px ${rgba(color.primaryDark, 0.2)},
      0 8px 0 -3px ${color.altPrimaryLight},
      0 9px 1px -3px ${rgba(color.primaryDark, 0.2)},
      0 16px 0 -6px ${color.altPrimaryLight},
      0 17px 2px -6px ${rgba(color.primaryDark, 0.2)}
    `,
  },
  footerBefore: {
    content: '',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 50,
    overflow: 'hidden',
  },
  todoCount: {
    float: 'left',
    textAlign: 'left',
  },
  todoCountStrong: {
    fontWeight: 300,
  },
  filters: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    position: 'absolute',
    right: 0,
    left: 0,
  },
  filtersLi: {
    display: 'inline',
  },
  filtersLiA: {
    color: 'inherit',
    margin: 3,
    padding: '3px 7px',
    textDecoration: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: 3,
    ':hover': {
      borderColor: rgba(color.primaryHighlight, 0.1),
    },
  },
  filtersLiASelected: {
    borderColor: rgba(color.primaryHighlight, 0.2),
  },
  clearCompleted: {
    float: 'right',
    position: 'relative',
    lineHeight: '20px',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  info: {
    margin: '65px auto 0',
    color: color.thirdLight,
    fontSize: 10,
    textShadow: `0 1px 0 ${rgba(color.primaryDark, 0.5)}`,
    textAlign: 'center',
  },
  infoP: {
    lineHeight: 1,
  },
  infoA: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 400,
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default styles;
