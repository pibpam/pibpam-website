import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '../styles/components/NavBar.module.scss'

const NavBar: React.FC = () => {
  return (
    <div className={styles.navBarContainer} >
      <nav className={styles.navBar}>
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
      </nav>
    </div >
  );
}

export default NavBar;
