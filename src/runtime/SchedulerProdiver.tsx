import * as React from 'react';
import {Scheduler} from "./Scheduler";
import * as PropTypes from 'prop-types';

interface SchedulerContext {
  scheduler: Scheduler
}

export default class SchedulerProdiver extends React.Component<SchedulerContext>{
  static childContextTypes = {
    scheduler: PropTypes.object
  };

  render(){
    return React.Children.only(this.props.children);
  }

  getChildContext(){
    return {
      scheduler: this.props.scheduler
    }
  }
}