declare global {
  interface Window {
    [key: string]: any;
  }
}

export type AnyObject = Record<string, any>;

export type Plugin<T extends AnyObject> = (sdk: AnyObject) => T;
