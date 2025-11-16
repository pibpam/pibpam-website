interface IContructor {
  message: string
}

export class LoggerError extends Error {

  public data: IContructor

  constructor(data: IContructor) {
    super()
    this.data = data
  }
}