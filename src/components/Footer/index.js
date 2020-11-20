import React from 'react';

import { Container, Wrapper } from './styles.module.scss';

export default function Footer() {
  return (
    <div className={Container}>
      <div className={Wrapper}>
        {/* <div>
          Rua Bernadinho Souto, 25 – Alto São João, Montes Claros – MG,
          39400-214
        </div> */}
        <div>
          As fotos aqui veiculadas, logotipo e marca são de propriedade do site
          www.camaleaolab.com. É vetada a sua reprodução, total ou parcial, sem
          a expressa autorização da administrador do site Camaleão.
        </div>
        <div>Camaleão © 2019 Todos os direitos reservados.</div>
        <div>
          <strong>Mellv</strong>
        </div>
      </div>
    </div>
  );
}
