
import {computed, observable} from "mobx";
import Todo from "./Todo";
import v4 = require("uuid/v4");
import {sum} from "../../../runtime/expression";

export default class TodoList{
  @observable id: string;
  @observable todos : Todo[];
  @observable children: TodoList[];
  @observable filter: string;
  @observable input: string;

  @computed get allFinished(): boolean{
    return this.todosLeft == 0;
  }

  @computed get todosLeft(): number {
    const children = this.children.map(child => child.todosLeft);
    return this.todos.filter(todo => !todo.finished).length + sum(children);
  }

  @computed get finishedTodos(): Todo[] {
    return this.todos.filter(todo => todo.finished);
  }

  @computed get visibleTodos(): Todo[] {
    switch(this.filter){
      case 'All':
        return this.todos;
      case 'Finished':
        return this.finishedTodos;
      case 'Not Finished':
        return this.todos.filter(x => !x.finished);
      default:
        return this.todos;
    }
  }

  @computed get allTodos(): Todo[] {
    const children = this.children.map(child => child.allTodos);
    return Array.prototype.concat(this.todos, children);
  }

  constructor(){
    this.id = v4();
    this.todos = [];
    this.children = [];
  }
}