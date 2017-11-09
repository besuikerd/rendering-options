import {render} from 'react-dom';
import * as React from 'react';

import TodoList from './pixiedust/observe/model/TodoList';
import TodoListView from './pixiedust/observe/view/TodoListView'
import {AnimationFrameScheduler} from "../runtime/Scheduler";
import SchedulerProvider from '../runtime/SchedulerProdiver'

const list = new TodoList();
list.setFilter('All');
list.setInput('');

const container = document.body.appendChild(document.createElement('div'))
container.setAttribute('class', 'todo-application')
const view = <SchedulerProvider scheduler={new AnimationFrameScheduler()}>
    <TodoListView list={list}/>
</SchedulerProvider>;

render(view, container);