import type { NextPage } from 'next'
import Code from '../../../container/Code'

interface ICode {
  code: string
}

const AuthCode: NextPage<ICode> = () => {
  return <Code />
}

export default AuthCode
