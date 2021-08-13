import React from 'react';
import { Router, Route, Link } from './Router';

import Header from '@/components/base/Header';
import Footer from '@/components/base/Footer/Footer';
import LoginPage from '@/pages/Login';
import SignupMethod from '@/pages/SignupMethod';
import '@/static/assets/img/baemin-favicon.png';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/product/:id">
          <ProductPage />
        </Route>
        <Route exact path="/signupMethod">
          <SignupMethod />
        </Route>
        <Navigation />
      </Router>
      <Footer />
    </>
  );
};

const MainPage = () => {
  return <div>This is MainPage</div>;
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
