import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Search,
  Box,
  TopBar,
  Content,
  Order,
} from './styles.module.scss';

// import { Container } from './styles';

function TrackOrder() {
  return (
    <div className={Container}>
      <div className={Search}>
        <input type="text" />
        <button>Pesquisar</button>
      </div>
      <div className={Box}>
        <div className={TopBar}>
          <div>
            <p>Pedido</p>
          </div>
          <div>
            <p>Data</p>
          </div>
          <div>
            <p>Status</p>
          </div>
          <div>
            <p>Total</p>
          </div>
        </div>

        <div className={Content}>
          <div className={Order}>
            <div>
              <Link to="#">#500 Lucas</Link>
            </div>
            <div>
              <p>25 minutos atrás</p>
            </div>
            <div>
              <p>Processado</p>
            </div>
            <div>
              <p>R$ 135,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#652 Jose</Link>
            </div>
            <div>
              <p>1 hora atrás</p>
            </div>
            <div>
              <p>Processando</p>
            </div>
            <div>
              <p>R$ 99,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#702 Paulo</Link>
            </div>
            <div>
              <p>22 de abril de 2020</p>
            </div>
            <div>
              <p>Concluido</p>
            </div>
            <div>
              <p>R$ 120,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#702 Alberto Novais</Link>
            </div>
            <div>
              <p>30 de janeiro de 2020</p>
            </div>
            <div>
              <p>Concluido</p>
            </div>
            <div>
              <p>R$ 15,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#702 Pedro Felipe</Link>
            </div>
            <div>
              <p>12 de janeiro de 2020</p>
            </div>
            <div>
              <p>Concluido</p>
            </div>
            <div>
              <p>R$ 135,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#702 Pedro Felipe</Link>
            </div>
            <div>
              <p>12 de janeiro de 2020</p>
            </div>
            <div>
              <p>Concluido</p>
            </div>
            <div>
              <p>R$ 135,00</p>
            </div>
          </div>
          <div className={Order}>
            <div>
              <Link to="#">#702 Pedro Felipe</Link>
            </div>
            <div>
              <p>12 de janeiro de 2020</p>
            </div>
            <div>
              <p>Concluido</p>
            </div>
            <div>
              <p>R$ 135,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrackOrder;
