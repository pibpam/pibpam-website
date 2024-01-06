import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import AuthCodeModal from '../../components/AuthCodeModal';
import { ApiLocal } from '../../services/apiLocal';
import { useRouter } from 'next/router';
import { AppContext } from '../../contexts/app';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { UserContext } from '../../contexts/user';
import { saveToken } from '../../utils/LocalStorage';
import { Error } from './styles';
import { FiLink2 } from 'react-icons/fi';

// import { Container } from './styles';

const Code: React.FC = () => {
  const router = useRouter()
  const { isApp } = useContext(AppContext)
  const { goTo } = useAppNavigation()
  const { initUser, user } = useContext(UserContext)
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)

  const authUser = async (code: string) => {
    try {
      const api = new ApiLocal()
      const data = await api.authByCode(code)
      saveToken(data.accessToken)
      initUser()

      if (isApp) {
        goToMember()
      }
    } catch (error) {
      setHasError(true)
      console.error(error)
    } finally {
      setLoading(false)
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
      {loading && (
        <Loading />
      )}
      {hasError && (
        <Error>
          <div>
            <FiLink2/>
          </div>
          <h3>Seu link é inválido!</h3>
          <p>Solicite ao seu líder um novo link para acessar a aplicação.</p>
          <button onClick={() => goTo({ pathname: '/', resetHistory: true })} >Ir para o ínicio</button>
        </Error>
      )}
      {!loading && !hasError && (
        <AuthCodeModal name={user?.member.name || ''} code={router?.query?.code as string} />
      )}
    </div>
  )
}

export default Code;