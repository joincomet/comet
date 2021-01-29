export type Lazy<T extends object> = Promise<T> | T
