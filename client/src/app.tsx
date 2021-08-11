import React from 'react';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer/Footer';
import Main from '@/pages/Main/Main';

import '@/static/assets/img/baemin-favicon.png';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <Main />;
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
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
