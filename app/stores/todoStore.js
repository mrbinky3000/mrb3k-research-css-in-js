import extend from 'extend';
import Utils from '../common_assets/utils';
import constants from '../common_assets/constants';
import todoActions from '../actions/todoActions';
import alt from '../common_assets/alt-application';

const LOCALSTORAGE_NAMESPACE = 'react-alt-todo';

class TodoStore {
  constructor() {
    this.state = {
      todos: Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`),
      nowShowing: Utils.store(`${LOCALSTORAGE_NAMESPACE}.nowShowing`) || constants.ALL_TODOS,
      editing: Utils.store(`${LOCALSTORAGE_NAMESPACE}.editing`) || null,
    };

    this.bindListeners({
      addTodo: todoActions.addTodo,
      toggleAll: todoActions.toggleAll,
      toggle: todoActions.toggle,
      destroy: todoActions.destroy,
      save: todoActions.save,
      clearCompleted: todoActions.clearCompleted,
      edit: todoActions.edit,
      show: todoActions.show,
    });

    this.displayName = 'TodoStore';
  }

  addTodo(todo) {
    this.setState({
      todos: this.state.todos.concat(todo),
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  toggleAll(checked) {
    const updatedTodos = this.state.todos.map(todo => extend({}, todo, { completed: checked }));

    this.setState({
      todos: updatedTodos,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  toggle(todoToToggle) {
    const updatedTodos = this.state.todos.map(todo => (
      todo !== todoToToggle ?
      todo :
      extend({}, todo, { completed: !todo.completed })
    ));

    this.setState({
      todos: updatedTodos,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  destroy(todoToDestroy) {
    const updatedTodos = this.state.todos.filter(todo => (todo !== todoToDestroy));

    this.setState({
      todos: updatedTodos,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  save(command) {
    const updatedTodos = this.state.todos.map(todo => (
      todo !== command.todoToSave ?
      todo :
      extend({}, command.todoToSave, { title: command.text })
    ));

    this.setState({
      todos: updatedTodos,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  clearCompleted() {
    const updatedTodos = this.state.todos.filter(todo => !todo.completed);

    this.setState({
      todos: updatedTodos,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.todos`, this.state.todos);
  }

  edit(id) {
    this.setState({
      editing: id,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.editing`, this.editing);
  }

  show(nowShowing) {
    this.setState({
      nowShowing,
    });

    Utils.store(`${LOCALSTORAGE_NAMESPACE}.nowShowing`, this.nowShowing);
  }
}

const todoStore = alt.createStore(TodoStore);

console.log('todoStore', todoStore);

export default todoStore;
