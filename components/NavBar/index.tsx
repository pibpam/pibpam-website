import Image from 'next/image';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FiBell, FiUser } from 'react-icons/fi';
import { UserContext } from '../../contexts/user';
import { NoticesContext } from '../../contexts/notices';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Actions, Links, NavBarContainer, Notifications } from './styles';

const links = [
  { label: 'Início', pathname: '/' },
  { label: 'Sobre', pathname: '/about' },
  { label: 'Agenda', pathname: '/schedule' },
  { label: 'Cultos', pathname: '/events' },
  { label: 'Séries', pathname: '/series' },
  { label: 'Bíblia', pathname: '/bible' },
  { label: 'Inscrições', pathname: '/inscricoes' },
];

const NavBar: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { totalUnsee } = useContext(NoticesContext);
  const { goTo: goToHook } = useAppNavigation();

  const goTo = async (pathname: string) => {
    await goToHook({ pathname, showLoading: true, resetHistory: true });
  };

  return (
    <NavBarContainer>
      <button onClick={() => goTo('/')}>
        <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={140} height={36} />
      </button>
      <Links>
        {links.map((link) => (
          <li key={link.pathname}>
            <button
              className={router.pathname === link.pathname ? 'active' : ''}
              onClick={() => goTo(link.pathname)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </Links>
      <Actions>
        <Notifications onClick={() => goTo('/notices')}>
          {!!totalUnsee && <span>{totalUnsee}</span>}
          <FiBell />
        </Notifications>
        <button onClick={() => goTo(user?.id ? '/member' : '/login')}>
          <FiUser />
          {user?.id ? 'Área de Membros' : 'Entrar'}
        </button>
      </Actions>
    </NavBarContainer>
  );
};

export default NavBar;
