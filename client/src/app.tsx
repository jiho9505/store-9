import React from 'react';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer/Footer';
import Main from '@/pages/Main';
import ProductList from '@/pages/ProductList';

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
        <Navigation />
      </Router>
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

const Navigation = () => {
  return (
    <>
      <Link to="/">Main</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default App;

// import Suplies from '@/pages/ProductList/Suplies';
// import Living from '@/pages/ProductList/Living';
// import Books from '@/pages/ProductList/Books';
// import Green from '@/pages/ProductList/Green';
// import SmileEdition from '@/pages/ProductList/SmileEdition';
// import EuljiroEdition from '@/pages/ProductList/EuljiroEdition';
// import BaedalFriends from '@/pages/ProductList/BaedalFriends';
// import Present from '@/pages/ProductList/Present';
// import Collaborate from '@/pages/ProductList/Collaborate';
{
  /* */
}
