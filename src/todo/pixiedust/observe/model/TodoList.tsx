import {
  callDirtySubscriber, DerivedValue, DirtySubscriber, Identity, One, ZeroOrMore,
  ZeroOrOne
} from "../../../../runtime/runtime";
import Todo from "./Todo";
import * as _ from 'lodash';
import v4 = require("uuid/v4");
import * as React from 'react';
import TodoView from "../view/TodoView";
import TodoListView from "../view/TodoListView";
import {TodoListHeader, TodoListFooter} from "../view/TodoListView";
import {ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import {sum} from "../../../../runtime/expression";

export default class TodoList{
  private id: Identity;

  constructor(){
    this.todos = [];
    this.children = [];
    this.parent = null;
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

  private filterDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyFilter(){
    if(this.filterDirtySubscribers !== undefined){
      this.filterDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyVisibleTodos();

    this.flagDirtyFooter();
  }

  subscribeDirtyFilter(dirtySubscriber: DirtySubscriber){
    if(this.filterDirtySubscribers === undefined){
      this.filterDirtySubscribers = new Set();
    }
    this.filterDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyFilter(dirtySubscriber: DirtySubscriber){
    if(this.filterDirtySubscribers !== undefined){
      this.filterDirtySubscribers.delete(dirtySubscriber);
    }
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

  private todosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyTodos(){
    if(this.todosDirtySubscribers !== undefined){
      this.todosDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyVisibleTodos();
    this.flagDirtyFinishedTodos();
    this.flagDirtyTodosLeft();
    this.flagDirtyAllTodos();
  }

  subscribeDirtyTodos(dirtySubscriber: DirtySubscriber){
    if(this.todosDirtySubscribers === undefined){
      this.todosDirtySubscribers = new Set();
    }
    this.todosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyTodos(dirtySubscriber: DirtySubscriber){
    if(this.todosDirtySubscribers !== undefined){
      this.todosDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private parent: ZeroOrOne<TodoList>;

  getParent(): ZeroOrOne<TodoList> {
    if(this.parent == undefined) {

    }
    return this.parent;
  }

  setParent(parent: ZeroOrOne<TodoList>){
    if(this.parent !== null){
      this.parent.unidirectionalSetChildren(this.parent.getChildren().filter(x => x !== this));
    }
    if(parent !== null){
      parent.unidirectionalSetChildren([...parent.getChildren(), this]);
    }
    this.unidirectionalSetParent(parent);
  }

  unidirectionalSetParent(parent: ZeroOrOne<TodoList>){
    this.parent = parent;
    this.flagDirtyParent();
  }

  private parentDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyParent(){
    if(this.parentDirtySubscribers !== undefined){
      this.parentDirtySubscribers.forEach(callDirtySubscriber);
    }
  }

  subscribeDirtyParent(dirtySubscriber: DirtySubscriber){
    if(this.parentDirtySubscribers === undefined){
      this.parentDirtySubscribers = new Set();
    }
    this.parentDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyParent(dirtySubscriber: DirtySubscriber){
    if(this.parentDirtySubscribers !== undefined){
      this.parentDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private children: ZeroOrMore<TodoList>;

  getChildren(): ZeroOrMore<TodoList> {
    if(this.children == undefined) {

    }
    return this.children;
  }

  setChildren(children: ZeroOrMore<TodoList>){
    const toAdd = _.difference(children, this.getChildren());
    toAdd.forEach(child => {
      const parent = child.getParent();
      if(parent !== null){
        parent.unidirectionalSetChildren(parent.getChildren().filter(x => x !== child))
      }
      child.unidirectionalSetParent(this);
    });
    const toRemove = _.difference(this.getChildren(), children);
    toRemove.forEach(child => child.unidirectionalSetParent( null as any));
    this.unidirectionalSetChildren(children);
  }

  unidirectionalSetChildren(children: ZeroOrMore<TodoList>){
    this.children = children;
    this.flagDirtyChildren();
  }

  private childrenDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyChildren(){
    if(this.childrenDirtySubscribers !== undefined){
      this.childrenDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyView();
    this.flagDirtyTodosLeft();
    this.flagDirtyAllTodos();
  }

  subscribeDirtyChildren(dirtySubscriber: DirtySubscriber){
    if(this.childrenDirtySubscribers === undefined){
      this.childrenDirtySubscribers = new Set();
    }
    this.childrenDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyChildren(dirtySubscriber: DirtySubscriber){
    if(this.childrenDirtySubscribers !== undefined){
      this.childrenDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private allTodos: DerivedValue<ZeroOrMore<Todo>>;
  
  getAllTodos(): ZeroOrMore<Todo> {
    let result: ZeroOrMore<Todo>;
    if(this.allTodos === undefined) {
      const children = this.getChildren().map(child => child.getAllTodos());
      result = Array.prototype.concat.apply(this.getTodos(), children);
      this.allTodos = result;
    } else {
      result = this.allTodos
    }
    return result;
  }

  private allTodosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyAllTodos(){
    this.allTodos = undefined;
    if(this.allTodosDirtySubscribers !== undefined){
      this.allTodosDirtySubscribers.forEach(callDirtySubscriber);
    }
    const parent = this.getParent();
    if(parent !== null){
      parent.flagDirtyAllTodos();
    }
  }

  subscribeDirtyAllTodos(dirtySubscriber: DirtySubscriber){
    if(this.allTodosDirtySubscribers === undefined){
      this.allTodosDirtySubscribers = new Set();
    }
    this.allTodosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyAllTodos(dirtySubscriber: DirtySubscriber){
    if(this.allTodosDirtySubscribers !== undefined){
      this.allTodosDirtySubscribers.delete(dirtySubscriber);
    }
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

  private finishedTodosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyFinishedTodos(){
    this.finishedTodos = undefined;
    if(this.finishedTodosDirtySubscribers !== undefined){
      this.finishedTodosDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyVisibleTodos();
    this.flagDirtyTodosLeft();
  }

  subscribeDirtyFinishedTodos(dirtySubscriber: DirtySubscriber){
    if(this.finishedTodosDirtySubscribers === undefined){
      this.finishedTodosDirtySubscribers = new Set();
    }
    this.finishedTodosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyFinishedTodos(dirtySubscriber: DirtySubscriber){
    if(this.finishedTodosDirtySubscribers !== undefined){
      this.finishedTodosDirtySubscribers.delete(dirtySubscriber);
    }
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

  private visibleTodosDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyVisibleTodos(){
    this.visibleTodos = undefined;
    if(this.visibleTodosDirtySubscribers !== undefined){
      this.visibleTodosDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyView();
  }

  subscribeDirtyVisibleTodos(dirtySubscriber: DirtySubscriber){
    if(this.visibleTodosDirtySubscribers === undefined){
      this.visibleTodosDirtySubscribers = new Set();
    }
    this.visibleTodosDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyVisibleTodos(dirtySubscriber: DirtySubscriber){
    if(this.visibleTodosDirtySubscribers !== undefined){
      this.visibleTodosDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private input: One<string>;

  setInput(input: One<string>){
    this.input = input;
    this.flagDirtyInput();
  }

  getInput(): One<string> {
    return this.input;
  }

  private inputDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyInput(){
    if(this.inputDirtySubscribers !== undefined){
      this.inputDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyHeader();
  }

  subscribeDirtyInput(dirtySubscriber: DirtySubscriber){
    if(this.inputDirtySubscribers === undefined){
      this.inputDirtySubscribers = new Set();
    }
    this.inputDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyInput(dirtySubscriber: DirtySubscriber){
    if(this.inputDirtySubscribers !== undefined){
      this.inputDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private todosLeft: DerivedValue<number>;

  getTodosLeft(): One<number> {
    if(this.todosLeft == undefined) {
      const children = this.getChildren().map(child => child.getTodosLeft());
      this.todosLeft = this.getTodos().length - this.getFinishedTodos().length + sum(children);
    }
    return this.todosLeft;
  }

  private todosLeftDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyTodosLeft(){
    this.todosLeft = undefined;
    if(this.todosLeftDirtySubscribers !== undefined){
      this.todosLeftDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyFooter();
    this.flagDirtyAllFinished();
    const parent = this.getParent();
    if(parent !== null){
      parent.flagDirtyTodosLeft();
    }
  }

  subscribeDirtyTodosLeft(dirtySubscriber: DirtySubscriber){
    if(this.todosLeftDirtySubscribers === undefined){
      this.todosLeftDirtySubscribers = new Set();
    }
    this.todosLeftDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyTodosLeft(dirtySubscriber: DirtySubscriber){
    if(this.todosLeftDirtySubscribers !== undefined){
      this.todosLeftDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private allFinished: DerivedValue<boolean>;

  getAllFinished(): boolean {
    if(this.allFinished == undefined) {
      this.allFinished = this.getTodosLeft() == 0;
    }
    return this.allFinished;
  }

  private allFinishedDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyAllFinished(){
    this.allFinished = undefined;
    if(this.allFinishedDirtySubscribers !== undefined){
      this.allFinishedDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyHeader();
  }

  subscribeDirtyAllFinished(dirtySubscriber: DirtySubscriber){
    if(this.allFinishedDirtySubscribers === undefined){
      this.allFinishedDirtySubscribers = new Set();
    }
    this.allFinishedDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyAllFinished(dirtySubscriber: DirtySubscriber){
    if(this.allFinishedDirtySubscribers !== undefined){
      this.allFinishedDirtySubscribers.delete(dirtySubscriber);
    }
  }

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
    this.setFilter('Not Finished');
  };

  addChild = () => {
    const child = new TodoList();
    child.setFilter('All');
    child.setInput('');
    child.setParent(this);
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

  toggleAll = (e: ChangeEvent<HTMLElement>) => {
    const allFinished = this.getAllFinished();
    this.getAllTodos().forEach(todo => todo.setFinished(!allFinished));
  };

  clearFinished = (e: MouseEvent<HTMLElement>) => {
    this.getFinishedTodos().forEach(todo => todo.setList(null as any));
  };

  view: DerivedValue<One<JSX.Element>>;

  getView(): One<JSX.Element> {
    if(this.view === undefined){
      // console.log('virtual render list', this.getIdentity());
      const todos = this.getVisibleTodos().map(todo => <TodoView key={todo.getIdentity()} todo={todo}/>);
      const children = this.getChildren().map(child => <li key={child.getIdentity()}><TodoListView list={child}/></li>);

      this.view = <section className="todoapp" key={this.getIdentity()}>
        <TodoListHeader list={this}/>
        <section className="main">
          <ul className="todo-list">
            { todos }
          </ul>
          <ul className="todo-children">
            { children }
          </ul>
        </section>
        <TodoListFooter list={this}/>
      </section>;
    }
    return this.view;
  }

  private viewDirtySubscribers: Set<DirtySubscriber>;

  flagDirtyView(){
    this.view = undefined;
    if(this.viewDirtySubscribers !== undefined){
      this.viewDirtySubscribers.forEach(callDirtySubscriber);
    }
    const parent = this.getParent();
    if(parent !== null){
      parent.flagDirtyView();
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

  private header: DerivedValue<One<JSX.Element>>;

  getHeader(): One<JSX.Element>{
    if(this.header === undefined){
      this.header = <header className="header">
        <button className="add-child" onClick={this.addChild}>Add child</button>
        <h1>Todos</h1>
        <input className="toggle-all" type="checkbox" checked={this.getAllFinished()} onChange={this.toggleAll}/>
        <input id="new-todo" type="text" value={this.getInput()} onChange={this.onInput} onKeyDown={this.addTodo}/>
      </header>
    }
    return this.header;
  }

  flagDirtyHeader(){
    this.header = undefined;
    if(this.headerDirtySubscribers !== undefined){
      this.headerDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyView();
  }

  private headerDirtySubscribers: Set<DirtySubscriber>;

  subscribeDirtyHeader(dirtySubscriber: DirtySubscriber){
    if(this.headerDirtySubscribers === undefined){
      this.headerDirtySubscribers = new Set();
    }
    this.headerDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyHeader(dirtySubscriber: DirtySubscriber){
    if(this.headerDirtySubscribers !== undefined){
      this.headerDirtySubscribers.delete(dirtySubscriber);
    }
  }

  private footer: DerivedValue<One<JSX.Element>>;

  getFooter(): One<JSX.Element>{
    if(this.footer === undefined){
      const clearTodos = this.getFinishedTodos().length == 0 ? null : <a className="clear-completed" onClick={this.clearFinished}>Clear finished todos</a>;
      const todosLeft = this.getTodosLeft();
      const itemsPlural = todosLeft == 1 ? 'item' : 'items';

      this.footer =
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
    }
    return this.footer;
  }

  flagDirtyFooter(){
    this.footer = undefined;
    if(this.footerDirtySubscribers !== undefined){
      this.footerDirtySubscribers.forEach(callDirtySubscriber);
    }
    this.flagDirtyView();
  }

  private footerDirtySubscribers: Set<DirtySubscriber>;

  subscribeDirtyFooter(dirtySubscriber: DirtySubscriber){
    if(this.footerDirtySubscribers === undefined){
      this.footerDirtySubscribers = new Set();
    }
    this.footerDirtySubscribers.add(dirtySubscriber);
  }

  unsubscribeDirtyFooter(dirtySubscriber: DirtySubscriber){
    if(this.footerDirtySubscribers !== undefined){
      this.footerDirtySubscribers.delete(dirtySubscriber);
    }
  }
}