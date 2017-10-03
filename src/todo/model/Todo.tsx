///<reference path="TodoList.tsx"/>
import {callDirtySubscriber, DerivedValue, DirtySubscriber, Identity, One, ZeroOrOne} from "../../runtime/runtime";
import {TodoList} from "./TodoList";
import {v4} from 'uuid';
import * as React from 'react';
import {ChangeEvent, MouseEvent} from "react";

export class Todo {

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

  flagDirtyTask(){
    this.flagDirtyView();
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

  flagDirtyFinished(){
    if(this.getList() !== undefined){
      this.getList().flagDirtyFinishedTodos();
      this.getList().flagDirtyAllFinished();
    }
    this.flagDirtyView();
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

  flagDirtyList(){
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

  flagDirtyInverseFinishedTodos(){
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

  flagDirtyInverseVisibleTodos(){
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

  flagDirtyView(){
    this.view = undefined;
    const inverseVisibleTodos = this.getInverseVisibleTodos();
    if(inverseVisibleTodos !== null){
      inverseVisibleTodos.flagDirtyView();
    }
    const viewDirtySubscribers = this.viewDirtySubscribers;
    if(viewDirtySubscribers !== undefined){
      viewDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  private viewDirtySubscribers: Set<DirtySubscriber> | undefined;

  subscribeDirtyView(subscriber: DirtySubscriber){
    // console.log('todo view added', this.getTask());
    if(this.viewDirtySubscribers === undefined){
      this.viewDirtySubscribers = new Set();
    }
    this.viewDirtySubscribers.add(subscriber);
  }

  unsubscribeDirtyView(subscriber: DirtySubscriber){
    // console.log('todo view removed', this.getTask());
    const viewDirtySubscribers = this.viewDirtySubscribers;
    if(viewDirtySubscribers !== undefined){
      viewDirtySubscribers.delete(subscriber);
    }
  }
}