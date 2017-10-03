import {TodoList} from "./model/TodoList";
import {Todo} from "./model/Todo";
import React from 'react';
import { render } from 'react-dom';
import TodoListView from "./view/TodoListView";

import './stylesheets/todo.scss';

const rootList = new TodoList();
rootList.setFilter('All');
rootList.setInput('');

let parent = rootList;
for(let i = 0 ; i < 100 ; i++){
  const child = new TodoList();
  child.setFilter('All');
  child.setInput('');
  child.setParent(parent);
  // parent = child;
}

import { Observable } from 'rxjs';
import {AnimationFrameScheduler, TimedScheduler} from "../runtime/Scheduler";
import SchedulerProdiver from "../runtime/SchedulerProdiver";

const scheduler = new AnimationFrameScheduler();
// const scheduler = new TimedScheduler(1000);
const root =
  React.createElement(SchedulerProdiver,
    {scheduler},
    React.createElement(TodoListView,
      {list: rootList}
    )
  );

window.list = root;
window.Todo = Todo;
window.TodoList = TodoList;

module.exports = function renderTodo(container){
  render(root, container);
};
