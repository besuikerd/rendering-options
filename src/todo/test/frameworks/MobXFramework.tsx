import * as React from 'react';

import Framework from "./Framework";
import RenderTracker from "../RenderTracker";

import TodoList from '../../mobx/model/TodoList';
import TodoListView from '../../mobx/view/TodoListView';
import {TodoListHeader, TodoListFooter} from '../../mobx/view/TodoListView';
import TodoView from '../../mobx/view/TodoView';

export class MobxXFramework implements Framework{
  name = "MobX";

  registerComponents(renderTracker: RenderTracker): void {
    renderTracker.trackComponent(`${this.name}.TodoListHeader`, TodoListHeader);
    renderTracker.trackComponent(`${this.name}.TodoListFooter`, TodoListFooter);
    renderTracker.trackComponent(`${this.name}.TodoListView`, TodoListView);
    renderTracker.trackComponent(`${this.name}.TodoView`, TodoView);
  }

  initApplication(): JSX.Element {
    const list = new TodoList();
    list.input = "";
    list.filter = "All";
    return <TodoListView list={list}/>;
  }
}

export default new MobxXFramework();