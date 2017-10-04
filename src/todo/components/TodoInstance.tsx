import * as React from 'react';
import {Implementations, Schedulers, TodoOptions} from "../TodoOptions";
import {ZeroOrOne} from "../../runtime/runtime";
import Selector from "./Selector";

interface TodoInstanceProps{
  implementations: Implementations,
  schedulers: Schedulers
}

interface TodoInstanceState{
  previousOptions: ZeroOrOne<TodoOptions>;
  options: ZeroOrOne<TodoOptions>;
}

export default class TodoInstance extends React.Component<TodoInstanceProps, TodoInstanceState>{
  constructor(props: TodoInstanceProps, context: any) {
    super(props, context);
    this.state = {
      previousOptions: null,
      options: null
    };
  }

  onOptions = (options: TodoOptions) => {
    this.setState({
      previousOptions: this.state.options,
      options
    });
  };

  clearOptions = () => {
    this.setState({
      previousOptions: this.state.options,
      options: null
    });
  };

  render(): JSX.Element | any {
    const {previousOptions, options} = this.state;
    const {implementations, schedulers} = this.props;
    let view;
    if(options === null){
      view = <Selector implementations={implementations} schedulers={schedulers} onOptions={this.onOptions} previousOptions={previousOptions}/>
    } else{
      view =<div>
        <button onClick={this.clearOptions}>Back</button>
        <div className="todo-application">
          {options.implementation(options)}
        </div>
      </div>
    }
    return view;
  }
}