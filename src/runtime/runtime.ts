export type One<T>          = T
export type ZeroOrOne<T>    = T | null;
export type ZeroOrMore<T>   = T[];
export type OneOrMore<T>    = T[];
export type DerivedValue<T> = T | undefined;
export type DefaultValue<T> = T | undefined;

export type Identity        = string;

export type View = JSX.Element;

export type DirtySubscriber = () => void;


export type CanCompare = number | string | null;

export function callDirtySubscriber(cb: DirtySubscriber) {
  cb()
}