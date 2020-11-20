import React from 'react';
import { Container, Section } from './styles.module.scss';
import Showcase from '../Showcase';

function Home() {
  return (
    <div className={Container}>
      <div className={Section}>
        <Showcase />
      </div>
    </div>
  );
}
export default Home;
