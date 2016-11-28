import React from 'react';
import Radium from 'radium';
import Utils from '../../common_assets/utils';
import constants from '../../common_assets/constants';
import styles from './FooterCss';

const Footer = (props) => {
  const activeTodoWord = Utils.pluralize(props.count, 'item');
  let clearButton = null;

  if (props.completedCount > 0) {
    clearButton = (
      <button
        style={styles.clearCompleted}
        onClick={props.onClearCompleted}
      >
        Clear completed
      </button>
    );
  }

  const nowShowing = props.nowShowing;
  console.log('nowShowing', props.nowShowing);
  return (
    <div>
      <div style={styles.footerBefore}>&nbsp;</div>
      <footer style={styles.footer}>
        <span style={styles.todoCount}>
          <strong style={styles.todoCountStrong}>{props.count}</strong> {activeTodoWord} left
        </span>
        <ul style={styles.filters}>
          <li key={'filter1'} style={styles.filtersLi}>
            <a
              key={'anchor1'}
              style={[
                styles.filtersLiA,
                nowShowing === constants.ALL_TODOS && styles.filtersLiASelected : null,
              ]}
              href="#/"
            >All</a>
          </li>
          {' '}
          <li key={'filter2'} style={styles.filtersLi}>
            <a
              key={'anchor2'}
              style={[
                styles.filtersLiA,
                (nowShowing === constants.ACTIVE_TODOS) ? styles.filtersLiASelected : null,
              ]}
              href="#/active"
            >Active</a>
          </li>
          {' '}
          <li key={'filter3'} style={styles.filtersLi}>
            <a
              key={'anchor3'}
              style={[
                styles.filtersLiA,
                (nowShowing === constants.COMPLETED_TODOS) ? styles.filtersLiASelected : null,
              ]}
              href="#/completed"
            >Completed</a>
          </li>
        </ul>
        {clearButton}
      </footer>
    </div>
  );
};

export default Radium(Footer);
