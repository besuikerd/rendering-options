import * as React from 'react';
import {ClassType} from "react";


type RenderFunction = () => JSX.Element | false | null;

interface ComponentConstructor<P> extends React.ComponentClass<P>{
  prototype: React.Component<P>;
}

interface TrackedComponent {
  component: ComponentConstructor<any>
  render: RenderFunction
}

export default class RenderTracker{
  private trackedComponents: Map<string, TrackedComponent> = new Map();
  private trackedInvocations: Map<string, number> = new Map();

  trackComponent<P>(name: string, component: ComponentConstructor<P>){
    const render: RenderFunction = component.prototype.render;
    const trackedComponent: TrackedComponent = {
      render,
      component
    };
    this.trackedComponents.set(name, trackedComponent);
    component.prototype.render = this.wrapRender(name, render);
  }

  getInvocations(): Map<string, number>{
    return this.trackedInvocations;
  }

  clearInvocations(){
    this.trackedInvocations.clear();
  }

  clearTracking(){
    for(const trackedComponent of this.trackedComponents.values()){
      trackedComponent.component.prototype.render = trackedComponent.render;
    }
    this.trackedComponents.clear();
  }

  wrapRender(name: string, render: RenderFunction): RenderFunction{
    const trackedInvocations = this.trackedInvocations;
    return function(){
      const invocations = trackedInvocations.get(name) || 0;
      trackedInvocations.set(name, invocations + 1);
      return render.call(this);
    }
  }
}