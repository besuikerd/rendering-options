import {Scheduler} from "../Scheduler";
import * as React from 'react';
import * as PropTypes from 'prop-types';

interface PixieDustComponentContext {
  scheduler: Scheduler;
}

export default class PixieDustComponent<Props, State = {}> extends React.Component<Props, State>{
  private componentIsMounted: boolean;

  constructor(props: Props, context: any) {
    super(props, context);
    this.componentIsMounted = false;
  }

  componentDidMount(): void {
    this.componentIsMounted = true;
  }

  componentWillUnmount(): void {
    this.componentIsMounted = false;
  }

  context: PixieDustComponentContext;
  static contextTypes = {
    scheduler: PropTypes.object
  };

  rerender = () => {
    if(this.componentIsMounted){
      this.forceUpdate();
    }
  };

  scheduleRender = () => {
    this.context.scheduler.schedule(this.rerender);
  };
}