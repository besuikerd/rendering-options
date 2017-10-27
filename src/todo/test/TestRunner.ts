import TestOptions from './TestOptions';
import TestStrategy from "./TestStrategy";
import {Simulate} from "react-dom/test-utils";

function animationFrame(): Promise<number>{
  // return sleep(300).then(e => 0);
  return new Promise(window.requestAnimationFrame);
}

function sleep(time: number): Promise<void> {
  return new Promise(r => setTimeout(r, time))
}

export async function runTest(root: Element, options: TestOptions){
  const { selector } = options;

  async function topDown(element: Element, depth: number){
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

    if(depth < options.depth){
      await addChildren(element);
      await animationFrame();

      const children = Array.from(element.querySelectorAll(selector.list));
      for(let child of children){
        await topDown(child, depth + 1);
      }
    }
  }

  async function bottomUp(element: Element, depth: number){
    if(depth < options.depth){
      await addChildren(element);
      await animationFrame();

      const children = Array.from(element.querySelectorAll(selector.list));
      for(let child of children){
        await bottomUp(child, depth + 1);
      }
    }

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

  const listElement = root.querySelector(selector.list) as HTMLElement;

  switch(options.strategy){
    case TestStrategy.TOP_DOWN:
      await topDown(listElement, 0);
      break;
    case TestStrategy.BOTTOM_UP:
      await bottomUp(listElement, 0);
  }
}