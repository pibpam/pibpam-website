import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Nav, NavBarContainer } from './styles'

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <Nav>
        <Image src="/pibpam-logo.svg" alt="PIBPM logo" width={196} height={51} />
        <ul>
          <li>
            <Link href="/">
              <a>Início</a>
            </Link>
          </li>
          <li>
            <Link href="/sobre">
              <a>Sobre</a>
            </Link>
          </li>
          <li>
            <Link href="/programacao">
              <a>Agenda</a>
            </Link>
          </li>
          <li>
            <Link href="/ministerios">
              <a>Ministérios</a>
            </Link>
          </li>
          <li>
            <Link href="/midia">
              <a>Mídia</a>
            </Link>
          </li>
        </ul>
      </Nav>
    </NavBarContainer>
  );
}

export default NavBar;
