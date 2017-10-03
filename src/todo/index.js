import {TodoList} from "./model/TodoList";
import {Todo} from "./model/Todo";
import React from 'react';
import { render } from 'react-dom';
import TodoListView from "./view/TodoListView";

import './stylesheets/todo.scss';

const list = new TodoList();
list.setFilter('All');
list.setInput('');

import { Observable } from 'rxjs';
import {AnimationFrameScheduler, TimedScheduler} from "../runtime/Scheduler";
import SchedulerProdiver from "../runtime/SchedulerProdiver";

const scheduler = new AnimationFrameScheduler(100);
const root =
  React.createElement(SchedulerProdiver,
    {scheduler},
    React.createElement(TodoListView,
      {list}
    )
  );

window.list = list;
window.Todo = Todo;
window.TodoList = TodoList;

module.exports = function renderTodo(container){
  render(root, container);
};
