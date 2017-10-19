import {
  DirtySubscriber,
  callDirtySubscriber
} from './runtime'
import {Subscription, Observable} from "rxjs";


export interface Scheduler {
  schedule(dirtySubscriber: DirtySubscriber): void;
  flush(): void;
}

export class EagerScheduler implements Scheduler {
  schedule(dirtySubscriber: DirtySubscriber): void {
    dirtySubscriber();
  }

  flush(): void {
  }
}

export class FlushingScheduler implements Scheduler{
  private scheduledUpdates: Set<DirtySubscriber>;

  constructor(){
    this.scheduledUpdates = new Set();
  }

  schedule(dirtySubscriber: DirtySubscriber){
    // dirtySubscriber();
    this.scheduledUpdates.add(dirtySubscriber);
  }

  flush(){
    this.scheduledUpdates.forEach(callDirtySubscriber);
    this.scheduledUpdates.clear();
  }
}

export class TimedScheduler implements Scheduler {
  private scheduledUpdates: Set<DirtySubscriber>;
  private interval: number;

  private subscription: number | null;

  constructor(interval: number){
    this.interval = interval;
    this.subscription = null;
    this.scheduledUpdates = new Set();
  }

  schedule(dirtySubscriber: DirtySubscriber): void {
    this.scheduledUpdates.add(dirtySubscriber);
    if(this.subscription == null){
      this.subscription = window.setTimeout(this.flush, this.interval);
    }
  }

  flush = () => {
    if(this.subscription !== null){
      window.clearInterval(this.subscription);
      this.subscription = null;
    }
    this.scheduledUpdates.forEach(callDirtySubscriber);
    this.scheduledUpdates.clear();

  }
}

export class AnimationFrameScheduler implements Scheduler{
  private scheduledUpdates: Set<DirtySubscriber>;

  private subscription: number | null;

  constructor(){
    this.scheduledUpdates = new Set();
    this.subscription = null;
  }

  schedule(dirtySubscriber: DirtySubscriber): void {
    this.scheduledUpdates.add(dirtySubscriber);
    if(this.subscription === null){
      this.subscription = requestAnimationFrame(this.flush);
    }
  }

  flush = () => {
    this.scheduledUpdates.forEach(callDirtySubscriber);
    this.scheduledUpdates.clear();
    if(this.subscription !== null){
      cancelAnimationFrame(this.subscription);
      this.subscription = null;
    }
  }
}