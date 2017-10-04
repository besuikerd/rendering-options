import * as React from 'react';
import {Implementations, Schedulers, TodoOptions} from "../TodoOptions";
import {ChangeEvent, MouseEvent} from "react";
import {Scheduler} from "../../runtime/Scheduler";
import {ZeroOrOne} from "../../runtime/runtime";

interface SelectorProps {
  implementations: Implementations,
  schedulers: Schedulers
  onOptions: (options: TodoOptions) => void,
  previousOptions: ZeroOrOne<TodoOptions>
}

interface SelectorState {
  childCount: number,
  nested: boolean,
  scheduler: string,
  implementation: string
}


export default class Selector extends React.Component<SelectorProps, SelectorState>{

  constructor(props: SelectorProps, context: any) {
    super(props, context);

    if(props.previousOptions !== null){
      const { childCount, nested, implementation, scheduler } = props.previousOptions;

      let schedulerKey: string = '';
      for(let [key, value] of props.schedulers.entries()){
        if(value == scheduler){
          schedulerKey = key;
        }
      }

      let implementationKey: string = '';
      for(let [key, value] of props.implementations.entries()){
        if(value == implementation){
          implementationKey = key;
        }
      }

      this.state = {
        childCount,
        nested,
        scheduler: schedulerKey,
        implementation: implementationKey
      }
    } else {
      this.state = {
        childCount: 10,
        nested: false,
        scheduler: props.schedulers.keys().next().value,
        implementation: props.implementations.keys().next().value
      }
    }
  }

  onChildCountInput = (e: ChangeEvent<HTMLInputElement>) => {
    const intValue = parseInt(e.target.value);
    if(!isNaN(intValue) && intValue !== this.state.childCount){
      this.setState({childCount: intValue});
    }
  };

  onNestedInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {nested} = this.state;
    if(e.target.checked !== nested){
      this.setState({nested : e.target.checked});
    }
  };

  onSchedulerInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const {scheduler} = this.state;
    if(e.target.value !== scheduler){
      this.setState({scheduler: e.target.value});
    }
  };

  onImplementationInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const {implementation} = this.state;
    if(e.target.value !== implementation){
      this.setState({implementation: e.target.value});
    }
  };

  onSetConfig = (e: MouseEvent<HTMLElement>) => {
    const {onOptions, schedulers, implementations} = this.props;
    const {childCount, nested, scheduler, implementation} = this.state;


    const options: TodoOptions = {
      childCount,
      nested,
      scheduler: schedulers.get(scheduler) as any,
      implementation: implementations.get(implementation) as any
    };

    onOptions(options);
  };

  render(): JSX.Element | any {
    const {childCount, nested, implementation, scheduler} = this.state;
    const {schedulers, implementations, onOptions} = this.props;

    const schedulerOptions = [];
    for(let s of schedulers.keys()){
      schedulerOptions.push(<option key={s} value={s}>{s}</option>)
    }

    const implementationOptions = [];
    for(let s of implementations.keys()){
      implementationOptions.push(<option key={s} value={s}>{s}</option>);
    }

    return <div>
      <button onClick={this.onSetConfig}>Ok</button>
      <label>
        <h2>Child Count</h2>
        <input type="text" value={String(childCount)} onChange={this.onChildCountInput}/>
      </label>
      <label>
        <h2>Nested Todos</h2>
        <input type="checkbox" checked={nested} onChange={this.onNestedInput}/>
      </label>
      <label>
        <h2>Scheduler</h2>
        <select value={scheduler} onChange={this.onSchedulerInput}>
          {schedulerOptions}
        </select>
      </label>
      <label>
        <h2>Implementation</h2>
        <select value={implementation} onChange={this.onImplementationInput}>
          {implementationOptions}
        </select>
      </label>
    </div>
  }
}