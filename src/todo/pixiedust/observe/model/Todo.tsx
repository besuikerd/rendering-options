///<reference path="TodoList.tsx"/>
import {callDirtySubscriber, DerivedValue, DirtySubscriber, Identity, One, ZeroOrOne} from "../../../../runtime/runtime";
import TodoList from "./TodoList";
import {v4} from 'uuid';
import * as React from 'react';
import {ChangeEvent, MouseEvent} from "react";

export default class Todo {

  private id: Identity;

  private task: One<string>;

  constructor(){
    this.list = null as any;
  }

  setTask(task: One<string>){
    this.task = task;
    this.id = v4();
    this.flagDirtyTask();
  }

  getIdentity(): Identity {
    return this.id;
  }

  getTask(): One<string> {
    return this.task;
  }

  private taskDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyTask(){
    if(this.taskDirtySubscribers !== undefined){
      this.taskDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyView();
  }

  subscribeDirtyTask(dirtySubscriber: DirtySubscriber){
    if(this.taskDirtySubscribers === undefined){
      this.taskDirtySubscribers = new Set();
    }
    this.taskDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyTask(dirtySubscriber: DirtySubscriber){
    if(this.taskDirtySubscribers !== undefined){
      this.taskDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private finished: One<boolean>;

  setFinished(finished: One<boolean>){
    const oldValue = this.finished;
    this.finished = finished;

    if(oldValue !== finished){
      this.flagDirtyFinished();
    }
  }

  getFinished(): One<boolean> {
    return this.finished;
  }

  private finishedDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyFinished(){
    if(this.finishedDirtySubscribers !== undefined){
      this.finishedDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.getList().flagDirtyFinishedTodos();
    this.flagDirtyView();
  }

  subscribeDirtyFinished(dirtySubscriber: DirtySubscriber){
    if(this.finishedDirtySubscribers === undefined){
      this.finishedDirtySubscribers = new Set();
    }
    this.finishedDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyFinished(dirtySubscriber: DirtySubscriber){
    if(this.finishedDirtySubscribers !== undefined){
      this.finishedDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private list: One<TodoList>;

  getList(): One<TodoList> {
    if(this.list == undefined) {

    }
    return this.list;
  }

  setList(list: One<TodoList>){
    const previous = this.getList();
    if(previous !== null){
      previous.unidirectionalSetTodos(previous.getTodos().filter(x => x != this))
    }
    this.unidirectionalSetList(list);
    if(list !== null){
      list.unidirectionalSetTodos([...list.getTodos(), this]);
    }
  }

  unidirectionalSetList(list: One<TodoList>){
    this.list = list;
    this.flagDirtyList();
  }

  private listDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyList(){
    if(this.listDirtySubscribers !== undefined){
      this.listDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  subscribeDirtyList(dirtySubscriber: DirtySubscriber){
    if(this.listDirtySubscribers === undefined){
      this.listDirtySubscribers = new Set();
    }
    this.listDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyList(dirtySubscriber: DirtySubscriber){
    if(this.listDirtySubscribers !== undefined){
      this.listDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private inverseFinishedTodos: ZeroOrOne<TodoList>;

  getInverseFinishedTodos(): ZeroOrOne<TodoList> {
    if(this.inverseFinishedTodos == undefined) {

    }
    return this.inverseFinishedTodos;
  }

  unidirectionalSetInverseFinishedTodos(inverseFinishedTodos: ZeroOrOne<TodoList>){
    this.inverseFinishedTodos = inverseFinishedTodos;
    this.flagDirtyInverseFinishedTodos();
  }

  private inverseFinishedTodosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyInverseFinishedTodos(){
    if(this.inverseFinishedTodosDirtySubscribers !== undefined){
      this.inverseFinishedTodosDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  subscribeDirtyInverseFinishedTodos(dirtySubscriber: DirtySubscriber){
    if(this.inverseFinishedTodosDirtySubscribers === undefined){
      this.inverseFinishedTodosDirtySubscribers = new Set();
    }
    this.inverseFinishedTodosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyInverseFinishedTodos(dirtySubscriber: DirtySubscriber){
    if(this.inverseFinishedTodosDirtySubscribers !== undefined){
      this.inverseFinishedTodosDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private inverseVisibleTodos: DerivedValue<ZeroOrOne<TodoList>>;

  getInverseVisibleTodos(): ZeroOrOne<TodoList> {
    if(this.inverseVisibleTodos == undefined) {
      this.inverseVisibleTodos = null;
    }
    return this.inverseVisibleTodos;
  }

  unidirectionalSetInverseVisibleTodos(inverseVisibleTodos: ZeroOrOne<TodoList>){
    this.inverseVisibleTodos = inverseVisibleTodos;
    this.flagDirtyInverseVisibleTodos();
  }

  private inverseVisibleTodosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyInverseVisibleTodos(){
    this.inverseVisibleTodos = undefined;
    if(this.inverseVisibleTodosDirtySubscribers !== undefined){
      this.inverseVisibleTodosDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  subscribeDirtyInverseVisibleTodos(dirtySubscriber: DirtySubscriber){
    if(this.inverseVisibleTodosDirtySubscribers === undefined){
      this.inverseVisibleTodosDirtySubscribers = new Set();
    }
    this.inverseVisibleTodosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyInverseVisibleTodos(dirtySubscriber: DirtySubscriber){
    if(this.inverseVisibleTodosDirtySubscribers !== undefined){
      this.inverseVisibleTodosDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private view: DerivedValue<One<JSX.Element>>;


  onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setFinished(!this.getFinished());
  };

  removeTodo = (e: MouseEvent<HTMLElement>) => {
    this.setList(null as any);
  };

  getView(): One<JSX.Element> {
    if(this.view === undefined){
      // console.log('virtual render todo', this.getTask());
      this.view = <li className={this.getFinished() ? 'completed' : ''} key={this.getIdentity()}>
        <div className="view">
          <input type="checkbox" className="toggle" checked={this.getFinished()} onChange={this.onToggle}/>
          <label> { this.getTask() } </label>
          <button className="destroy" onClick={this.removeTodo}/>
        </div>

      </li>;
    }
    return this.view;
  }

  private viewDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyView(){
    this.view = undefined;
    if(this.viewDirtySubscribers !== undefined){
      this.viewDirtySubscribers.forEach(callDirtySubscriber);
    }
    const inverseVisibleTodos = this.getInverseVisibleTodos();
    if(inverseVisibleTodos !== null){
      inverseVisibleTodos.flagDirtyView()
    }
  }

  subscribeDirtyView(dirtySubscriber: DirtySubscriber){
    if(this.viewDirtySubscribers === undefined){
      this.viewDirtySubscribers = new Set();
    }
    this.viewDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyView(dirtySubscriber: DirtySubscriber){
    if(this.viewDirtySubscribers !== undefined){
      this.viewDirtySubscribers.delete(dirtySubscriber);
    }
  }
}