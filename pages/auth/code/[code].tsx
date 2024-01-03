import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ApiLocal } from '../../../services/apiLocal'
import { useContext, useEffect, useState } from 'react'
import { saveToken } from '../../../utils/LocalStorage'
import { IUser } from '../../../interfaces/User'
import Loading from '../../../components/Loading'
import AuthCodeModal from '../../../components/AuthCodeModal'
import { useAppNavigation } from '../../../hooks/useAppNavigation'
import { AppContext } from '../../../contexts/app'

interface ICode {
  code: string
}

const AuthCode: NextPage<ICode> = () => {
  const router = useRouter()
  const [user, setUser] = useState<undefined | IUser>()
  const { isApp } = useContext(AppContext)
  const { goTo } = useAppNavigation()

  const authUser = async (code: string) => {
    // const api = new ApiLocal()
    // const data = await api.authByCode(code)
    // saveToken(data.accessToken)
    // const user = await api.getMe(data.accessToken)
    // setUser(user)
    if (isApp) {
      goToMember()
    }
  }

  const goToMember = () => {
    goTo({ pathname: '/member', resetHistory: true })
  }

  useEffect(() => {
    if (router.query.code) {
      authUser(router.query.code as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.code])

  return (
    <div>
      <Loading />
      <AuthCodeModal name={user?.member.name || ''} code={router?.query?.code as string} />
    </div>
  )
}

export default AuthCode
