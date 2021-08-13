import React from 'react';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer/Footer';
import LoginPage from '@/pages/Login';
import SignupMethod from '@/pages/SignupMethod';

import CartPage from '@/pages/cart';
import Main from '@/pages/Main/Main';

import '@/static/assets/img/baeminFavicon.png';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <Main />v
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/signupMethod">
          <SignupMethod />
        </Route>
      </Router>
      <Footer />
    </>
  );
};

const ProductPage = () => {
  return <div>This is Product Page</div>;
};

export default App;
