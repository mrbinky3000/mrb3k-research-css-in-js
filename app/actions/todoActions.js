import uuid from 'uuid';
import extend from 'extend';
import alt from '../common_assets/alt-application';

const todoActions = extend(
  alt.generateActions(
    'toggleAll',
    'toggle',
    'destroy',
    'save',
    'clearCompleted',
    'edit',
    'show',
  ),
  alt.createActions({
    addTodo: (title) => {
      const thing = {
        id: uuid(),
        title,
        completed: false,
      };
      return thing;
    },
  })
);

export default todoActions;
