import React from 'react';
import classNames from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;


class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.todo.title,
    };
  }

  /**
  * This is a completely optional performance enhancement that you can
  * implement on any React component. If you were to delete this method
  * the app would still work correctly (and still be very performant!), we
  * just use it as an example of how little code it takes to get an order
  * of magnitude performance improvement.
  */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
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
        className={
          classNames({
            completed: this.props.todo.completed,
            editing: this.props.editing,
          })
         }
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label htmlFor={'btnDestroy'} onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button
            id="btnDestroy"
            className="destroy"
            onClick={this.props.onDestroy}
          />
        </div>
        <input
          ref={(node) => { this.node = node; }}
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </li>
    );
  }
}

export default TodoItem;
