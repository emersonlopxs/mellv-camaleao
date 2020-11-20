import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { CheckoutForm } from './CheckoutForm';

import { Container } from './styles.module.scss';

const PUBLIC_KEY =
  'pk_test_51HhP5gBjxpHUqipJSpAJg95n7BkyD83oIoLV01Bnw8MpfMRmFB4oO1PDnUQqKfjAfYphVSHsib0cp4sCZtb6ih7A00VxCe81yy';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <div className={Container}>
        <div style={{ minHeight: 300, marginTop: 20 }}>
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default Stripe;
