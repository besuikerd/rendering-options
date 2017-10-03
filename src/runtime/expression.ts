import {CanCompare, ZeroOrMore, ZeroOrOne} from "./runtime";

export function sum(collection: ZeroOrMore<number>): number {
  let total = 0;
  for(let i = 0 ; i < collection.length ; i++){
    total += collection[i];
  }
  return total;
}

export function min<T extends CanCompare>(collection: ZeroOrMore<T>): ZeroOrOne<T>{
  let minimum: ZeroOrOne<T> = null;
  for(let i = 0 ; i < collection.length ; i++){
    if(minimum == null || collection[i] < minimum){
      minimum = collection[i];
    }
  }
  return minimum;
}

export function max<T extends CanCompare>(collection: ZeroOrMore<T>): ZeroOrOne<T>{
  let minimum: ZeroOrOne<T> = null;
  for(let i = 0 ; i < collection.length ; i++){
    if(minimum == null || collection[i] > minimum){
      minimum = collection[i];
    }
  }
  return minimum;
}

export function avg(collection: ZeroOrMore<number>): ZeroOrOne<number>{
  return collection.length == 0 ? null : sum(collection) / collection.length;
}

export function concat<T>(c1: ZeroOrMore<T>, c2: ZeroOrMore<T>){
  return c1.concat(c2);
}

export function count<T>(collection: ZeroOrMore<T>){
  return collection.length;
}

export function conj(collection: ZeroOrMore<boolean>): boolean{
  for(let i = 0 ; i < collection.length ; i++){
    if(collection[i] == false){
      return false;
    }
  }
  return true;
}

export function disj(collection: ZeroOrMore<boolean>): boolean{
  for(let i = 0 ; i < collection.length ; i++){
    if(collection[i] == true){
      return true;
    }
  }
  return true;
}

export function dateToString(d: Date): String {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const dayOfMonth = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return  `${year}-${padZero(month)}-${padZero(dayOfMonth)} ${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(n: number): string {
	return (n < 10 ? '0' : '') + n
}
