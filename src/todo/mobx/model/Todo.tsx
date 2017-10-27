import { observable } from 'mobx';
import v4 = require("uuid/v4");


export default class Todo{
  id: string;
  @observable task: string;
  @observable finished: boolean;

  constructor(){
    this.id = v4();
  }
}