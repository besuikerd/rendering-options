import * as React from 'react';
import {render} from 'react-dom';
import {Simulate} from "react-dom/test-utils";
import TodoList from "../pixiedust/observe/model/TodoList"
import TodoListView from '../pixiedust/observe/view/TodoListView';
import {AnimationFrameScheduler} from "../../runtime/Scheduler";
import SchedulerProdiver from "../../runtime/SchedulerProdiver";


const list = new TodoList();
list.setInput("");
list.setFilter("All");
const scheduler = new AnimationFrameScheduler();

const app = <SchedulerProdiver scheduler={scheduler}>
    <TodoListView list={list}/>
  </SchedulerProdiver>;

const container = document.body.appendChild(document.createElement('div'));
container.setAttribute('class', 'todo-application');
render(app, container);


interface TestSelectors{
  list: string
  addChild: string
  input: string
  toggle: string
  toggleAll: string
  taskContainer: string
  deleteButton: string
  footer: string
  filters: string
  clearCompleted: string
}

const selector: TestSelectors = {
  list: '.todoapp',
  addChild: '.add-child',
  input: '#new-todo',
  toggle: '.toggle',
  toggleAll: '.toggle-all',
  taskContainer: '.todo-list',
  deleteButton: '.destroy',
  footer: ':scope > .footer',
  filters: '.filters li a',
  clearCompleted: '.clear-completed'
};

const options: TestOptions = {
  levels: 3,
  childrenPerLevel: 3,
  tasksPerList: 10,
  taskLength: 3,
  selectionOffset: 3,
  deletionOffset: 5,
  selector
};


const root = container.querySelector(selector.list);
if(root !== null){
  runTest(root, options).then(() => {
    console.log(document.querySelectorAll(selector.list).length)
  });
}


interface TestOptions{
  levels: number
  childrenPerLevel: number
  tasksPerList: number
  taskLength: number

  /**
   * offset per task that gets checked
   */
  selectionOffset: number

  /**
   * offset per task that gets deleted
   */
  deletionOffset: number

  selector: TestSelectors
}



function animationFrame(): Promise<number>{
  // return sleep(300).then(e => 0);
  return new Promise(window.requestAnimationFrame);
}

function sleep(time: number): Promise<void> {
  return new Promise(r => setTimeout(r, time))
}

async function runTest(root: Element, options: TestOptions){
  const { selector } = options;

  async function runList(element: Element, level: number){

    await addChildren(element);
    await animationFrame();

    await addTasks(element);
    await animationFrame();

    await toggleAll(element);
    await animationFrame();

    const taskContainer = element.querySelector(selector.taskContainer) as HTMLElement;

    await toggleTasks(taskContainer);
    await animationFrame();

    await deleteTasks(taskContainer);
    await animationFrame();

    const footerContainer = element.querySelector(selector.footer) as HTMLElement;

    await toggleFilters(footerContainer);
    await animationFrame();

    await clearFinished(footerContainer);

    if(level == options.levels){return;}
    const children = Array.from(element.querySelectorAll(selector.list));
    for(let child of children){
      await runList(child, level + 1);
    }
  }

  function addChildren(element: Element){
    const addChildButton = element.querySelector(selector.addChild);
    if(addChildButton !== null){
      for(let i = 0 ; i < options.childrenPerLevel ; i++){
        Simulate.click(addChildButton);
      }
    }
  }

  async function addTasks(element: Element){
    const input = element.querySelector(selector.input) as HTMLInputElement;
    if(input !== null){
      (input as any).focus();
      Simulate.focus(input);
      for(let i = 0 ; i < options.tasksPerList ; i++){
        await enterTask(input, i);
      }
    }
  }

  async function enterTask(element: HTMLInputElement, offset: number){
    await animationFrame();
    for(let i = 0 ; i < options.taskLength ; i++) {
      await enterCharacter(element, offset + i);
      await animationFrame();
    }

    await animationFrame();
    Simulate.keyPress(element, {
      key: 'Enter',
      keyCode: 13,
      which: 13
    });
  }

  async function enterCharacter(element: HTMLInputElement, offset: number) {
    const charCode = offset % 26 + 97;
    const value = element.value + String.fromCharCode(charCode);
    Simulate.change(element, {
      target: {
        value: value
      },
    } as any);
  }

  async function toggleAll(element: Element){
    const toggleAll = element.querySelector(selector.toggleAll) as HTMLElement;
    console.log(toggleAll);
    Simulate.click(toggleAll);
    await animationFrame();
    Simulate.click(toggleAll);
  }

  async function toggleTasks(element: Element) {
    const checkboxes = Array.from(element.querySelectorAll(selector.toggle)).filter((e, i) => i % options.selectionOffset == 0) as HTMLInputElement[];
    for(const checkbox of checkboxes){
      await animationFrame();
      Simulate.change(checkbox, {
        target: {
          checked: true
        }
      } as any)
    }
  }

  async function deleteTasks(element: Element) {
    const buttons = Array.from(element.querySelectorAll(selector.deleteButton)).filter((e, i) => i % options.deletionOffset == 0) as HTMLInputElement[];
    for(const button of buttons){
      await animationFrame();
      Simulate.click(button);
    }
  }

  async function toggleFilters(element: Element){
    const filters = Array.from(element.querySelectorAll(selector.filters)).reverse();
    for(const filter of filters){
      await animationFrame();
      Simulate.click(filter)
    }
  }

  async function clearFinished(element: Element){
    const button = element.querySelector(selector.clearCompleted);
    if(button !== null){
      Simulate.click(button);
    }
  }

  function character(offset: number): number {
    const charCode = offset % 26 + 97;
    return charCode;
  }

  await runList(root, 1);
}