import { MultiFactorResolver } from "firebase/auth"

interface IContructor {
  multiFactorResolver: MultiFactorResolver
}

export class MfaRequired extends Error {

  public data: IContructor

  constructor(data: IContructor) {
    super()
    this.data = data
  }
}