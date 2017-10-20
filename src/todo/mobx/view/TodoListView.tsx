import * as React from 'react';
import {observer} from 'mobx-react';
import TodoList from "../model/TodoList";
import {ChangeEvent, MouseEvent, KeyboardEvent} from 'react';
import TodoView from "./TodoView";
import Todo from "../model/Todo";

interface TodoListHeaderProps{
  list: TodoList
}

@observer
class TodoListHeader extends React.Component<TodoListHeaderProps>{
  onInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.list.input = e.target.value;
  };

  addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    const {list} = this.props;
    if(e.key == 'Enter' && list.input !== ''){
      const todo = new Todo();
      todo.task = list.input;
      todo.finished = false;
      list.todos.push(todo);
      list.input = '';
    }
  };

  toggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    const {list} = this.props;
    const allFinished = list.allFinished;
    list.allTodos.forEach(todo => {
      todo.finished = !allFinished;
    });
  };

  render(): JSX.Element{
    const { list } = this.props;
    console.log('render header', list.id);
    return <header className="header">
      <h1>Todos</h1>
      <input className="toggle-all" type="checkbox" checked={list.allFinished} onChange={this.toggleAll}/>
      <input id="new-todo" type="text" value={list.input} onChange={this.onInput} onKeyDown={this.addTodo}/>
    </header>
  }
}

interface TodoListFooterProps{
  list: TodoList
}

@observer
class TodoFooterView extends React.Component<TodoListFooterProps>{
  setFilterAll = (e: MouseEvent<HTMLElement>) => {
    this.props.list.filter = 'All';
  };

  setFilterFinished = (e: MouseEvent<HTMLElement>) => {
    this.props.list.filter = 'Finished';
  };

  setFilterNotFinished = (e: MouseEvent<HTMLElement>) => {
    this.props.list.filter = 'Not Finished';
  };

  clearFinished = (e: MouseEvent<HTMLElement>) => {
    const {list} = this.props;
    list.todos = list.todos.filter(todo => !todo.finished);
  };
  
  render(): JSX.Element{
    const { list } = this.props;
    console.log('render footer', list.id);
    const itemsPlural = list.todosLeft == 1 ? 'item' : 'items';
    const clearTodos = list.finishedTodos.length == 0 ? null : <a className="clear-completed" onClick={this.clearFinished}>Clear finished todos</a>;
    return <footer className="footer">
          <span className="todo-count">
            {list.todosLeft} {itemsPlural} left
          </span>
      <ul className="filters">
        <li><a className={list.filter == 'All' ? 'selected' : ''} onClick={this.setFilterAll}>All</a></li>
        <li><a className={list.filter == 'Finished' ? 'selected' : ''} onClick={this.setFilterFinished}>Finished</a></li>
        <li><a className={list.filter == 'Not Finished' ? 'selected' : ''} onClick={this.setFilterNotFinished}>Not Finished</a></li>
      </ul>
      {clearTodos}
    </footer>;
  }
}

interface TodoListViewProps{
  list: TodoList
}

@observer
export default class TodoListView extends React.Component<TodoListViewProps>{


  addChild = (e: MouseEvent<HTMLElement>) => {
    const {list} = this.props;
    const child = new TodoList();
    child.input = '';
    child.filter = 'All';
    list.children.push(child);
  };


  removeTodo = (todo: Todo): () => void => {
    const {list} = this.props;
    return () => {
      list.todos.splice(list.todos.indexOf(todo), 1);
    }
  };

  render(): JSX.Element | any {
    console.log('render list', this.props.list.id);
    const {list} = this.props;

    const children = list.children.map(child => <TodoListView key={child.id} list={child}/>);
    const todos = list.visibleTodos.map(todo => <TodoView key={todo.id} todo={todo} removeTodo={this.removeTodo(todo)}/>);

    return <section className="todoapp" key={list.id}>
      <TodoListHeader list={list}/>
      <section className="main">
        <ul className="todo-list">
          { todos }
        </ul>
      </section>

      <div style={{margin: '0px'}}>
        { children }
      </div>

      <TodoFooterView list={list}/>
    </section>;
  }
}