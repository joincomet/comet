export class CustomError extends Error {
  replace: string

  constructor(message: string, replace: string) {
    super(message)
    this.replace = replace
  }
}
