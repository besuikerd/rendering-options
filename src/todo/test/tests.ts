import Framework from "./frameworks/Framework";
import { testSelectors } from "./TestSelectors";

import MobXFramework from './frameworks/MobXFramework';
import PixieDustFramework from './frameworks/PixieDustFramework';
import TestStrategy from "./TestStrategy";
import TestOptions from "./TestOptions";

const frameworks = [
  MobXFramework,
  PixieDustFramework
];

const strategies = [
  TestStrategy.TOP_DOWN,
  // TestStrategy.BOTTOM_UP
];

function makeTests(depth: number, children: number, tasks: number, selection: number, deletion: number): TestOptions[]{
  const result = [];
  for(const framework of frameworks){
    for(const strategy of strategies){
      result.push(makeTest(framework, strategy, depth, children, tasks, selection, deletion))
    }
  }
  return result;
}

function makeTest(framework: Framework, strategy: TestStrategy, depth: number, children: number, tasks: number, selection: number, deletion: number): TestOptions{
  return {
    framework: framework,
    strategy: strategy,
    depth: depth,
    childrenPerLevel: children,
    tasksPerList: tasks,
    taskLength: 3,
    selectionOffset: selection,
    deletionOffset: deletion,
    selector: testSelectors
  }
}

export const allTests: TestOptions[] = [].concat.apply([], [
  makeTests(100, 1, 5, 2, 3),
  makeTests(3, 3, 5, 2, 3),
  makeTests(1, 100, 1, 2, 3),
  makeTests(1, 1, 50, 2, 5),
]);