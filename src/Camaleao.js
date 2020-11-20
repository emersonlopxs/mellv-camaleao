import React from 'react';
import { Switch, Route as ReactDOMRoute } from 'react-router-dom';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'react-notifications-component/dist/theme.css';
import ReactNotification from 'react-notifications-component';

import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Route from './components/Route';

export function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}>
      <CircularProgress />
    </div>
  );
}

const LoadableHome = Loadable({
  loader: () => import('./components/Home'),
  loading: Loader,
});
const LoadableAdmin = Loadable({
  loader: () => import('./components/Admin'),
  loading: Loader,
});
const LoadableProduct = Loadable({
  loader: () => import('./components/Product'),
  loading: Loader,
});
const LoadableAuth = Loadable({
  loader: () => import('./components/Auth'),
  loading: Loader,
});
const LoadableContact = Loadable({
  loader: () => import('./components/Contact'),
  loading: Loader,
});
const LoadableAbout = Loadable({
  loader: () => import('./components/About'),
  loading: Loader,
});
const LoadableCart = Loadable({
  loader: () => import('./components/Cart'),
  loading: Loader,
});

const LoadableMyAccount = Loadable({
  loader: () => import('./components/MyAccount'),
  loading: Loader,
});

const LoadableStripe = Loadable({
  loader: () => import('./Stripe/StripeContainer'),
  loading: Loader,
});
const LoadableForgotPassword = Loadable({
  loader: () => import('./components/ForgotPassword'),
  loading: Loader,
});

function Camaleao() {
  console.log('camaleao!');

  // // terrible way to the admin state
  // // handle this on a separated login page
  // const { isAdmin } = localStorage;

  // if (isAdmin) {
  //   return (
  //     <>
  //       <ReactDOMRoute path="/" isPrivate component={LoadableAdmin} />
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar />
      <ReactNotification />
      <Switch>
        <Route path="/auth" component={LoadableAuth} />
        <Route path="/my-account" isPrivate component={LoadableMyAccount} />
        {/* <ReactDOMRoute path="/admin" isPrivate component={LoadableAdmin} /> */}
        <ReactDOMRoute path="/contact" component={LoadableContact} />
        <ReactDOMRoute path="/about-us" component={LoadableAbout} />
        <ReactDOMRoute path="/cart" component={LoadableCart} />
        <Route path="/cart" isPrivate component={LoadableCart} />
        <ReactDOMRoute path="/product/:id" component={LoadableProduct} />
        <ReactDOMRoute path="/card" component={Card} />
        <ReactDOMRoute path="/checkout" component={LoadableStripe} />
        <ReactDOMRoute
          path="/forgot-password"
          component={LoadableForgotPassword}
        />
        <ReactDOMRoute path="/" component={LoadableHome} />
      </Switch>
      <Footer />
    </>
  );
}

export default function CamaleaoRoutes() {
  return (
    <>
      <ReactNotification />
      <Switch>
        <ReactDOMRoute path="/admin" isPrivate component={LoadableAdmin} />
        <ReactDOMRoute path="/" component={Camaleao} />
      </Switch>
    </>
  );
}
