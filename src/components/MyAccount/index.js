import React, { useState, useEffect } from 'react';
import Segment from '../Segment';
import api from '../../api';
import {
  Container,
  Menu,
  Content,
  Layout,
  MenuBUtton,
  MenuCollapse,
} from './styles.module.scss';
import { AiFillControl } from 'react-icons/ai';
import { FaShoppingBasket, FaHome } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { Route, Switch, useHistory } from 'react-router-dom';
import Panel from './Panel';
import Address from './Address';
import Orders from './Orders';
import AccountDetail from './AccountDetail';
import AddAddress from './Address/AddAddress';
import EditAddress from './Address/EditAddress';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// import Loadable from 'react-loadable';
// import Loader from '../../Camaleao';

// const LoadablePanel = Loadable({
//   loader: () => import('./Panel'),
//   loading: Loader,
// });
// const LoadableOrders = Loadable({
//   loader: () => import('./Orders'),
//   loading: Loader,
// });
// const LoadableAddress = Loadable({
//   loader: () => import('./Address'),
//   loading: Loader,
// });
// const LoadableAccountDetail = Loadable({
//   loader: () => import('./AccountDetail'),
//   loading: Loader,
// });

function MyAccount() {
  const history = useHistory();
  const [sectionName, setSectionName] = useState('Minha Conta');
  const [active, setActive] = useState(1);
  const [collapse, setCollaspe] = useState(false);
  const setMyData = useState([])[1];
  useEffect(() => {
    async function getMyAccount() {
      try {
        api
          .get('clients/profile', {
            headers: {
              'x-access-token': localStorage.getItem('token'),
            },
          })
          .then((response) => {
            console.log('Response ->', response.data[0]);
            localStorage.name = response.data[0].displayname;

            setMyData(response.data);
          });
      } catch (error) {
        console.log('Error ->', error);
        console.log('Error ->');
      }
    }
    getMyAccount();
  }, [setMyData]);
  function _handleLogOut() {
    localStorage.clear();
    history.push('/auth');
  }
  return (
    <>
      <div className={Container}>
        <Segment name="Minha Conta" />
        <h3>{sectionName}</h3>
        <div className={Layout}>
          <div className={collapse ? MenuCollapse : Menu}>
            <button
              onClick={() => setCollaspe(!collapse)}
              className={MenuBUtton}
            >
              <p>Minha Conta</p>
              {collapse === false && <IoIosArrowBack />}
              {collapse && <IoIosArrowForward />}
            </button>
            <button onClick={() => history.push('/my-account')}>
              <p>Painel</p>
              <AiFillControl color={active === 1 ? '#000' : '#9e9e9e'} />
            </button>
            <button onClick={() => history.push('/my-account/orders')}>
              <p>Pedidos</p>
              <FaShoppingBasket color={active === 2 ? '#000' : '#9e9e9e'} />
            </button>
            <button onClick={() => history.push('/my-account/address')}>
              <p>Endereços</p>
              <FaHome color={active === 3 ? '#000' : '#9e9e9e'} />
            </button>
            <button onClick={() => history.push('/my-account/account-detail')}>
              <p>Detalhes da Conta</p>
              <BsFillPersonFill color={active === 4 ? '#000' : '#9e9e9e'} />
            </button>
            <button onClick={_handleLogOut}>
              <p>Sair</p>
              <FiLogOut />
            </button>
          </div>
          <div className={Content}>
            <Switch>
              <Route
                exact
                path="/my-account"
                render={(props) => (
                  <Panel
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
              <Route
                path="/my-account/account-detail"
                render={(props) => (
                  <AccountDetail
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
              <Route
                path="/my-account/orders"
                render={(props) => (
                  <Orders
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
              <Route
                exact
                path="/my-account/address"
                render={(props) => (
                  <Address
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
              <Route
                path="/my-account/address/add"
                render={(props) => (
                  <AddAddress
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
              <Route
                path="/my-account/address/:id"
                render={(props) => (
                  <EditAddress
                    {...props}
                    setActive={setActive}
                    setSectionName={setSectionName}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
