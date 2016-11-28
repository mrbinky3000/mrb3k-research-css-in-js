import React from 'react';
import Radium from 'radium';
import styles from './TodoItemCss';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.todo.title,
      hovering: false,
    };
  }

  /**
  * Safely manipulate the DOM after updating the state when invoking
  * `this.props.onEdit()` in the `handleEdit` method above.
  * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
  * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
  */
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      this.node.focus();
      this.node.setSelectionRange(this.node.value.length, this.node.value.length);
    }
  }

  handleSubmit() {
    const val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title });
  }

  handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }

  handleChange(event) {
    this.setState({ editText: event.target.value });
  }

  render() {
    return (
      <li
        key={this.props.todo.id}
        style={[
          styles.todoListLi,
          this.props.editing && styles.todoListLiEditing,
        ]}
      >
        <div className="view">
          <span
            style={[
              styles.todoListLiToggleAfter,
              this.props.todo.completed && styles.todoListLiToggleAfterChecked,
            ]}
          />
          <input
            style={styles.todoListLiToggle}
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label
            style={[
              styles.todoListLiLabel,
              this.props.todo.completed && styles.todoListLiCompletedLabel,
            ]}
            htmlFor={'btnDestroy'}
            onDoubleClick={this.handleEdit}
          >
            {this.props.todo.title}
          </label>
          <button
            id="btnDestroy"
            style={[
              styles.todoListLiDestroy,
              Radium.getState(this.state, this.props.todo.id, ':hover') ?
                styles.todoListLiDestroyHover : null,
            ]}
            onClick={this.props.onDestroy}
          >×</button>
        </div>
        <input
          ref={(node) => { this.node = node; }}
          style={styles.todoListLiEdit}
          value={this.state.editText}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </li>
    );
  }
}

export default Radium(TodoItem);
