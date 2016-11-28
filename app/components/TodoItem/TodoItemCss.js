import { color } from '../../common_assets/css';

const styles = {
  todoListLi: {
    position: 'relative',
    fontSize: 24,
    borderBottom: `1px solid ${color.fourthLight}`,
    ':hover': {}, // tell radium to track this state, used below
  },
  todoListLiToggle: {
    textAlign: 'center',
    width: 40,
    /* auto, since non-WebKit browsers doesn't support input styling */
    height: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    border: 'none', /* Mobile Safari */
    appearance: 'none',
    WebkitAppearance: 'none',
    '@media screen and (-webkit-min-device-pixel-ratio:0)': {
      background: 'none',
      height: 40,
    },
  },
  get todoListLiToggleAfter() {
    return Object.assign(
      {},
      this.todoListLiToggle,
      {
        content: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="${color.fourthLight}" stroke-width="3"/></svg>')`,
      }
    );
  },
  get todoListLiToggleAfterChecked() {
    return Object.assign(
      {},
      this.todoListLiToggle,
      {
        content: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="${color.checkLight}" stroke-width="3"/><path fill="${color.checkDark}" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>')`,
      }
    );
  },
  todoListLiLabel: {
    wordBreak: 'break-all',
    padding: '15px 60px 15px 15px',
    marginLeft: 45,
    display: 'block',
    lineHeight: '1.2em',
    transition: 'color 0.4s',
  },
  todoListLiCompletedLabel: {
    color: color.fifthLight,
    textDecoration: 'line-through',
  },
  todoListLiDestroy: {
    display: 'none',
    position: 'absolute',
    top: 0,
    right: 10,
    bottom: 0,
    width: 40,
    height: 40,
    marginTop: 'auto',
    marginRight: 0,
    marginBottom: 11,
    marginLeft: 0,
    fontSize: 30,
    color: color.thirdHighlight,
    transition: 'color 0.2s ease-out',
    ':hover': {
      color: color.secondaryHighlight,
    },
  },
  todoListLiDestroyHover: {
    display: 'block',
  },
  todoListLiEditing: {
    borderBottom: 'none',
    padding: 0,
  },
  todoListLiEditingEdit: {
    display: 'block',
    width: 506,
    padding: '12px 16px',
    margin: '0 0 0 43px',
  },
  todoListLiEditingView: {
    display: 'none',
  },

  todoListLiEdit: {
    display: 'none',
  },
  todoListLiLastChild: {
    borderBottom: 'none',
  },
  todoListLiEditingLastChild: {
    marginBottom: -1,
  },
};

export default styles;
