import React from 'react';
import { Container, Icon } from './styles.module.scss';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Segment({ name }) {
  return (
    <div className={Container}>
      <Link to="/">
        <FaHome size={16} className={Icon} />
        Início
      </Link>
      <p>></p>
      <p>{name}</p>
    </div>
  );
}

export default Segment;
