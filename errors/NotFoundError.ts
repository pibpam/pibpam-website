interface IContructor {
  message: string
}

export class NotFoundError extends Error {

  public data: IContructor

  constructor(data: IContructor) {
    super()
    this.data = data
  }
}