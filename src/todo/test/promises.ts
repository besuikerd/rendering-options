
export function animationFrame(): Promise<number>{
  // return sleep(300).then(e => 0);
  return new Promise(window.requestAnimationFrame);
}

export function sleep(time: number): Promise<void> {
  return new Promise(r => setTimeout(r, time))
}