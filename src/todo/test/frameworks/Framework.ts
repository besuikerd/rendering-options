import RenderTracker from "../RenderTracker";

export default interface Framework{
  name: String
  registerComponents(renderTracker: RenderTracker): void
  initApplication(): JSX.Element
}