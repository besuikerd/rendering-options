import * as React from 'react';
import {MouseEvent} from 'react';
import {Simulate} from 'react-dom/test-utils'
import {observer} from "mobx-react";
import {observable} from "mobx";


@observer
class Counter extends React.Component{
  @observable count = 0;

  constructor(props: any, context: any) {
    super(props, context);
  }

  increment = (e: MouseEvent<HTMLElement>) => {
    this.count += 1;
  };

  decrement = (e: MouseEvent<HTMLElement>) => {
    this.count -= 1;
  };

  render(){
    return <div>
      <button className="decrement" onClick={this.decrement}>-</button>
      <span>{ this.count }</span>
      <button className="increment" onClick={this.increment}>+</button>
    </div>;
  }
}



// ReactTestUtils.