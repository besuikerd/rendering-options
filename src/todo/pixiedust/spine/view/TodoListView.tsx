import * as React from 'react';
import TodoList from "../model/TodoList";
import PixieDustComponent from "../../../../runtime/component/PixieDustComponent";

interface TodoListViewProps{
  list: TodoList
}

export default class TodoListView extends PixieDustComponent<TodoListViewProps>{


  constructor(props: TodoListViewProps, context: any) {
    super(props, context);
    props.list.subscribeDirtyView(this.scheduleRender);
  }

  componentWillReceiveProps(nextProps: Readonly<TodoListViewProps>, nextContext: any): void {
    if(this.props.list !== nextProps.list){
      this.props.list.unsubscribeDirtyView(this.scheduleRender);
      nextProps.list.subscribeDirtyView(this.scheduleRender);
    }
  }

  componentWillUnmount(): void {
    this.props.list.unsubscribeDirtyView(this.scheduleRender);
  }

  shouldComponentUpdate(nextProps: Readonly<TodoListViewProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.list !== nextProps.list;
  }

  render(){
    console.log('render list', this.props.list.getIdentity());
    return this.props.list.getView();
  }
}