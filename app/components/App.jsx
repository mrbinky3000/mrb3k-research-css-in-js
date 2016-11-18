import React from 'react';
import { Router } from 'director/build/director';
import TodoFooter from './Footer';
import TodoItem from './TodoItem';
import TodoStore from '../stores/todoStore';
import TodoActions from '../actions/todoActions';
import constants from '../common_assets/constants';

const ENTER_KEY = 13;

class App extends React.Component {
  static toggleAll(event) {
    const checked = event.target.checked;
    TodoActions.toggleAll(checked);
  }

  static toggle(todoToToggle) {
    TodoActions.toggle(todoToToggle);
  }

  static destroy(todo) {
    TodoActions.destroy(todo);
  }

  static edit(todo) {
    TodoActions.edit(todo.id);
  }

  static save(todoToSave, text) {
    TodoActions.save({
      todoToSave,
      text,
    });

    TodoActions.edit(null);
  }

  static cancel() {
    TodoActions.edit(null);
  }

  static clearCompleted() {
    TodoActions.clearCompleted();
  }

  constructor() {
    super();
    this.state = TodoStore.getState();
  }

  componentDidMount() {
    TodoStore.listen(this.onStoreChange.bind(this));

    const router = new Router({
      '/': () => {
        console.log('all todos');
        TodoActions.show(constants.ALL_TODOS);
      },
      '/active': () => {
        console.log('active todos');
        TodoActions.show(constants.ACTIVE_TODOS);
      },
      '/completed': () => {
        console.log('completed todos');
        TodoActions.show(constants.COMPLETED_TODOS);
      },
    });

    router.init();
  }

  componentWillUnmount() {
    TodoStore.unlisten(this.onStoreChange);
  }

  onStoreChange(state) {
    this.setState(state);
  }

  handleChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.setState({ newTodo: '' });
      TodoActions.addTodo(val);
    }
  }

  render() {
    let footer = null;
    let main = null;
    const todos = this.state.todos;

    const shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case constants.ACTIVE_TODOS:
          return !todo.completed;
        case constants.COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    const todoItems = shownTodos.map(todo =>
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={App.toggle.bind(this, todo)}
        onDestroy={App.destroy.bind(this, todo)}
        onEdit={App.edit.bind(this, todo)}
        editing={this.state.editing === todo.id}
        onSave={App.save.bind(this, todo)}
        onCancel={App.cancel}
      />, this
    );

    const activeTodoCount = todos.reduce((accum, todo) => (todo.completed ? accum : accum + 1), 0);

    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />
      );
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onChange={App.toggleAll.bind(this)}
            checked={activeTodoCount === 0}
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            autoFocus
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

export default App;
