import React from 'react';
import { FiChevronLeft } from "react-icons/fi";
import { Container } from './styles';

interface IHeaderMember {
  title?: string
  goBack?: () => void
}

const HeaderMember: React.FC<IHeaderMember> = ({title, goBack }) => {
  return (
    <Container>
      <div>
        {goBack && (
          <button onClick={goBack}>
            <FiChevronLeft />
          </button>
        )}
        <div>{title}</div>
      </div>
    </Container>
  );
}

export default HeaderMember;
