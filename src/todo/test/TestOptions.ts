import TestStrategy from "./TestStrategy";
import TestSelectors from "./TestSelectors";
import Framework from "./frameworks/Framework";

export default interface TestOptions{
  framework: Framework
  strategy: TestStrategy

  depth: number
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