import React from 'react';
import Segment from '../Segment';
import { Container } from './styles.module.scss';
export default function About() {
  return (
    <div className={Container}>
      <Segment name="Sobre Nós" />
      <section>
        <span>MISSÃO</span>
        <p>
          Ser uma marca reconhecida mundialmente pela sua ousadia e
          destacando-se pelo agressivo de marketing, comprometidos sempre com a
          total qualidade dos produtos e satisfação dos seus clientes.
        </p>
      </section>

      <section>
        <span>VISÃO</span>
        <p>
          Consolidação da marca no mercado através da venda de artigos
          personalizados a fim de proporcionar experiências únicas aos nossos
          clientes com inovação, qualidade e confiabilidade.
        </p>
      </section>

      <section>
        <span>VALORES</span>
        <p>
          Prezamos por inovação sempre, nossos colaboradores trabalhando com
          compromisso e dedicação gerando confiabilidade e uma ética
          inegociável.
        </p>
      </section>
    </div>
  );
}
