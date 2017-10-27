import * as React from 'react';

import Framework from "./Framework";
import RenderTracker from "../RenderTracker";

import TodoList from '../../pixiedust/observe/model/TodoList';
import TodoListView from '../../pixiedust/observe/view/TodoListView';
import {TodoListHeader, TodoListFooter} from '../../pixiedust/observe/view/TodoListView';
import TodoView from '../../pixiedust/observe/view/TodoView';
import {AnimationFrameScheduler} from "../../../runtime/Scheduler";
import SchedulerProdiver from "../../../runtime/SchedulerProdiver";

export class PixieDustFramework implements Framework{
  name = "PixieDust";

  registerComponents(renderTracker: RenderTracker): void {
    renderTracker.trackComponent(`${this.name}.TodoListHeader`, TodoListHeader);
    renderTracker.trackComponent(`${this.name}.TodoListFooter`, TodoListFooter);
    renderTracker.trackComponent(`${this.name}.TodoListView`, TodoListView);
    renderTracker.trackComponent(`${this.name}.TodoView`, TodoView);
  }

  initApplication(): JSX.Element {
    const list = new TodoList();
    list.setInput("");
    list.setFilter("All");
    const scheduler = new AnimationFrameScheduler();
    return <SchedulerProdiver scheduler={scheduler}>
      <TodoListView list={list}/>
    </SchedulerProdiver>;
  }
}

export default new PixieDustFramework();