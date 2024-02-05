import React from 'react';
import { IGroup } from '../../interfaces/Group';

import { Container } from './styles';
import { FiClock, FiLink } from 'react-icons/fi';

const GroupItem: React.FC<{ group: IGroup, onClick: () => void }> = ({ group, onClick }) => {
  return (
    <Container onClick={onClick}>
      <button>
        <FiLink/> Ver detalhes
      </button>
      <h1>
        {group.title}
      </h1>
      <h2>
        {group.shortDescription}
      </h2>
      <div>
        <FiClock/>
        <div>
          {group.dayDescription}
        </div>
        <div>
          {group.timeDescription}
        </div>
      </div>
    </Container>
  )
}

export default GroupItem;