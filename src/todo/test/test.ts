import { render, unmountComponentAtNode } from 'react-dom';
import {allTests} from './tests';
import {runTest} from './TestRunner';
import MobXFramework from './frameworks/MobXFramework';
import PixieDustFramework from './frameworks/PixieDustFramework';
import RenderTracker from './RenderTracker';
import TestResult, {listingRow, serializeTestResult} from './TestResult';

const renderTracker = new RenderTracker();

MobXFramework.registerComponents(renderTracker);
PixieDustFramework.registerComponents(renderTracker);


const root = document.body.appendChild(document.createElement('div'));
root.setAttribute('class', 'todo-application');

const testResults: TestResult[] = [];

async function run(){
  for(const test of allTests){
    unmountComponentAtNode(root);
    const rootElement = test.framework.initApplication();
    render(rootElement, root);
    await runTest(root, test);


    testResults.push({
      options: test,
      renders: new Map(renderTracker.getInvocations())
    });
    renderTracker.clearInvocations();
  }
  console.log(testResults.map(serializeTestResult));

  console.log(testResults.map(listingRow).join('\\\\\n') + '\\\\');

}
run();



