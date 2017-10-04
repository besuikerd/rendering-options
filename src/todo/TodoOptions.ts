import {Scheduler} from "../runtime/Scheduler";

export interface TodoOptions {
  nested          : boolean,
  childCount      : number,
  scheduler       : Scheduler,
  implementation  : ApplicationCreator
}

export type ApplicationCreator = (options: TodoOptions) => JSX.Element;
export type Implementations = Map<string, ApplicationCreator>;
export type Schedulers = Map<string, Scheduler>;