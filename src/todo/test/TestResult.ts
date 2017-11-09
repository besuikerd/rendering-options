import TestOptions from './TestOptions';
import TestStrategy from './TestStrategy';

export default interface TestResult{
  options: TestOptions,
  actionCount: number,
  timeElapsed: number,
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
  let total = 0;
  for(const [name, amount] of testResult.renders){
    views[name] = amount;
    total += amount;
  }

  return {
    framework: framework.name,
    strategy,
    depth,
    children: childrenPerLevel,
    todos: tasksPerList,
    selection: selectionOffset,
    deletion: deletionOffset,
    timeElapsed: testResult.timeElapsed,
    totalRenders: total,
    views,
    actionCount: testResult.actionCount
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

  let totalRenders = 0;
  for(const [name, amount] of testResult.renders){
    totalRenders += amount;
  }

  const views = [
    renders.get(`${framework.name}.TodoListHeader`),
    renders.get(`${framework.name}.TodoListFooter`),
    renders.get(`${framework.name}.TodoListView`),
    renders.get(`${framework.name}.TodoView`),
    totalRenders
  ];

  const columns = [framework.name, strategy, tasksPerList, childrenPerLevel, depth, selectionOffset, deletionOffset, testResult.actionCount, ...views, testResult.timeElapsed];

  return columns.join(' & ')
}

export function actionsForOptions(options: TestOptions): number{
  const enterTask = options.taskLength + 1;
  const enterTasks = enterTask * options.tasksPerList;
  const toggleAll = 1;
  const toggleTasks = Math.floor(options.tasksPerList / options.selectionOffset);
  const deleteTasks = Math.floor(options.tasksPerList / options.deletionOffset);
  const toggleFilters = 3;
  const clearFinished = 1;

  const actionsPerList = enterTasks + toggleAll + toggleTasks + deleteTasks + toggleFilters + clearFinished;
  const listCount = numberOfLists(options.depth, options.childrenPerLevel);
  return actionsPerList * listCount;
}

function numberOfLists(d: number, c: number): number{
  if(d == 1) return 1;
  return numberOfLists(d - 1, c) + Math.pow(c, d - 1);
}