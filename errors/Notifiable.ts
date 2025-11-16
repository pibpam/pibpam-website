interface IContructor {
  message: string
  code?: string
}

export class Notifiable extends Error {

  public data: IContructor

  constructor(data: IContructor) {
    super()
    this.data = data
  }
}