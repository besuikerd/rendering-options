import { render, unmountComponentAtNode } from 'react-dom';
import {allTests} from './tests';
import {runTest} from './TestRunner';
import MobXFramework from './frameworks/MobXFramework';
import PixieDustFramework from './frameworks/PixieDustFramework';
import RenderTracker from './RenderTracker';
import TestResult, {actionsForOptions, listingRow, serializeTestResult} from './TestResult';
import {sleep} from "./promises";

const renderTracker = new RenderTracker();

MobXFramework.registerComponents(renderTracker);
PixieDustFramework.registerComponents(renderTracker);


const root = document.body.appendChild(document.createElement('div'));
root.setAttribute('class', 'todo-application');

const testResults: TestResult[] = [];

async function run(){
  for(const test of allTests){
    await sleep(3000);
    unmountComponentAtNode(root);
    const rootElement = test.framework.initApplication();
    const actionCount = actionsForOptions(test);
    const time = Date.now();
    render(rootElement, root);

    await runTest(root, test);

    const result = {
      options: test,
      timeElapsed: Date.now() - time,
      actionCount,
      renders: new Map(renderTracker.getInvocations())
    };

    console.log(result);
    testResults.push(result);
    renderTracker.clearInvocations();
  }
  console.log(testResults.map(serializeTestResult));

  console.log(testResults.map(listingRow).join('\\\\\n') + '\\\\');

}
run();



