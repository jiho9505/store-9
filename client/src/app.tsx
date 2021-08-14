import React from 'react';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header/Header';
import Footer from '@/components/base/Footer/Footer';
import ButtonToMoveToTop from '@/components/base/ButtonToMoveToTop';

import Main from '@/pages/Main';
import ProductList from '@/pages/ProductList';
import CartPage from '@/pages/Cart';

import '@/static/assets/img/baeminFavicon.png';

/**
 * FIXME:
 * 추후 여러 경로가 동일 컴포넌트 가리키는 것에 대한 처리 필요
 */
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <Main />
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
        <Route exact path="/total">
          <ProductList />
        </Route>
        <Route exact path="/suplies">
          <ProductList />
        </Route>
        <Route exact path="/living">
          <ProductList />
        </Route>
        <Route exact path="/books">
          <ProductList />
        </Route>
        <Route exact path="/green">
          <ProductList />
        </Route>
        <Route exact path="/smile-edition">
          <ProductList />
        </Route>
        <Route exact path="/euljiro-edition">
          <ProductList />
        </Route>
        <Route exact path="/baedal-friends">
          <ProductList />
        </Route>
        <Route exact path="/present">
          <ProductList />
        </Route>
        <Route exact path="/collaborate">
          <ProductList />
        </Route>
      </Router>
      <ButtonToMoveToTop />
      <Footer />
    </>
  );
};

const LoginPage = () => {
  return <div>This is LoginPage</div>;
};

const ProductPage = () => {
  return <div>This is Product Page</div>;
};

export default App;
