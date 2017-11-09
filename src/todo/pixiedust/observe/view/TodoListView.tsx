import * as React from 'react';
import TodoList from "../model/TodoList";
import PixieDustComponent from "../../../../runtime/component/PixieDustComponent";

interface TodoListHeaderProps{
  list: TodoList
}

export class TodoListHeader extends PixieDustComponent<TodoListHeaderProps>{
  constructor(props: TodoListHeaderProps, context: any) {
    super(props, context);
    props.list.subscribeDirtyAllFinished(this.scheduleRender);
    props.list.subscribeDirtyInput(this.scheduleRender);
  }

  componentWillReceiveProps(nextProps: Readonly<TodoListHeaderProps>, nextContext: any): void {
    if(this.props.list !== nextProps.list){
      this.props.list.unsubscribeDirtyAllFinished(this.scheduleRender);
      this.props.list.unsubscribeDirtyInput(this.scheduleRender);

      nextProps.list.subscribeDirtyAllFinished(this.scheduleRender);
      nextProps.list.subscribeDirtyInput(this.scheduleRender);
    }
  }


  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.props.list.unsubscribeDirtyAllFinished(this.scheduleRender);
    this.props.list.unsubscribeDirtyInput(this.scheduleRender);
  }


  shouldComponentUpdate(nextProps: Readonly<TodoListHeaderProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.list !== nextProps.list;
  }

  render(): JSX.Element {
    // console.log('render header', this.props.list.getIdentity());
    return this.props.list.getHeader();
  }
}

interface TodoListFooterProps{
  list: TodoList
}

export class TodoListFooter extends PixieDustComponent<TodoListFooterProps>{
  constructor(props: TodoListHeaderProps, context: any) {
    super(props, context);
    props.list.subscribeDirtyTodosLeft(this.scheduleRender);
    props.list.subscribeDirtyFinishedTodos(this.scheduleRender);
    props.list.subscribeDirtyFilter(this.scheduleRender);
  }

  componentWillReceiveProps(nextProps: Readonly<TodoListHeaderProps>, nextContext: any): void {
    if(this.props.list !== nextProps.list){
      this.props.list.unsubscribeDirtyTodosLeft(this.scheduleRender);
      this.props.list.unsubscribeDirtyFinishedTodos(this.scheduleRender);
      this.props.list.unsubscribeDirtyFilter(this.scheduleRender);

      nextProps.list.subscribeDirtyTodosLeft(this.scheduleRender);
      nextProps.list.subscribeDirtyFinishedTodos(this.scheduleRender);
      nextProps.list.subscribeDirtyFilter(this.scheduleRender);
    }
  }


  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.props.list.unsubscribeDirtyTodosLeft(this.scheduleRender);
    this.props.list.unsubscribeDirtyFinishedTodos(this.scheduleRender);
    this.props.list.unsubscribeDirtyFilter(this.scheduleRender);
  }


  shouldComponentUpdate(nextProps: Readonly<TodoListHeaderProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.list !== nextProps.list;
  }

  render(): JSX.Element {
    // console.log('render footer', this.props.list.getIdentity());
    return this.props.list.getFooter();
  }
}

interface TodoListViewProps{
  list: TodoList
}

export default class TodoListView extends PixieDustComponent<TodoListViewProps>{
  constructor(props: TodoListViewProps, context: any) {
    super(props, context);
    props.list.subscribeDirtyChildren(this.scheduleRender);
    props.list.subscribeDirtyVisibleTodos(this.scheduleRender);
  }

  componentWillReceiveProps(nextProps: Readonly<TodoListViewProps>, nextContext: any): void {
    if(this.props.list !== nextProps.list){
      this.props.list.unsubscribeDirtyChildren(this.scheduleRender);
      this.props.list.unsubscribeDirtyVisibleTodos(this.scheduleRender);

      nextProps.list.subscribeDirtyChildren(this.scheduleRender);
      nextProps.list.subscribeDirtyVisibleTodos(this.scheduleRender);
    }
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    this.props.list.unsubscribeDirtyChildren(this.scheduleRender);
    this.props.list.unsubscribeDirtyVisibleTodos(this.scheduleRender);
  }

  shouldComponentUpdate(nextProps: Readonly<TodoListViewProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.list !== nextProps.list;
  }

  render(){
    // console.log('render list', this.props.list.getIdentity());
    return this.props.list.getView();
  }
}