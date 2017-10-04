import * as React from 'react';
// import SchedulerProdiver from "../../../runtime/SchedulerProdiver";
import TodoList from "./model/TodoList";
import TodoListView from "./view/TodoListView";
import {TodoOptions} from "../TodoOptions";

export function createTodoApplication(options: TodoOptions): JSX.Element{
  const rootList = new TodoList();
  rootList.filter = 'All';
  rootList.input = '';
  let parent = rootList;
  for(let i = 0 ; i < options.childCount ; i++){
    const child = new TodoList();
    child.filter = 'All';
    child.input = '';

    parent.children.push(child);

    if(options.nested){
      parent = child;
    }
  }

  return <TodoListView list={rootList}/>
}