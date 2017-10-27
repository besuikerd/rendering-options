import TestOptions from './TestOptions';
import TestStrategy from './TestStrategy';

export default interface TestResult{
  options: TestOptions
  renders: Map<string, number>
}

export function serializeTestResult(testResult: TestResult){
  const {
    strategy,
    framework,
    depth,
    childrenPerLevel,
    tasksPerList,
    selectionOffset,
    deletionOffset
  } = testResult.options;


  const views: {[k: string]: any} = {};
  for(const [name, amount] of testResult.renders){
    views[name] = amount;
  }

  return {
    framework: framework.name,
    strategy,
    depth,
    children: childrenPerLevel,
    todos: tasksPerList,
    selection: selectionOffset,
    deletion: deletionOffset,
    views
  };
}

export function listingRow(testResult: TestResult){
  const {renders, options} = testResult;
  const {
    strategy,
    framework,
    depth,
    childrenPerLevel,
    tasksPerList,
    selectionOffset,
    deletionOffset,
  } = options;

  const views = [
    renders.get(`${framework.name}.TodoListHeader`),
    renders.get(`${framework.name}.TodoListFooter`),
    renders.get(`${framework.name}.TodoListView`),
    renders.get(`${framework.name}.TodoView`)
  ];

  const columns = [framework.name, strategy, depth, childrenPerLevel, tasksPerList, selectionOffset, deletionOffset, ...views];

  return columns.join(' & ')
}