import * as React from 'react';
import {render} from 'react-dom';

import {createTodoApplication as observe} from './pixiedust/observe/index';
import {createTodoApplication as spine} from './pixiedust/spine/index';
import {Implementations, Schedulers} from "./TodoOptions";
import Selector from "./components/Selector";
import {AnimationFrameScheduler, EagerScheduler, Scheduler, TimedScheduler} from "../runtime/Scheduler";
import TodoInstance from "./components/TodoInstance";


let implementations: Implementations = new Map([
  ["Observe", observe],
  ["Spine", spine]
]);

let schedulers : Schedulers = new Map<string, Scheduler>([
  ["Animation", new AnimationFrameScheduler()],
  ["Eager", new EagerScheduler()],
  ["Time[100]", new TimedScheduler(100)],
  ["Time[1000]", new TimedScheduler(1000)]
]);


const container = document.body.appendChild(document.createElement('div'));
const App = <TodoInstance implementations={implementations} schedulers={schedulers}/>
render(App, container);