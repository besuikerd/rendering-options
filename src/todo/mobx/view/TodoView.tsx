import * as React from 'react';
import {observer} from "mobx-react";
import Todo from "../model/Todo";
import {ChangeEvent, MouseEvent} from "react";

interface TodoViewProps{
  todo: Todo
  removeTodo: () => void
}

@observer
export default class TodoView extends React.Component<TodoViewProps>{
  onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const {todo} = this.props;
    todo.finished = !todo.finished;
  };

  render(): JSX.Element | any {
    console.log('render todo', this.props.todo.task);

    const {todo, removeTodo} = this.props;

    return <li className={todo.finished ? 'completed' : ''} key={todo.id}>
      <div className="view">
        <input type="checkbox" className="toggle" checked={todo.finished} onChange={this.onToggle}/>
        <label> { todo.task } </label>
        <button className="destroy" onClick={removeTodo}/>
      </div>
    </li>;
  }
}