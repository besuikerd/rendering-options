import {callDirtySubscriber, DerivedValue, DirtySubscriber, Identity, One, ZeroOrMore} from "../../runtime/runtime";
import {Todo} from "./Todo";
import * as _ from 'lodash';
import v4 = require("uuid/v4");
import * as React from 'react';
import TodoView from "../view/TodoView";
import {ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import {conj} from "../../runtime/expression";

export class TodoList{
  private id: Identity;

  constructor(){
    this.todos = [];
    this.id = v4();
  }

  getIdentity(): Identity{
    return this.id;
  }

  private filter: One<string>;

  setFilter(filter: One<string>){
    const oldValue = this.filter;
    this.filter = filter;
    if(oldValue !== filter){
      this.flagDirtyFilter();
    }
  }

  getFilter(): One<string> {
    return this.filter;
  }

  flagDirtyFilter(){
    this.flagDirtyVisibleTodos();
    this.flagDirtyView();
  }

  private todos: ZeroOrMore<Todo>;

  getTodos(): ZeroOrMore<Todo> {
    if(this.todos == undefined) {

    }
    return this.todos;
  }

  setTodos(todos: ZeroOrMore<Todo>){
    const toAdd = _.difference(todos, this.todos);
    toAdd.forEach(todo => {
      const list = todo.getList();
      if(list !== null){
        list.unidirectionalSetTodos(list.getTodos().filter(x => x !== todo))
      }
      todo.unidirectionalSetList(this);
    });
    const toRemove = _.difference(this.todos, todos);
    toRemove.forEach(todo => todo.unidirectionalSetList( null as any));
    this.unidirectionalSetTodos(todos);
  }

  unidirectionalSetTodos(todos: ZeroOrMore<Todo>){
    this.todos = todos;
    this.flagDirtyTodos();
  }

  flagDirtyTodos(){
    this.flagDirtyFinishedTodos();
    this.flagDirtyVisibleTodos();
    this.flagDirtyAllFinished();
    this.flagDirtyTodosLeft();
  }

  private finishedTodos: DerivedValue<ZeroOrMore<Todo>>;

  getFinishedTodos(): ZeroOrMore<Todo> {
    if(this.finishedTodos == undefined) {
      const _1 = this.getTodos();
      const _2 = [];
      for(let _3 = 0 ; _3 < _1.length ; _3++){
        const _4 = _1[_3];
        const _5 = _4.getFinished();
        if(_5){
          _2.push(_4);
        }
      }
      this.finishedTodos = _2;
    }
    return this.finishedTodos;
  }

  flagDirtyFinishedTodos(){
    this.finishedTodos = undefined;
    this.flagDirtyVisibleTodos();
    this.flagDirtyTodosLeft();
  }

  private visibleTodos: DerivedValue<ZeroOrMore<Todo>>;

  getVisibleTodos(): ZeroOrMore<Todo> {
    if(this.visibleTodos == undefined) {
      const _1 = this.getFilter();
      let _2;
      if(_1 == "All"){
        _2 = this.getTodos();
      } else if(_1 == "Finished"){
        _2 = this.getFinishedTodos();
      } else if(_1 == "Not finished"){
        _2 = this.getTodos().filter(x => !x.getFinished());
      } else {
        _2 = this.getTodos();
      }
      this.visibleTodos = _2;
    }
    return this.visibleTodos;
  }

  flagDirtyVisibleTodos(){
    this.visibleTodos = undefined;
    this.flagDirtyView();
  }

  private input: One<string>;

  setInput(input: One<string>){
    this.input = input;
    this.flagDirtyInput();
  }

  getInput(): One<string> {
    return this.input;
  }

  flagDirtyInput(){
    this.flagDirtyView();
  }

  private allFinished: DerivedValue<boolean>;

  getAllFinished(): boolean {
    if(this.allFinished == undefined) {
      this.allFinished = this.getFinishedTodos().length == this.getTodos().length;
    }
    return this.allFinished;
  }

  flagDirtyAllFinished(){
    this.allFinished = undefined;
    this.flagDirtyView();
  }

  private todosLeft: DerivedValue<number>;

  getTodosLeft(): number {
    if(this.todosLeft == undefined) {
      this.todosLeft = this.getTodos().length - this.getFinishedTodos().length;
    }
    return this.todosLeft;
  }

  flagDirtyTodosLeft(){
    this.todosLeft = undefined;
  }

  view: DerivedValue<One<JSX.Element>>;


  onInput = (e:ChangeEvent<HTMLInputElement>) => {
    this.setInput(e.target.value);
  };

  setFilterAll = () => {
    this.setFilter('All');
  };

  setFilterFinished = () => {
    this.setFilter('Finished');
  };

  setFilterNotFinished = () => {
    this.setFilter('Not finished');
  };

  addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key == 'Enter' && this.getInput() !== ''){
      const todo = new Todo();
      todo.setList(this);
      todo.setTask(this.getInput());
      todo.setFinished(false);
      this.setInput('');
    }
  };

  toggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    const allFinished = this.getFinishedTodos().length == this.getTodos().length;
    this.todos.forEach(todo => todo.setFinished(!allFinished));
  };

  clearFinished = (e: MouseEvent<any>) => {
    this.getFinishedTodos().forEach(todo => todo.setList(null as any));
  };

  getView(): One<JSX.Element> {
    if(this.view === undefined){
      console.log('virtual render list', this.getIdentity());
      const todos = this.getVisibleTodos().map(todo => <TodoView key={todo.getIdentity()} todo={todo}/>);
      const clearTodos = this.getFinishedTodos().length == 0 ? null : <a className="clear-completed" onClick={this.clearFinished}>Clear finished todos</a>;
      const todosLeft = this.getTodosLeft();
      const itemsPlural = todosLeft == 1 ? 'item' : 'items';

      this.view = <section className="todoapp" key={this.getIdentity()}>

        <header className="header">
          <h1>Todos</h1>
          <input id="new-todo" type="text" value={this.getInput()} onChange={this.onInput} onKeyDown={this.addTodo}/>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" checked={this.getAllFinished()} onChange={this.toggleAll}/>
          <ul className="todo-list">
            { todos }
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count">
            {todosLeft} {itemsPlural} left
          </span>

          <ul className="filters">
            <li><a className={this.getFilter() == 'All' ? 'selected' : ''} onClick={this.setFilterAll}>All</a></li>
            <li><a className={this.getFilter() == 'Finished' ? 'selected' : ''} onClick={this.setFilterFinished}>Finished</a></li>
            <li><a className={this.getFilter() == 'Not Finished' ? 'selected' : ''} onClick={this.setFilterNotFinished}>Not Finished</a></li>
          </ul>

          {clearTodos}
        </footer>

      </section>;
    }
    return this.view;
  }

  flagDirtyView(){
    this.view = undefined;
    const viewDirtySubscribers = this.viewDirtySubscribers;
    if(viewDirtySubscribers !== undefined){
      viewDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  private viewDirtySubscribers: Set<DirtySubscriber> | undefined;

  subscribeDirtyView(subscriber: DirtySubscriber){
    console.log('list view added', this.getIdentity())
    if(this.viewDirtySubscribers === undefined){
      this.viewDirtySubscribers = new Set();
    }
    this.viewDirtySubscribers.add(subscriber);
  }

  unsubscribeDirtyView(subscriber: DirtySubscriber){
    console.log('list view removed', this.getIdentity())
    const viewDirtySubscribers = this.viewDirtySubscribers;
    if(viewDirtySubscribers !== undefined){
      viewDirtySubscribers.delete(subscriber);
    }
  }
}