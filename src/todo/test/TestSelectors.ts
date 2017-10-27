export default interface TestSelectors{
  list: string
  addChild: string
  input: string
  toggle: string
  toggleAll: string
  taskContainer: string
  deleteButton: string
  footer: string
  filters: string
  clearCompleted: string
}

export const testSelectors = {
  list: '.todoapp',
  addChild: '.add-child',
  input: '#new-todo',
  toggle: '.toggle',
  toggleAll: '.toggle-all',
  taskContainer: '.todo-list',
  deleteButton: '.destroy',
  footer: ':scope > .footer',
  filters: '.filters li a',
  clearCompleted: '.clear-completed'
};