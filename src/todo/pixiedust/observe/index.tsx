import * as React from 'react';
import SchedulerProdiver from "../../../runtime/SchedulerProdiver";
import TodoList from "./model/TodoList";
import TodoListView from "./view/TodoListView";
import {TodoOptions} from "../../TodoOptions";

export function createTodoApplication(options: TodoOptions): JSX.Element {
  const rootList = new TodoList();
  rootList.setFilter('All');
  rootList.setInput('');
  let parent = rootList;
  for(let i = 0 ; i < options.childCount ; i++){
    const child = new TodoList();
    child.setFilter('All');
    child.setInput('');
    child.setParent(parent);
    if(options.nested){
      parent = child;
    }
  }

  return <SchedulerProdiver scheduler={options.scheduler}>
    <TodoListView list={rootList}/>
  </SchedulerProdiver>;
}