import * as React from 'react';
import {Todo} from "../model/Todo";
import PixieDustComponent from "../../runtime/component/PixieDustComponent";


interface TodoProps{
  todo: Todo
}

export default class TodoView extends PixieDustComponent<TodoProps>{


  constructor(props: TodoProps, context: any) {
    super(props, context);
    props.todo.subscribeDirtyView(this.scheduleRender);
  }


  componentWillReceiveProps(nextProps: Readonly<TodoProps>, nextContext: any): void {
    if(this.props.todo !== nextProps.todo){
      this.props.todo.unsubscribeDirtyView(this.scheduleRender);
      nextProps.todo.subscribeDirtyView(this.scheduleRender)
    }
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.props.todo.unsubscribeDirtyView(this.scheduleRender);
  }

  shouldComponentUpdate(nextProps: Readonly<TodoProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return nextProps.todo !== this.props.todo;
  }

  render(): JSX.Element | any {
    console.log('render todo', this.props.todo.getTask());
    return this.props.todo.getView();
  }
}