import * as React from 'react';
import TodoList from "../model/TodoList";
import PixieDustComponent from "../../../../runtime/component/PixieDustComponent";

interface TodoListViewProps{
  list: TodoList
}

export default class TodoListView extends PixieDustComponent<TodoListViewProps>{


  constructor(props: TodoListViewProps, context: any) {
    super(props, context);
    // props.list.subscribeDirtyView(this.scheduleRender);

    props.list.subscribeDirtyAllFinished(this.scheduleRender);
    props.list.subscribeDirtyVisibleTodos(this.scheduleRender);
    props.list.subscribeDirtyInput(this.scheduleRender);
    props.list.subscribeDirtyTodosLeft(this.scheduleRender);
    props.list.subscribeDirtyChildren(this.scheduleRender);
  }

  componentWillReceiveProps(nextProps: Readonly<TodoListViewProps>, nextContext: any): void {
    if(this.props.list !== nextProps.list){
      this.props.list.unsubscribeDirtyAllFinished(this.scheduleRender);
      this.props.list.unsubscribeDirtyVisibleTodos(this.scheduleRender);
      this.props.list.unsubscribeDirtyInput(this.scheduleRender);
      this.props.list.unsubscribeDirtyTodosLeft(this.scheduleRender);
      this.props.list.unsubscribeDirtyChildren(this.scheduleRender);

      nextProps.list.subscribeDirtyAllFinished(this.scheduleRender);
      nextProps.list.subscribeDirtyVisibleTodos(this.scheduleRender);
      nextProps.list.subscribeDirtyInput(this.scheduleRender);
      nextProps.list.subscribeDirtyTodosLeft(this.scheduleRender);
      nextProps.list.subscribeDirtyChildren(this.scheduleRender);
    }
  }

  componentWillUnmount(): void {
    this.props.list.unsubscribeDirtyAllFinished(this.scheduleRender);
    this.props.list.unsubscribeDirtyVisibleTodos(this.scheduleRender);
    this.props.list.unsubscribeDirtyInput(this.scheduleRender);
    this.props.list.unsubscribeDirtyTodosLeft(this.scheduleRender);
    this.props.list.unsubscribeDirtyChildren(this.scheduleRender);
  }

  shouldComponentUpdate(nextProps: Readonly<TodoListViewProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.list !== nextProps.list;
  }

  render(){
    console.log('render list', this.props.list.getIdentity());
    return this.props.list.getView();
  }
}