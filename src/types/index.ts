declare namespace SomeHooks {
  export type Hook<TProps = any, THook = any> = (props?: TProps) => THook;
}