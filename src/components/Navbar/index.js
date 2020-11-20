import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import { Name } from "../../Store";
import { Container, HeaderWrapper, HeaderLinks } from './styles.module.scss';
import Logo from '../../assets/images/logo.png';

export default function Navbar() {
  // const [name] = useContext(Name);
  const [search, setSearch] = useState('');
  return (
    <div className={Container}>
      <header>
        <div className={HeaderWrapper}>
          <Link to="/">
            <img src={Logo} alt="" srcSet="" />
          </Link>
          <div className={HeaderLinks}>
            <Link className="link" to="/">
              Inicio
            </Link>
            {localStorage.token ? (
              <Link to="/my-account">Minha Conta</Link>
            ) : (
              <Link to="/auth">Minha Conta</Link>
            )}
            <Link to="/contact">Contato</Link>
            <Link to="/about-us">Sobre Nos</Link>
          </div>
        </div>

        <div className={HeaderWrapper}>
          <input
            type="text"
            value={search}
            placeholder="Pesquisar produtos..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className={HeaderLinks}>
            <Link style={{ display: 'flex', alignItems: 'center' }} to="/cart">
              <span style={{ marginRight: 15 }}>Carrinho</span>
              <ShoppingCartIcon color="#fff" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
